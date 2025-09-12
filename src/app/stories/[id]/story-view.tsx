"use client"

import { useEffect } from 'react';
import type { Story } from '@/lib/types';
import Image from 'next/image';
import CommentSection from '@/components/comment-section';
import { Badge } from '@/components/ui/badge';
import { useReadingProgress } from '@/hooks/use-reading-progress';

interface StoryViewProps {
  story: Story;
}

export default function StoryView({ story }: StoryViewProps) {
    useReadingProgress(story.id);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('readingHistory') || '[]');
        if (!history.includes(story.title)) {
            const newHistory = [...history, story.title];
            localStorage.setItem('readingHistory', JSON.stringify(newHistory.slice(-10))); // Limit history size
        }
    }, [story.title]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <article>
                <header className="mb-8">
                    <h1 className="font-headline text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                        {story.title}
                    </h1>
                    <p className="text-lg text-muted-foreground">By {story.author}</p>
                    <div className="flex gap-2 mt-4">
                        <Badge variant="outline" className="border-accent text-accent">{story.category}</Badge>
                        {story.tags.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                </header>

                <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-8 shadow-lg">
                    <Image
                        src={story.imageUrl}
                        alt={story.title}
                        fill
                        className="object-cover"
                        priority
                        data-ai-hint={story.imageHint}
                    />
                </div>

                <div
                    id="story-content"
                    className="prose prose-lg dark:prose-invert max-w-none font-body text-foreground/90 leading-relaxed space-y-6"
                    dangerouslySetInnerHTML={{ __html: story.content.replace(/\n/g, '<br />') }}
                />
            </article>

            <div className="mt-16">
                <CommentSection storyId={story.id} />
            </div>
        </div>
    );
}
