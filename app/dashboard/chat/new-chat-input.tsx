"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { createChat } from "./actions";

export default function NewChatInput() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const message = input.trim();
    setLoading(true);

    try {
      // Create new chat
      const chat = await createChat();
      if (!chat) throw new Error("Failed to create chat");

      // Navigate to chat with initial message
      window.location.href = `/dashboard/chat?chat=${chat.id}&initial=${encodeURIComponent(message)}`;
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <form onSubmit={handleSend} className="w-full max-w-2xl flex items-end gap-2 px-4">
      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your first message..."
        rows={1}
        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-500 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-600"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={!input.trim() || loading}
        className="p-3 bg-zinc-100 text-zinc-900 rounded-xl hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </button>
    </form>
  );
}
