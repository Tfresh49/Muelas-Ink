

import { allAuthors, allStories, allReels } from '@/lib/data';
import { allEvents } from '@/lib/events-data';
import { notFound } from 'next/navigation';
import StoryCard from '@/components/story-card';
import AuthorCard from '@/components/author-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rss, Clapperboard, Mic, Calendar } from 'lucide-react';
import ReelCard from '@/components/reel-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { allFeedItems } from '@/lib/feeds-data';
import { allPodcasts } from '@/lib/podcasts-data';
import EventItem from '@/components/event-item';
import FeedItemCard from '@/components/feed-item-card';
import PodcastItem from '@/components/podcast-item';

interface AuthorPageProps {
  params: {
    name: string;
  };
}

const PlaceholderContent = ({ title, icon: Icon }: { title: string, icon: React.ElementType }) => (
    <div className="text-center py-16 text-muted-foreground">
        <Icon className="h-12 w-12 mx-auto mb-4" />
        <h2 className="text-2xl font-headline">{title} Coming Soon</h2>
        <p>Check back later for updates from the author!</p>
    </div>
);

export default function AuthorPage({ params }: AuthorPageProps) {
  const author = allAuthors.find(a => a.urlSlug === params.name);

  if (!author) {
    notFound();
  }

  const authorStories = allStories.filter(s => s.authorSlug === author.urlSlug);
  const authorReels = allReels.filter(r => r.authorSlug === author.urlSlug);
  const authorEvents = allEvents;
  const authorFeed = allFeedItems.filter(f => f.authorSlug === author.urlSlug);
  const authorPodcasts = allPodcasts.filter(p => p.author === author.name);

  return (
    <div className="container py-16 md:py-24">
        <AuthorCard author={author} />
        
        <div className="mt-16">
            <Tabs defaultValue="stories" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="stories">Stories ({authorStories.length})</TabsTrigger>
                    <TabsTrigger value="reels">Reels ({authorReels.length})</TabsTrigger>
                    <TabsTrigger value="feed"><Rss className="mr-2" /> Feed</TabsTrigger>
                    <TabsTrigger value="podcasts"><Mic className="mr-2" /> Podcasts</TabsTrigger>
                    <TabsTrigger value="events"><Calendar className="mr-2" /> Events</TabsTrigger>
                </TabsList>
                <TabsContent value="stories" className="mt-8">
                     {authorStories.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {authorStories.map(story => (
                            <StoryCard key={story.id} story={story} />
                        ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 text-muted-foreground">
                            <p className="text-xl">This author hasn't published any stories yet.</p>
                        </div>
                    )}
                </TabsContent>
                 <TabsContent value="reels" className="mt-8">
                    {authorReels.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {authorReels.map(reel => (
                                <ReelCard key={reel.id} reel={reel} />
                            ))}
                        </div>
                    ) : (
                        <PlaceholderContent title="No Reels Yet" icon={Clapperboard} />
                    )}
                </TabsContent>
                <TabsContent value="feed" className="mt-8 max-w-2xl mx-auto space-y-8">
                   {authorFeed.map(item => (
                       <FeedItemCard key={item.id} item={item} />
                   ))}
                </TabsContent>
                <TabsContent value="podcasts" className="mt-8 max-w-3xl mx-auto space-y-8">
                    {authorPodcasts.map(podcast => (
                        <PodcastItem key={podcast.id} podcast={podcast} />
                    ))}
                </TabsContent>
                <TabsContent value="events" className="mt-8 max-w-3xl mx-auto space-y-8">
                    {authorEvents.map(event => (
                        <EventItem key={event.id} event={event} />
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}

export async function generateStaticParams() {
  return allAuthors.map(author => ({
    name: author.urlSlug,
  }));
}
