
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
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full md:w-[400px] sm:max-w-full p-0 flex flex-col">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle className="flex justify-between items-center">
            <span>Stories: {allStories.length.toLocaleString()}</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto p-6">
          <Input placeholder="Search stories..." className="mb-4" />
          
          <h3 className="font-headline text-lg font-semibold mb-2">Hot Tags</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {hotTags.map(tag => (
              <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-muted">{tag}</Badge>
            ))}
          </div>

          <div className="space-y-2 mb-6">
            <Button variant="link" className="p-0 h-auto text-lg text-accent-foreground" asChild><Link href="#">Discover</Link></Button>
            <Button variant="link" className="p-0 h-auto text-lg text-accent-foreground" asChild><Link href="#">Readers Choice</Link></Button>
            <Button variant="link" className="p-0 h-auto text-lg text-accent-foreground" asChild><Link href="#">New & Hots</Link></Button>
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
                             <Button variant="link" className="p-0 h-auto text-muted-foreground" key={sub} asChild><Link href="#">{sub}</Link></Button>
                        ))
                     ) : (
                        <span className="text-muted-foreground text-sm">No sub-categories</span>
                     )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

            <div className="space-y-2 mt-6 mb-6">
                <Button variant="link" className="p-0 h-auto text-lg text-accent-foreground" asChild><Link href="#">My Library</Link></Button>
                <Button variant="link" className="p-0 h-auto text-lg text-accent-foreground" asChild><Link href="#">Following</Link></Button>
                <Button variant="link" className="p-0 h-auto text-lg text-accent-foreground" asChild><Link href="#">Settings</Link></Button>
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
