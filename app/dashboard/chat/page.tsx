import { getChats, createChat } from "./actions";
import ChatList from "./chat-list";
import ChatInterface from "./chat-interface";
import NewChatInput from "./new-chat-input";

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const chats = await getChats();
  const chatId = params.chat as string | undefined;
  const initialMessage = params.initial as string | undefined;

  return (
    <div className="h-[calc(100vh-4rem)] flex gap-6">
      {/* Chat List Sidebar */}
      <ChatList chats={chats} currentChatId={chatId} />

      {/* Chat Area */}
      <div className="flex-1 min-w-0">
        {chatId ? (
          <ChatInterface chatId={chatId} initialMessage={initialMessage} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500">
            <MessageCircleIcon className="w-12 h-12 mb-4 text-zinc-700" />
            <p className="text-lg mb-8">Start a new conversation</p>
            <NewChatInput initialMessage={initialMessage} />
          </div>
        )}
      </div>
    </div>
  );
}

function MessageCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
