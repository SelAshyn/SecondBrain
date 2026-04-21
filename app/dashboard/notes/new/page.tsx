import { createNote } from "../actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewNotePage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/notes"
          className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-zinc-100">New Note</h1>
      </div>

      {/* Form */}
      <form action={createNote} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="Enter note title..."
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600 text-zinc-100 placeholder:text-zinc-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">
            Content
          </label>
          <textarea
            name="content"
            rows={12}
            placeholder="Start writing..."
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600 resize-none text-zinc-100 placeholder:text-zinc-600"
          />
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-zinc-100 text-zinc-900 rounded-lg hover:bg-zinc-200 transition-colors"
          >
            Create Note
          </button>
          <Link
            href="/dashboard/notes"
            className="px-6 py-2 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
