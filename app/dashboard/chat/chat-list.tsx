"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Trash2, MessageCircle } from "lucide-react";
import { createChat, deleteChat } from "./actions";

interface Chat {
  id: string;
  title: string;
  updatedAt: Date;
  _count: { messages: number };
}

interface ChatListProps {
  chats: Chat[];
  currentChatId?: string;
}

export default function ChatList({ chats, currentChatId }: ChatListProps) {
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleCreateChat(formData: FormData) {
    const chat = await createChat();
    if (chat) {
      window.location.href = `/dashboard/chat?chat=${chat.id}`;
    }
  }

  async function handleDeleteChat(chatId: string) {
    setDeleting(chatId);
    await deleteChat(chatId);
    if (currentChatId === chatId) {
      window.location.href = "/dashboard/chat";
    }
    setDeleting(null);
  }

  return (
    <div className="w-64 flex flex-col bg-zinc-900/50 rounded-xl border border-zinc-800">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <h2 className="font-semibold text-zinc-100">Chats</h2>
        <form action={handleCreateChat}>
          <button
            type="submit"
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
            title="New Chat"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {chats.length === 0 ? (
          <div className="text-center py-8 text-zinc-500">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No chats yet</p>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`group flex items-center gap-2 p-3 rounded-lg transition-colors ${
                currentChatId === chat.id
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
              }`}
            >
              <Link
                href={`/dashboard/chat?chat=${chat.id}`}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium truncate">{chat.title}</p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {chat._count.messages} messages
                </p>
              </Link>
              <button
                onClick={() => handleDeleteChat(chat.id)}
                disabled={deleting === chat.id}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-zinc-500 hover:text-red-400 transition-all"
                title="Delete chat"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
