import { getNotes, updateNote, deleteNote } from "../actions";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditNotePage({
  params,
}: {
  params: { id: string };
}) {
  const notes = await getNotes();
  const note = notes.find((n) => n.id === params.id);

  if (!note) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/notes"
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-zinc-100">Edit Note</h1>
        </div>
        <form action={deleteNote.bind(null, note.id)}>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </form>
      </div>

      {/* Form */}
      <form action={updateNote.bind(null, note.id)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={note.title}
            required
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600 text-zinc-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">
            Content
          </label>
          <textarea
            name="content"
            rows={12}
            defaultValue={note.content}
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600 resize-none text-zinc-100"
          />
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-zinc-100 text-zinc-900 rounded-lg hover:bg-zinc-200 transition-colors"
          >
            Save Changes
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
