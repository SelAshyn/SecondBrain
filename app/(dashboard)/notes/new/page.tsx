import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function NewNotePage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
      redirect("/sign-in");
  }

  // Extract plain values for the Server Action
  const userEmail = user.emailAddresses[0]?.emailAddress || "";
  const userName = user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : null;

    async function createNote(formData: FormData) {
      "use server";

      const title = formData.get("title") as string;
      const content = formData.get("content") as string;

      if (!title || !content) return;

      // Ensure user exists in database before creating note
      await db.user.upsert({
        where: { id: userId! },
        create: {
          id: userId!,
          email: userEmail,
          name: userName,
        },
        update: {},
      });

      await db.note.create({
        data: {
          title,
          content,
          userId: userId!,
        },
      });

      revalidatePath("/notes");
      redirect("/notes");
    }

    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create New Note</h1>

        <form action={createNote} className="space-y-4">
          <div>
            <Input
              name="title"
              placeholder="Note title"
              required
            />
          </div>
          <div>
            <Textarea
              name="content"
              placeholder="Write your note..."
              rows={10}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit">Create Note</Button>
            <a href="/notes">
              <Button variant="outline">Cancel</Button>
            </a>
          </div>
        </form>
      </div>
    );
  }
