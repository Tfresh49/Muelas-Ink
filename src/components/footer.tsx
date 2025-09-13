
"use client";
import { Facebook, Twitter, Instagram, Send } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';

export function Footer() {
    const { toast } = useToast();

    const showCoffeeToast = () => {
        toast({
            title: "Buy me a coffee",
            description: "In a real site this will allow your readers to give you a tip!",
        });
    }

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-bold">Newsletter</h3>
            <p>Subscribe to get updates on new stories and features.</p>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Your email" />
                <Button type="submit">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Subscribe</span>
                </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Discover</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Categories</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">New Stories</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-bold">Follow Us</h3>
            <p>Stay connected on social media for daily updates.</p>
            <div className="flex items-center gap-4">
              <Link href="#" aria-label="Facebook"><Facebook className="h-6 w-6 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Twitter"><Twitter className="h-6 w-6 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-6 w-6 hover:text-primary transition-colors" /></Link>
            </div>
          </div>
          <div className="space-y-4 text-center md:text-left col-span-1 md:col-span-2 lg:col-span-1">
             <div className="space-y-4">
                <h3 className="font-headline text-lg font-bold">Support Us</h3>
                <p>If you enjoy the stories, consider supporting the authors.</p>
                <Button onClick={showCoffeeToast}>Buy us a coffee</Button>
             </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Muelas Ink. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
