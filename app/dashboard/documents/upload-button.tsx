"use client";

import { useState, useRef } from "react";
import { saveDocument } from "./actions";
import { createClient } from "@/lib/supabase/client";
import { Upload } from "lucide-react";

export default function UploadButton() {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const supabase = createClient();

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Create unique path
      const path = `${user.id}/${Date.now()}-${file.name}`;

      // Upload directly to storage
      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(path, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("documents")
        .getPublicUrl(path);

      // Save to database
      const formData = new FormData();
      formData.append("title", file.name);
      formData.append("fileUrl", publicUrl);
      formData.append("fileType", file.type);
      formData.append("path", path);

      await saveDocument(formData);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file: " + (error as Error).message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleUpload}
        className="hidden"
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-900 rounded-lg hover:bg-zinc-200 disabled:opacity-50 transition-colors"
      >
        <Upload className="w-4 h-4" />
        <span>{uploading ? "Uploading..." : "Upload Document"}</span>
      </button>
    </>
  );
}
