'use client';

import {SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {isSignedIn} = useAuth()

  return (
    <div className="min-h-screen">
      <header className="border-b px-4 py-3 flex items-center justify-between">
        <Link href="/notes" className="font-bold text-xl">
          Second Brain
        </Link>

        <div className="flex items-center gap-4">
            {isSignedIn ? <UserButton /> : <SignInButton />}
        </div>
      </header>

      <main className="p-4">{children}</main>
    </div>
  );
}
