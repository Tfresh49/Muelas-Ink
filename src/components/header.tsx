
"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Bell, Menu, PenSquare } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Notifications from "./notifications";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { toast } = useToast();

  const showNotifications = () => {
    toast({
      title: "New Notifications",
      description: "You have 3 new messages!",
    });
  }

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-11 md:h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <PenSquare className="h-7 w-7 text-primary" />
              <span className="font-headline text-2xl font-bold">
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
             <div className="hidden md:block">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Bell />
                    <span className="sr-only">Notifications</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <Notifications />
                </PopoverContent>
              </Popover>
            </div>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Bell />
                    <span className="sr-only">Notifications</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Notifications</SheetTitle>
                  </SheetHeader>
                  <Notifications />
                </SheetContent>
              </Sheet>
            </div>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="md:hidden"
            >
              <Menu />
              <span className="sr-only">Open Menu</span>
            </Button>
            <div className="hidden md:block">
              <Button onClick={onMenuClick}>
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
