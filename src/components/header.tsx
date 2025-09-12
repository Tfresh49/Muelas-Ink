
"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Bell, Menu, PenSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Sidebar } from "./sidebar";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  const showNotifications = () => {
    toast({
      title: "New Notifications",
      description: "You have 3 new messages!",
    });
  }

  return (
    <>
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu />
              <span className="sr-only">Open Menu</span>
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <PenSquare className="h-7 w-7 text-primary" />
              <span className="font-headline text-2xl font-bold hidden sm:inline-block">
                Muelas Ink
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Home</Link>
            <Link href="/stories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">All Stories</Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Discover</Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Categories</Link>
          </nav>
          <div className="flex items-center gap-2">
             <Button variant="ghost" size="icon" onClick={showNotifications}>
                <Bell />
                <span className="sr-only">Notifications</span>
            </Button>
            <ThemeToggle />
            <div className="hidden md:block">
              <Button onClick={() => setSidebarOpen(true)}>
                <Menu className="mr-2" />
                Menu
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
