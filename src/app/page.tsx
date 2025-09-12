
"use client";

import { useMemo } from 'react';
import { allStories } from '@/lib/data';
import StoryCard from '@/components/story-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function Home() {
  const featuredStories = useMemo(() => {
    // Example logic: feature stories with high ratings
    return [...allStories].sort((a, b) => b.rating - a.rating).slice(0, 5);
  }, []);

  const latestStories = useMemo(() => {
    // Example logic: slice the last 6 stories, assuming they are sorted by date (which they are not in mock data)
    return allStories.slice(-6).reverse();
  }, []);

  const popularStories = useMemo(() => {
    // Example logic: sort by views
    return [...allStories].sort((a, b) => b.views - a.views).slice(0, 6);
  }, []);

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
              <Link href="/stories">Start Reading</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
               <Link href="/stories">Browse All Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="featured" className="py-16 md:py-24">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Stories</h2>
            <Button variant="link" asChild>
                <Link href="/stories">View All <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredStories.map((story) => (
                <CarouselItem key={story.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <StoryCard story={story} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>
      
      <section id="latest" className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Latest Stories</h2>
            <Button variant="link" asChild>
                <Link href="/stories">View All <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestStories.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
        </div>
      </section>

      <section id="popular" className="py-16 md:py-24">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Most Popular</h2>
             <Button variant="link" asChild>
                <Link href="/stories">View All <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularStories.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
        </div>
      </section>
    </div>
  );
}
