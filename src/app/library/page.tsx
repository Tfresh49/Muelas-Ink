
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { allStories } from '@/lib/data';
import StoryCard from '@/components/story-card';
import { Library, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Story } from '@/lib/types';

export default function LibraryPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [bookmarkedStories, setBookmarkedStories] = useState<Story[]>([]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
    
    if (isAuthenticated) {
      const bookmarkedIds = JSON.parse(localStorage.getItem('bookmarkedStories') || '{}');
      const stories = allStories.filter(story => bookmarkedIds[story.id]);
      setBookmarkedStories(stories);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="container py-16 md:py-24 text-center">
        <Library className="h-16 w-16 mx-auto text-primary animate-pulse" />
        <p className="text-muted-foreground mt-4">Loading your library...</p>
      </div>
    );
  }

  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">My Library</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Your collection of bookmarked stories.
        </p>
      </div>

      {bookmarkedStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookmarkedStories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your library is empty</h2>
          <p className="text-muted-foreground mb-6">
            Bookmark stories to see them here.
          </p>
          <Button asChild>
            <Link href="/stories">Explore Stories</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
