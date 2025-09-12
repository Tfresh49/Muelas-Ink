
"use client"

import { useEffect, useState } from 'react';
import type { Story } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import CommentSection from '@/components/comment-section';
import { Badge } from '@/components/ui/badge';
import { useReadingProgress } from '@/hooks/use-reading-progress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, UserCircle, Heart, Eye, Star } from 'lucide-react';
import { cn } from '@/lib/utils';


interface StoryViewProps {
  story: Story;
}

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />);
    } else {
      stars.push(<Star key={i} className="w-5 h-5 text-gray-400" />);
    }
  }
  return <div className="flex items-center">{stars}</div>;
};


export default function StoryView({ story }: StoryViewProps) {
    useReadingProgress(story.id);

    const [likes, setLikes] = useState(story.likes);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('readingHistory') || '[]');
        if (!history.includes(story.title)) {
            const newHistory = [...history, story.title];
            localStorage.setItem('readingHistory', JSON.stringify(newHistory.slice(-10))); // Limit history size
        }
        
        const likedStories = JSON.parse(localStorage.getItem('likedStories') || '{}');
        if (likedStories[story.id]) {
            setIsLiked(true);
        }

    }, [story.id, story.title]);

    const handleLike = () => {
      const likedStories = JSON.parse(localStorage.getItem('likedStories') || '{}');
      if (isLiked) {
        setLikes(likes - 1);
        delete likedStories[story.id];
      } else {
        setLikes(likes + 1);
        likedStories[story.id] = true;
      }
      setIsLiked(!isLiked);
      localStorage.setItem('likedStories', JSON.stringify(likedStories));
    };

    const storyImages = PlaceHolderImages.filter(img => img.imageHint === story.imageHint);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <article>
                <header className="mb-8">
                     <div className="flex gap-2 mb-4">
                        <Badge variant="outline" className="border-accent text-accent">{story.category}</Badge>
                        {story.tags.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                    <h1 className="font-headline text-4xl md:text-5xl font-extrabold mb-2 leading-tight">
                        {story.title}
                    </h1>
                     <div className="flex items-center gap-2 text-lg text-muted-foreground mt-4">
                        <UserCircle className="h-6 w-6" />
                        <span>{story.author}</span>
                    </div>
                </header>

                <Carousel
                  plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
                  className="w-full rounded-lg overflow-hidden mb-8 shadow-lg"
                >
                  <CarouselContent>
                    {storyImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative h-64 md:h-96 w-full">
                          <Image
                            src={image.imageUrl}
                            alt={story.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                            data-ai-hint={image.imageHint}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                
                <div className="my-8 p-4 bg-secondary rounded-lg flex justify-around items-center text-center">
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-2">
                           <StarRating rating={story.rating} />
                        </div>
                        <span className="text-sm text-muted-foreground">({story.rating.toFixed(1)} Rating)</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                         <div className="flex items-center gap-2">
                            <Eye className="h-6 w-6" />
                            <span className="font-bold text-lg">{story.views.toLocaleString()}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Views</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={handleLike} className="flex items-center gap-2 group">
                            <Heart className={cn("h-6 w-6 transition-all group-hover:fill-red-500 group-hover:text-red-500", isLiked ? "fill-red-500 text-red-500" : "")} />
                             <span className="font-bold text-lg">{likes.toLocaleString()}</span>
                        </Button>
                        <span className="text-sm text-muted-foreground">Likes</span>
                    </div>
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

            <div className="mt-16 text-center">
                <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline">
                    <ArrowLeft className="h-4 w-4" />
                    Back to all stories
                </Link>
            </div>
        </div>
    );
}
