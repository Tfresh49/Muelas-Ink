"use client";

import { useState, useMemo } from 'react';
import { allStories } from '@/lib/data';
import StoryCard from '@/components/story-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const allCategories = ['All', ...Array.from(new Set(allStories.map(story => story.category)))];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredStories = useMemo(() => {
    return allStories.filter(story => {
      const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
      const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            story.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div>
      <section className="py-16 md:py-24 text-center bg-secondary">
        <div className="container">
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">
            This is a demo stories sharing site
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            So this is what the website might look like to your readers
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="#stories">Start Reading</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
               <Link href="#stories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="stories" className="py-16 md:py-24">
        <div className="container">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-2">Featured Stories</h2>
          <p className="text-muted-foreground mb-8">Check out some of our most popular stories from talented writers around the world.</p>

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
          
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No stories found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
