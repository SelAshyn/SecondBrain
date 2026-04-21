 "use server";

  import { prisma } from "@/lib/prisma";
  import { createClient } from "@/lib/supabase/server";
  import { revalidatePath } from "next/cache";
  import { redirect } from "next/navigation";

  // Get all notes for current user
  export async function getNotes() {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Not authenticated");
    }

    return prisma.note.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
    });
  }

  // Create a new note
  export async function createNote(formData: FormData) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Not authenticated");
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await prisma.note.create({
      data: {
        title,
        content,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard/notes");
    redirect("/dashboard/notes");
  }

  // Update a note
  export async function updateNote(noteId: string, formData: FormData) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Not authenticated");
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await prisma.note.update({
      where: { id: noteId, userId: user.id },
      data: { title, content },
    });

    revalidatePath("/dashboard/notes");
    redirect("/dashboard/notes");
  }

  // Delete a note
  export async function deleteNote(noteId: string) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Not authenticated");
    }

    await prisma.note.delete({
      where: { id: noteId, userId: user.id },
    });

    revalidatePath("/dashboard/notes");
  }
