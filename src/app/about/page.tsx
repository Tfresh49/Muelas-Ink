
import { Info } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container py-16 md:py-24 text-center">
        <Info className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">About Muelas Ink</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
            This page is under construction. We're preparing a page to share our story, our mission, and the amazing team behind Muelas Ink.
        </p>
    </div>
  );
}
