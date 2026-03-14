import { auth } from "@clerk/nextjs/server";
  import { redirect, notFound } from "next/navigation";
  import { db } from "@/lib/db";
  import Link from "next/link";
  import { Button } from "@/components/ui/button";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

  export default async function NotePage({
    params
  }: {
    params: Promise<{ id: string }>
  }) {
    const { userId } = await auth();
    const { id } = await params;

    if (!userId) {
      redirect("/sign-in");
    }

    const note = await db.note.findUnique({
      where: { id },
    });

    if (!note || note.userId !== userId) {
      notFound();
    }

    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/notes">
            <Button variant="outline">← Back</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{note.content}</p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date(note.updatedAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

