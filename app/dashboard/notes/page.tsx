import Link from "next/link";
import { getNotes } from "./actions";
import { Plus, FileText, Trash2 } from "lucide-react";
import { deleteNote } from "./actions";

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Notes</h1>
          <p className="text-zinc-500">
            {notes.length} {notes.length === 1 ? "note" : "notes"} total
          </p>
        </div>
        <Link
          href="/dashboard/notes/new"
          className="flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-900 rounded-lg hover:bg-zinc-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </Link>
      </div>

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900 rounded-xl border border-zinc-800">
          <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-zinc-200 mb-1">No notes yet</h3>
          <p className="text-zinc-500 mb-4">Create your first note to get started</p>
          <Link
            href="/dashboard/notes/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-900 rounded-lg hover:bg-zinc-200"
          >
            <Plus className="w-4 h-4" />
            <span>Create Note</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="group p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <Link
                  href={`/dashboard/notes/${note.id}`}
                  className="flex-1"
                >
                  <h3 className="font-semibold text-zinc-100 group-hover:text-white line-clamp-1">
                    {note.title}
                  </h3>
                </Link>
                <form action={deleteNote.bind(null, note.id)}>
                  <button
                    type="submit"
                    className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-400 transition-all"
                    title="Delete note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
              <Link href={`/dashboard/notes/${note.id}`}>
                <p className="text-sm text-zinc-400 line-clamp-3 mb-4">
                  {note.content || "No content"}
                </p>
                <p className="text-xs text-zinc-600">
                  Updated {new Date(note.updatedAt).toLocaleDateString()}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
