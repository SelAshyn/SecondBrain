import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { buildRagContext } from "@/lib/rag";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get("chatId");

    if (!chatId) {
      return new Response("Missing chatId", { status: 400 });
    }

    const { message } = await req.json();

    if (!message) {
      return new Response("Missing message",{ status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new Response("Unauthorized",{ status: 401 });
    }

    // Verify chat belongs to user
    const chat = await prisma.chat.findFirst({
      where: { id: chatId, userId: user.id },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });

    if (!chat) {
      return new Response("Chat not found",{ status: 404 });
    }

    // Save user message
    await prisma.message.create({
      data: {
        role: "user",
        content: message,
        chatId,
      },
    });

    // Build messages for AI
    const messages = chat.messages.map(m => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    // Get RAG context from user's notes
    const { context: ragContext } = await buildRagContext(user.id, message);

    // Add system message with RAG context if available
    if (ragContext) {
      messages.push({ role: "system" as const, content: ragContext });
    }
    messages.push({ role: "user" as const, content: message });
    // Stream AI response
    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages,
      async onFinish({ text }) {
        // Save assistant response
        await prisma.message.create({
          data: {
            role: "assistant",
            content: text,
            chatId,
          },
        });

        // Update chat title if first message
        if (chat.messages.length <= 1) {
          await prisma.chat.update({
            where: { id: chatId },
            data: { title: message.slice(0, 50) + (message.length > 50 ? "..." : "") },
          });
        }
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat error:", error);
    return new Response("Internal error: " + (error as Error).message, { status: 500 });
  }
}