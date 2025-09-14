
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PenSquare, LayoutDashboard, User, BookText, MicVocal, Calendar, Clapperboard, Newspaper, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/author", label: "Author Profile", icon: User },
  { href: "/admin/stories", label: "Stories", icon: BookText },
  { href: "/admin/podcasts", label: "Podcasts", icon: MicVocal },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/reels", label: "Reels", icon: Clapperboard },
  { href: "/admin/feed", label: "Feed", icon: Newspaper },
];

interface AdminSidebarProps {
    onLinkClick?: () => void;
}

export function AdminSidebar({ onLinkClick }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
        <div className="border-b p-4">
            <Link href="/admin" className="flex items-center gap-2" onClick={onLinkClick}>
                <PenSquare className="h-7 w-7 text-primary" />
                <span className="font-headline text-xl font-bold">
                    Admin Panel
                </span>
            </Link>
        </div>
        <nav className="flex-grow p-4">
            <ul className="space-y-1">
            {adminNavLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                <Link
                    href={href}
                    onClick={onLinkClick}
                    className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-secondary",
                    pathname === href && "bg-secondary text-primary"
                    )}
                >
                    <Icon className="h-4 w-4" />
                    {label}
                </Link>
                </li>
            ))}
            </ul>
        </nav>
        <div className="mt-auto border-t p-4">
             <Link
                href="/settings"
                onClick={onLinkClick}
                className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-secondary",
                )}
            >
                <Settings className="h-4 w-4" />
                Settings
            </Link>
        </div>
    </div>
  );
}
