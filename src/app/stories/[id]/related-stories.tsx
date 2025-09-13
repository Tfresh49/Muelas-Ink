
"use client";

import { useEffect, useState } from 'react';
import { recommendRelatedStories } from '@/ai/flows/recommend-related-stories';
import { allStories } from '@/lib/data';
import type { Story } from '@/lib/types';
import StoryCard from '@/components/story-card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RelatedStoriesProps {
    currentStoryId: string;
}

export default function RelatedStories({ currentStoryId }: RelatedStoriesProps) {
    const [recommendedStories, setRecommendedStories] = useState<Story[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchRecommendations = async () => {
            setIsLoading(true);
            try {
                const readingHistory = JSON.parse(localStorage.getItem('readingHistory') || '[]').join(', ');
                
                const response = await recommendRelatedStories({
                    readingHistory: readingHistory || "none",
                    searchQueries: '', // Can be extended to include search queries
                    numberOfRecommendations: 4, // Fetch 4 to have a fallback if current story is included
                });

                const recommendedTitles = response.recommendedStories;

                const stories = allStories.filter(story => 
                    recommendedTitles.includes(story.title) && story.id !== currentStoryId
                ).slice(0, 3); // Ensure we don't show the current story and limit to 3

                setRecommendedStories(stories);
            } catch (error) {
                console.error("Failed to fetch recommendations:", error);
                toast({
                    title: "AI Error",
                    description: "Could not fetch AI recommendations. Please try again later.",
                    variant: "destructive",
                });
                // Fallback to simple category-based recommendation
                const currentStory = allStories.find(s => s.id === currentStoryId);
                if (currentStory) {
                    const fallbackStories = allStories.filter(s => 
                        s.category === currentStory.category && s.id !== currentStoryId
                    ).slice(0, 3);
                    setRecommendedStories(fallbackStories);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, [currentStoryId, toast]);

    if (isLoading) {
        return (
            <div className="text-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                <p className="mt-2 text-muted-foreground">Generating AI Recommendations...</p>
            </div>
        );
    }
    
    if (recommendedStories.length === 0) {
        return null; // Don't render the section if there are no stories
    }

    return (
        <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8">Related Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedStories.map(story => (
                    <StoryCard key={story.id} story={story} />
                ))}
            </div>
        </div>
    );
}
