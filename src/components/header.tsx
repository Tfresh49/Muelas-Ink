"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { PenSquare } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-black text-white">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <PenSquare className="h-7 w-7" />
          <span className="font-headline text-2xl font-bold">Muelas Ink</span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
