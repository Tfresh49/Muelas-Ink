
import { Compass } from 'lucide-react';

export default function DiscoverPage() {
  return (
    <div className="container py-16 md:py-24 text-center">
        <Compass className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">Discover</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
            This page is under construction. Soon, you'll be able to discover trending stories, featured authors, and curated collections right here.
        </p>
    </div>
  );
}
