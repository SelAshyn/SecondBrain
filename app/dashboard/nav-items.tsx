"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, File, MessageCircle } from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/notes", icon: FileText, label: "Notes" },
  { href: "/dashboard/documents", icon: File, label: "Documents" },
  { href: "/dashboard/chat", icon: MessageCircle, label: "Chat" },
];

export default function NavItems() {
  const pathname = usePathname();

  return (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </>
  );
}
