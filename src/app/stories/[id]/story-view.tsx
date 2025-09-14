
"use client"

import { useEffect, useState } from 'react';
import type { Story } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CommentSection from '@/components/comment-section';
import { Badge } from '@/components/ui/badge';
import { useReadingProgress } from '@/hooks/use-reading-progress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, UserCircle, Heart, Eye, Star, Bookmark, Share2, Loader2, Volume2, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RelatedStories from './related-stories';
import ReadingProgressBar from '@/components/reading-progress-bar';
import { useToast } from '@/hooks/use-toast';
import { generateStoryAudio } from '@/ai/flows/story-audio-flow';
import AudioPlayer from '@/components/audio-player';
import { useAuth } from '@/hooks/use-auth';

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

// Map display names to API voice names
const voiceOptions: Record<string, string> = {
    'Standard': 'Algenib', // Default
    'Deep': 'Regulus', 
    'Bright': 'Tiamat',
    'Calm': 'Mirfak',
};
const voiceDisplayNames = Object.keys(voiceOptions);


export default function StoryView({ story }: StoryViewProps) {
    useReadingProgress(story.id);

    const [likes, setLikes] = useState(story.likes);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
    const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState(voiceDisplayNames[0]);
    const [showPaywall, setShowPaywall] = useState(false);

    const router = useRouter();
    const { toast } = useToast();
    const { isAuthenticated } = useAuth();
    
    const getAudioStorageKey = (voice: string) => `audio-${story.id}-${voice}`;

    useEffect(() => {
        const hasHadFirstRead = localStorage.getItem('hasHadFirstRead');

        if (!isAuthenticated && hasHadFirstRead) {
            setShowPaywall(true);
        } else {
            localStorage.setItem('hasHadFirstRead', 'true');
        }

        const history = JSON.parse(localStorage.getItem('readingHistory') || '[]').join(', ');
        if (!history.includes(story.title)) {
            const newHistory = [...history, story.title];
            localStorage.setItem('readingHistory', JSON.stringify(newHistory.slice(-10))); // Limit history size
        }
        
        const likedStories = JSON.parse(localStorage.getItem('likedStories') || '{}');
        if (likedStories[story.id]) {
            setIsLiked(true);
        }

        const bookmarkedStories = JSON.parse(localStorage.getItem('bookmarkedStories') || '{}');
        if (bookmarkedStories[story.id]) {
            setIsBookmarked(true);
        }

        const storedAudio = localStorage.getItem(getAudioStorageKey(selectedVoice));
        if(storedAudio) {
            setAudioDataUri(storedAudio);
        } else {
            setAudioDataUri(null);
        }

    }, [story.id, story.title, selectedVoice, isAuthenticated]);

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

    const handleBookmark = () => {
        if (!isAuthenticated) {
            toast({
                title: "Login Required",
                description: "Please log in to bookmark stories.",
                action: <Button onClick={() => router.push('/login')}>Login</Button>
            });
            return;
        }
        const bookmarkedStories = JSON.parse(localStorage.getItem('bookmarkedStories') || '{}');
        if (isBookmarked) {
            delete bookmarkedStories[story.id];
        } else {
            bookmarkedStories[story.id] = true;
        }
        setIsBookmarked(!isBookmarked);
        localStorage.setItem('bookmarkedStories', JSON.stringify(bookmarkedStories));
    };

    const handleShare = async () => {
        const shareData = {
            title: story.title,
            text: `Check out this story: "${story.title}" by ${story.author}`,
            url: window.location.href,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast({
                    title: "Link Copied!",
                    description: "The story URL has been copied to your clipboard.",
                });
            }
        } catch (error) {
            console.error("Share failed:", error);
            await navigator.clipboard.writeText(window.location.href);
            toast({
                title: "Link Copied!",
                description: "The story URL has been copied to your clipboard.",
            });
        }
    };
    
    const handleListen = async () => {
        if (showPaywall) {
             toast({
                title: "Feature Locked",
                description: "Please sign up or log in to use the audio feature.",
                action: <Button onClick={() => router.push('/signup')}>Sign Up</Button>
            });
            return;
        }
        const cachedAudio = localStorage.getItem(getAudioStorageKey(selectedVoice));
        if (cachedAudio) {
            setAudioDataUri(cachedAudio);
            return;
        }

        setIsGeneratingAudio(true);
        try {
            const voiceName = voiceOptions[selectedVoice];
            const response = await generateStoryAudio({ storyContent: story.content, voiceName });
            setAudioDataUri(response.audioDataUri);
            localStorage.setItem(getAudioStorageKey(selectedVoice), response.audioDataUri);
        } catch (error) {
            console.error("Failed to generate audio:", error);
            toast({
                title: "Audio Generation Failed",
                description: "Could not generate audio for this story. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsGeneratingAudio(false);
        }
    };

    const storyImages = PlaceHolderImages.filter(img => img.imageHint === story.imageHint);

    return (
        <>
            <ReadingProgressBar />
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
                           <Link href={`/authors/${story.authorSlug}`} className="flex items-center gap-2 hover:text-primary">
                             <UserCircle className="h-6 w-6" />
                             <span>{story.author}</span>
                           </Link>
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
                    
                    <div className="my-8 p-4 bg-secondary rounded-lg flex flex-wrap justify-around items-center text-center gap-4">
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
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center gap-1">
                                <Button variant="ghost" size="icon" onClick={handleLike} className="flex items-center gap-2">
                                    <Heart className={cn("h-6 w-6 transition-all", isLiked ? "fill-red-500 text-red-500" : "")} />
                                    <span className="font-bold text-lg">{likes.toLocaleString()}</span>
                                </Button>
                                <span className="text-sm text-muted-foreground">Likes</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <Button variant="ghost" size="icon" onClick={handleBookmark}>
                                    <Bookmark className={cn("h-6 w-6 transition-all", isBookmarked ? "fill-yellow-400 text-yellow-500" : "")} />
                                </Button>
                                <span className="text-sm text-muted-foreground">Bookmark</span>
                            </div>
                             <div className="flex flex-col items-center gap-1">
                                <Button variant="ghost" size="icon" onClick={handleShare}>
                                    <Share2 className="h-6 w-6" />
                                </Button>
                                <span className="text-sm text-muted-foreground">Share</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-8">
                        <div className="w-full sm:w-auto">
                            <Select defaultValue="1">
                                <SelectTrigger>
                                    <SelectValue placeholder="Episode" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Ep. 1: The Beginning</SelectItem>
                                    <SelectItem value="2">Ep. 2: The Middle</SelectItem>
                                    <SelectItem value="3">Ep. 3: The End</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                      <div className="flex flex-col sm:flex-row items-center gap-2">
                          <Select onValueChange={setSelectedVoice} value={selectedVoice}>
                              <SelectTrigger className="w-full sm:w-[140px]">
                                  <SelectValue placeholder="Select Voice" />
                              </SelectTrigger>
                              <SelectContent>
                                  {voiceDisplayNames.map(name => (
                                    <SelectItem key={name} value={name}>{name}</SelectItem>
                                  ))}
                              </SelectContent>
                          </Select>
                       <Button onClick={handleListen} disabled={isGeneratingAudio}>
                            {isGeneratingAudio ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Volume2 className="mr-2 h-4 w-4" />
                                    Listen to Story
                                </>
                            )}
                        </Button>
                      </div>
                    </div>

                     {audioDataUri && (
                        <div className="my-8">
                           <AudioPlayer src={audioDataUri} storageKey={`tts-progress-${story.id}`} />
                        </div>
                    )}

                    <div className="relative">
                        {showPaywall && (
                             <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm rounded-lg p-8 text-center">
                                <Lock className="h-12 w-12 text-primary mb-4" />
                                <h2 className="font-headline text-3xl font-bold mb-2">Enjoying the stories?</h2>
                                <p className="text-muted-foreground mb-6 max-w-sm">
                                    Sign up for a free account to continue reading, unlock audio for all stories, and bookmark your favorites.
                                </p>
                                <div className="flex gap-4">
                                    <Button size="lg" asChild>
                                        <Link href="/signup">Create Account</Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href="/login">Log In</Link>
                                    </Button>
                                </div>
                            </div>
                        )}
                        <div
                            id="story-content"
                            className={cn(
                                "prose prose-lg dark:prose-invert max-w-none font-body text-foreground/90 leading-relaxed space-y-6",
                                showPaywall && "blur-md select-none line-clamp-5"
                            )}
                            dangerouslySetInnerHTML={{ __html: story.content.replace(/\n/g, '<br />') }}
                        />
                    </div>
                </article>

                <div className="mt-16">
                    <RelatedStories currentStoryId={story.id} />
                </div>

                <div className="mt-16">
                    <CommentSection storyId={story.id} />
                </div>

                <div className="mt-16 text-center">
                    <Button variant="link" onClick={() => router.back()} className="inline-flex items-center gap-2 text-primary hover:underline">
                        <ArrowLeft className="h-4 w-4" />
                        Back to all stories
                    </Button>
                </div>
            </div>
        </>
    );
}
