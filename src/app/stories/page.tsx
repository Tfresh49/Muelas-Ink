
"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { allStories } from '@/lib/data';
import StoryCard from '@/components/story-card';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const allCategories = ['All', ...Array.from(new Set(allStories.map(story => story.category)))];
const STORIES_PER_PAGE = 6;

export default function AllStoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleStoriesCount, setVisibleStoriesCount] = useState(STORIES_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  const filteredStories = useMemo(() => {
    return allStories.filter(story => {
      const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
      const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            story.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const storiesToShow = useMemo(() => {
    return filteredStories.slice(0, visibleStoriesCount);
  }, [filteredStories, visibleStoriesCount]);

  const allStoriesLoaded = visibleStoriesCount >= filteredStories.length;

  const loadMoreStories = useCallback(() => {
    if (isLoading || allStoriesLoaded) return;

    setIsLoading(true);
    setTimeout(() => {
      setVisibleStoriesCount(prevCount => prevCount + STORIES_PER_PAGE);
      setIsLoading(false);
    }, 1000); // Simulate network delay
  }, [isLoading, allStoriesLoaded]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreStories();
        }
      },
      { threshold: 1.0 }
    );

    const loader = loaderRef.current;
    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
    };
  }, [loadMoreStories]);

  useEffect(() => {
    // Reset visible stories when filters change
    setVisibleStoriesCount(STORIES_PER_PAGE);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">All Stories</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Browse through our entire collection of tales. Use the filters below to find your next favorite read.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search stories..."
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[180px] h-12">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {allCategories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {storiesToShow.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {storiesToShow.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No stories found. Try a different search or category.</p>
        </div>
      )}

      <div ref={loaderRef} className="mt-16 text-center">
        {isLoading && (
          <div className="flex justify-center items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-muted-foreground">Loading more stories...</span>
          </div>
        )}
        {!isLoading && allStoriesLoaded && storiesToShow.length > 0 && (
          <div className="p-6 rounded-lg bg-secondary text-secondary-foreground">
            <h3 className="font-headline text-2xl font-bold">You're all caught up!</h3>
            <p>You've reached the end of the list.</p>
          </div>
        )}
      </div>
    </div>
  );
}
