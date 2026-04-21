"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { streamText, createStreamableValue } from "ai";
import { openai } from "@ai-sdk/openai";

// Ensure user exists
async function ensureUser(supabaseUser: { id: string; email?: string }) {
  const existingUser = await prisma.user.findUnique({
    where: { id: supabaseUser.id },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        id: supabaseUser.id,
        email: supabaseUser.email || "",
      },
    });
  }
}

// Get user's chats
export async function getChats() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");
  await ensureUser(user);

  return prisma.chat.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      _count: {
        select: { messages: true }
      }
    }
  });
}

// Get chat with messages
export async function getChat(chatId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const chat = await prisma.chat.findFirst({
    where: { id: chatId, userId: user.id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  return chat;
}

// Create new chat
export async function createChat() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");
  await ensureUser(user);

  const chat = await prisma.chat.create({
    data: {
      title: "New Chat",
      userId: user.id,
    },
  });

  revalidatePath("/dashboard/chat");
  return chat;
}

// Send message and get AI response
export async function sendMessage(chatId: string, message: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  // Save user message
  await prisma.message.create({
    data: {
      role: "user",
      content: message,
      chatId,
    },
  });

  // Get chat history
  const chat = await prisma.chat.findFirst({
    where: { id: chatId, userId: user.id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  if (!chat) throw new Error("Chat not found");

  // Build messages for AI
  const messages = chat.messages.map(m => ({
    role: m.role as "user" | "assistant",
    content: m.content,
  }));

  // Add new message
  messages.push({ role: "user", content: message });

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
}

// Delete chat
export async function deleteChat(chatId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  await prisma.chat.delete({
    where: { id: chatId, userId: user.id },
  });

  revalidatePath("/dashboard/chat");
}
