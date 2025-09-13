
import { FolderKanban } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="container py-16 md:py-24 text-center">
        <FolderKanban className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">Categories</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
            This page is under construction. Soon, you'll be able to browse all stories by genre, from high fantasy to hard sci-fi.
        </p>
    </div>
  );
}
