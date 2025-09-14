
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { allStories } from "@/lib/data";
import { Badge } from "./ui/badge";
import {
  Award,
  BookOpen,
  Compass,
  Home,
  Info,
  Library,
  LogIn,
  LogOut,
  Settings,
  User,
  UserPlus,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";


interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const hotTags = ["romance", "fantasy", "mystery", "sci-fi", "adventure", "thriller"];
const categories = Array.from(new Set(allStories.map(story => story.category)));

const subCategories: Record<string, string[]> = {
    'Fantasy': ['Urban', 'Epic', 'Magical Realism'],
    'Sci-Fi': ['Space Opera', 'Cyberpunk', 'Time Travel'],
};

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const { isAuthenticated, logout } = useAuth();
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full md:w-[400px] sm:max-w-full p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle>
            Stories: {allStories.length.toLocaleString()}
          </SheetTitle>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto p-6 pt-0">
          <div className="flex flex-col items-start gap-2 mb-6">
            <Button variant="link" className="p-0 h-auto text-lg text-foreground" asChild>
                <Link href="/" className="flex items-center gap-3">
                    <Home className="h-5 w-5" />
                    Home
                </Link>
            </Button>
            <Button variant="link" className="p-0 h-auto text-lg text-foreground" asChild>
                <Link href="/stories" className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5" />
                    All Stories
                </Link>
            </Button>
            <Button variant="link" className="p-0 h-auto text-lg text-foreground" asChild>
                <Link href="/discover" className="flex items-center gap-3">
                    <Compass className="h-5 w-5" />
                    Discover
                </Link>
            </Button>
            <Button variant="link" className="p-0 h-auto text-lg text-foreground" asChild>
                <Link href="/readers-choice" className="flex items-center gap-3">
                    <Award className="h-5 w-5" />
                    Readers Choice
                </Link>
            </Button>
          </div>

          <Input placeholder="Search stories..." className="mb-4" />
          
          <h3 className="font-headline text-lg font-semibold mb-2">Hot Tags</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {hotTags.map(tag => (
              <Link key={tag} href={`/stories?tag=${tag}`} passHref>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-muted">{tag}</Badge>
              </Link>
            ))}
          </div>

          <h3 className="font-headline text-lg font-semibold mb-2">Categories</h3>
          <Accordion type="single" collapsible className="w-full">
            {categories.map(category => (
              <AccordionItem value={category} key={category}>
                <AccordionTrigger>{category}</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col items-start pl-4">
                     {subCategories[category] ? (
                        subCategories[category].map(sub => (
                             <Button variant="link" className="p-0 h-auto text-muted-foreground" key={sub} asChild><Link href={`/categories?subcategory=${sub}`}>{sub}</Link></Button>
                        ))
                     ) : (
                        <span className="text-muted-foreground text-sm">No sub-categories</span>
                     )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

            <div className="flex flex-col items-start gap-2 mt-6 mb-6">
                 {isAuthenticated ? (
                    <>
                        <Button variant="link" className="p-0 h-auto text-lg text-foreground" asChild>
                            <Link href="/library" className="flex items-center gap-3">
                                <Library className="h-5 w-5" />
                                My Library
                            </Link>
                        </Button>
                        <Button variant="link" className="p-0 h-auto text-lg text-foreground" asChild>
                            <Link href="/profile" className="flex items-center gap-3">
                                <User className="h-5 w-5" />
                                Profile
                            </Link>
                        </Button>
                         <Button variant="link" className="p-0 h-auto text-lg text-foreground" onClick={logout}>
                           <div className="flex items-center gap-3">
                                <LogOut className="h-5 w-5" />
                                Logout
                           </div>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button variant="link" className="p-0 h-auto text-lg text-foreground" asChild>
                            <Link href="/login" className="flex items-center gap-3">
                                <LogIn className="h-5 w-5" />
                                Login
                            </Link>
                        </Button>
                        <Button variant="link" className="p-0 h-auto text-lg text-foreground" asChild>
                            <Link href="/signup" className="flex items-center gap-3">
                                <UserPlus className="h-5 w-5" />
                                Sign Up
                            </Link>
                        </Button>
                    </>
                )}
                 <hr className="w-full my-2 border-border" />
                <Button variant="link" className="p-0 h-auto text-lg text-foreground" asChild>
                    <Link href="/about" className="flex items-center gap-3">
                        <Info className="h-5 w-5" />
                        About Us
                    </Link>
                </Button>
                <Button variant="link" className="p-0 h-auto text-lg text-foreground" asChild>
                    <Link href="/settings" className="flex items-center gap-3">
                        <Settings className="h-5 w-5" />
                        Settings
                    </Link>
                </Button>
            </div>
        </div>
         <div className="p-6 border-t mt-auto text-center">
            <a href="mailto:brainiacgoatdev@gmail.com" className="text-sm text-muted-foreground hover:text-primary">
              Created by Brainiac-Goat-Dev
            </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
