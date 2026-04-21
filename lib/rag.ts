import { openai } from "@ai-sdk/openai";
import { embedMany, embed } from "ai";
import { prisma } from "./prisma";

// Simple text search fallback (no embeddings required)
export async function searchContent(userId: string, query: string) {
  const lowerQuery = query.toLowerCase();
  const keywords = lowerQuery.split(/\s+/).filter(w => w.length > 2);

  // Get user's notes
  const notes = await prisma.note.findMany({
    where: { userId },
    select: { id: true, title: true, content: true },
  });

  // Score notes by keyword matches
  const scoredNotes = notes.map(note => {
    const text = (note.title + " " + note.content).toLowerCase();
    let score = 0;

    // Exact match gets high score
    if (text.includes(lowerQuery)) score += 10;

    // Keyword matches
    for (const keyword of keywords) {
      if (text.includes(keyword)) score += 1;
    }

    return { ...note, score };
  });

  // Return top matches
  return scoredNotes
    .filter(n => n.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

// Build RAG context from search results
export async function buildRagContext(userId: string, query: string) {
  const relevantNotes = await searchContent(userId, query);

  if (relevantNotes.length === 0) {
    return {
      context: "",
      hasResults: false,
    };
  }

  const context = relevantNotes
    .map(
      (note, i) =>
        `[Source ${i + 1}] ${note.title}:\n${note.content.slice(0, 500)}${
          note.content.length > 500 ? "..." : ""
        }`
    )
    .join("\n\n");

  return {
    context: `The user has the following relevant notes that may help answer their question:\n\n${context}\n\nUse this information to help answer the user's question. If the information doesn't fully answer the question, say so.`,
    hasResults: true,
    sources: relevantNotes,
  };
}

// Full embedding-based RAG (requires pgvector setup)
export async function createEmbeddings(noteId: string, content: string) {
  // Split content into chunks
  const chunks = splitIntoChunks(content, 500);

  if (chunks.length === 0) return;

  // Generate embeddings
  const { embeddings } = await embedMany({
    model: openai.embedding("text-embedding-3-small"),
    values: chunks,
  });

  // Save embeddings
  await prisma.$transaction(
    embeddings.map((embedding, i) =>
      prisma.noteEmbedding.create({
        data: {
          noteId,
          content: chunks[i],
          embedding: JSON.stringify(embedding),
        },
      })
    )
  );
}

export async function searchWithEmbeddings(userId: string, query: string) {
  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: query,
  });

  // This requires raw SQL with pgvector
  // Simplified - returns empty for now
  return [];
}

function splitIntoChunks(text: string, maxLength: number): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxLength && currentChunk) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += " " + sentence;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}
