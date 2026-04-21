"use server";

  import { createClient } from "@/lib/supabase/server";
  import { prisma } from "@/lib/prisma";
  import { revalidatePath } from "next/cache";

  // Get user's documents
  export async function getDocuments() {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    // Ensure user exists (for new signups)
    await ensureUser(user);

    return prisma.document.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
  }

  // Ensure user exists in database (sync from Supabase Auth)
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

  // Save document to database after upload
  export async function saveDocument(formData: FormData) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    // Ensure user exists in our database
    await ensureUser(user);

    const title = formData.get("title") as string;
    const fileUrl = formData.get("fileUrl") as string;
    const fileType = formData.get("fileType") as string;

    await prisma.document.create({
      data: {
        title,
        fileUrl,
        fileType,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard/documents");
  }

  // Delete document
  export async function deleteDocument(documentId: string, filePath: string) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    // Delete from storage
    await supabase.storage.from("documents").remove([filePath]);

    // Delete from database
    await prisma.document.delete({
      where: { id: documentId, userId: user.id },
    });

    revalidatePath("/dashboard/documents");
  }
