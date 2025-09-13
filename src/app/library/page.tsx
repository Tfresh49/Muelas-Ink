
import { Library } from 'lucide-react';

export default function LibraryPage() {
  return (
    <div className="container py-16 md:py-24 text-center">
        <Library className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">My Library</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
            This page is under construction. Your personal library will soon be available here, containing your bookmarked stories, reading history, and more.
        </p>
    </div>
  );
}
