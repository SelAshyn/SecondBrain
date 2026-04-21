import Link from "next/link";
import { FileText, File, MessageCircle } from "lucide-react";

export default function DashboardPage() {
  const quickActions = [
    {
      title: "Create Note",
      description: "Write down your thoughts and ideas",
      icon: FileText,
      href: "/dashboard/notes",
      color: "bg-blue-600",
    },
    {
      title: "Upload Document",
      description: "Store PDFs, Word docs, and more",
      icon: File,
      href: "/dashboard/documents",
      color: "bg-emerald-600",
    },
    {
      title: "Start Chat",
      description: "Ask questions about your data",
      icon: MessageCircle,
      href: "/dashboard/chat",
      color: "bg-violet-600",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-zinc-100">Welcome to Your Second Brain</h1>
        <p className="text-zinc-400">
          Your personal knowledge base. Store notes, upload documents, and chat with your data.
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="group p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all"
          >
            <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-zinc-100 group-hover:text-white">
              {action.title}
            </h3>
            <p className="text-sm text-zinc-500 mt-1">{action.description}</p>
          </Link>
        ))}
      </div>

      {/* Getting Started Section */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
        <h2 className="text-lg font-semibold text-zinc-100 mb-4">Getting Started</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-zinc-400">1</span>
            </div>
            <div>
              <h3 className="font-medium text-zinc-200">Create your first note</h3>
              <p className="text-sm text-zinc-500">
                Click "Notes" in the sidebar or the card above to start writing.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-zinc-400">2</span>
            </div>
            <div>
              <h3 className="font-medium text-zinc-200">Upload documents</h3>
              <p className="text-sm text-zinc-500">
                Store PDFs and documents to reference later.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-zinc-400">3</span>
            </div>
            <div>
              <h3 className="font-medium text-zinc-200">Chat with your data</h3>
              <p className="text-sm text-zinc-500">
                Ask questions and get answers based on your notes and documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
