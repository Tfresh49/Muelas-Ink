
import { Award } from 'lucide-react';

export default function ReadersChoicePage() {
  return (
    <div className="container py-16 md:py-24 text-center">
        <Award className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">Readers' Choice</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
            This page is under construction. We're building a special place to honor the stories and authors you love the most, based on community ratings and reviews.
        </p>
    </div>
  );
}
