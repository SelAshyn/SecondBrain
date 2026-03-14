import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Second Brain</h1>
      <p className="text-muted-foreground mb-8">
        Your personal knowledge base powered by AI
      </p>
      <Link href="/notes/">
        <Button size="lg">Get Started</Button>
      </Link>
    </main>
  );
}
