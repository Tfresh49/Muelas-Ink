

import { allAuthors, allStories, allReels } from '@/lib/data';
import { allEvents } from '@/lib/events-data';
import { notFound } from 'next/navigation';
import StoryCard from '@/components/story-card';
import AuthorCard from '@/components/author-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rss, Clapperboard, Mic, Calendar, MapPin, Ticket, PlayCircle, Heart, MessageSquare } from 'lucide-react';
import ReelCard from '@/components/reel-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { allFeedItems } from '@/lib/feeds-data';
import AudioPlayer from '@/components/audio-player';
import { allPodcasts } from '@/lib/podcasts-data';

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

const FeedItemCard = ({ item }: { item: typeof allFeedItems[0] }) => (
    <Link href={`/feeds/${item.id}`} className="block">
        <Card className="transition-all hover:shadow-md hover:border-primary/50">
            <CardHeader className="flex flex-row items-center gap-4">
                <Image src={item.authorAvatar} alt={item.author} width={40} height={40} className="rounded-full" data-ai-hint="person portrait" />
                <div>
                    <p className="font-semibold">{item.author}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
            </CardHeader>
            <CardContent>
                <p className="mb-4">{item.content}</p>
                {item.imageUrl && (
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image src={item.imageUrl} alt="Feed image" fill className="object-cover" data-ai-hint="landscape" />
                    </div>
                )}
                 <div className="flex gap-4 text-muted-foreground text-sm mt-4">
                    <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{item.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{item.commentsCount}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    </Link>
);

const PodcastItem = ({ podcast }: { podcast: typeof allPodcasts[0] }) => (
    <Link href={`/podcasts/${podcast.id}`} className="block">
    <Card className="overflow-hidden transition-all hover:shadow-md hover:border-primary/50">
        <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-1/3 aspect-square">
                <Image src={podcast.imageUrl} alt={podcast.title} fill className="object-cover" data-ai-hint="podcast cover" />
                 {podcast.isLive && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1.5 animate-pulse">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        LIVE
                    </div>
                )}
            </div>
            <div className="md:w-2/3 p-6 flex flex-col justify-between">
                <div>
                    <h3 className="font-headline text-xl mb-2">{podcast.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{podcast.description}</p>
                </div>
                 <Button variant="link" className="p-0 justify-start">View Episode</Button>
            </div>
        </div>
    </Card>
    </Link>
);

const EventItem = ({ event }: { event: typeof allEvents[0] }) => (
    <Link href={`/events/${event.id}`} className="block">
        <Card className="flex flex-col md:flex-row transition-all hover:shadow-md hover:border-primary/50">
            <div className="bg-secondary p-6 flex flex-col items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                <span className="font-headline text-4xl text-primary">{event.date.day}</span>
                <span className="font-semibold">{event.date.month}</span>
            </div>
            <div className="p-6 flex-grow">
                <h3 className="font-headline text-2xl mb-2">{event.title}</h3>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                </div>
                <p className="text-muted-foreground mb-4">{event.description}</p>
                <Button>
                    <Ticket className="mr-2 h-4 w-4" />
                    View Details
                </Button>
            </div>
        </Card>
    </Link>
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
