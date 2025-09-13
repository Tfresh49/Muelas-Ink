
"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
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
import { Pagination } from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

const allCategories = ['All', ...Array.from(new Set(allStories.map(story => story.category)))];
const STORIES_PER_PAGE = 9;

export default function AllStoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const lastScrollY = useRef(0);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsSearchVisible(false); // Scrolling down
      } else {
        setIsSearchVisible(true); // Scrolling up
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredStories = useMemo(() => {
    return allStories.filter(story => {
      const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
      const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            story.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredStories.length / STORIES_PER_PAGE);

  const storiesToShow = useMemo(() => {
    const startIndex = (currentPage - 1) * STORIES_PER_PAGE;
    const endIndex = startIndex + STORIES_PER_PAGE;
    return filteredStories.slice(startIndex, endIndex);
  }, [filteredStories, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container pt-16 md:pt-24 pb-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">All Stories</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Browse through our entire collection of tales. Use the filters below to find your next favorite read.
        </p>
      </div>

      <div className={cn(
        "sticky top-16 z-40 bg-background/80 backdrop-blur-sm transition-all duration-300 py-4 mb-8",
        isSearchVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      )}>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search stories..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
                }}
            />
            </div>
            <Select value={selectedCategory} onValueChange={(value) => {
            setSelectedCategory(value);
            setCurrentPage(1); // Reset to first page on category change
            }}>
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

      {totalPages > 1 && (
        <div className="mt-16 flex justify-center">
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
      )}
    </div>
  );
}
