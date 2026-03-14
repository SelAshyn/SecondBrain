import { auth } from "@clerk/nextjs/server";
  import { redirect } from "next/navigation";
  import Link from "next/link";
  import { db } from "@/lib/db";
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

  export default async function NotesPage() {
    const { userId } = await auth();

    if (!userId) {
      redirect("/sign-in");
    }

    const notes = await db.note.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });

    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Notes</h1>
          <Link href="/notes/new">
            <Button>Create Note</Button>
          </Link>
        </div>

        {notes.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            No notes yet. Create your first note!
          </p>
        ) : (
          <div className="grid gap-4">
            {notes.map((note) => (
              <Link key={note.id} href={`/notes/${note.id}`}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardHeader>
                    <CardTitle>{note.title}</CardTitle>
                    <CardDescription>
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {note.content}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
