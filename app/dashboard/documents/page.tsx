import { getDocuments } from "./actions";
import UploadButton from "./upload-button";
import { File, Trash2, Download } from "lucide-react";
import { deleteDocument } from "./actions";

export default async function DocumentsPage() {
  const documents = await getDocuments();

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return "PDF";
    if (fileType.includes("word") || fileType.includes("doc")) return "DOC";
    return "FILE";
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Documents</h1>
          <p className="text-zinc-500">
            {documents.length} {documents.length === 1 ? "document" : "documents"} stored
          </p>
        </div>
        <UploadButton />
      </div>

      {/* Documents Grid */}
      {documents.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900 rounded-xl border border-zinc-800">
          <File className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-zinc-200 mb-1">No documents yet</h3>
          <p className="text-zinc-500 mb-4">Upload your first PDF or document</p>
          <br /><br />
          <center><UploadButton /></center>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => {
            const filePath = doc.fileUrl.split("/documents/")[1];

            return (
              <div
                key={doc.id}
                className="group p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-zinc-400">
                      {getFileIcon(doc.fileType)}
                    </span>
                  </div>
                  <form
                    action={deleteDocument.bind(null, doc.id, filePath)}
                  >
                    <button
                      type="submit"
                      className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                      title="Delete document"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                <h3 className="font-semibold text-zinc-100 mb-1 line-clamp-1">
                  {doc.title}
                </h3>
                <p className="text-xs text-zinc-600 mb-4">
                  Uploaded {new Date(doc.createdAt).toLocaleDateString()}
                </p>

                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
