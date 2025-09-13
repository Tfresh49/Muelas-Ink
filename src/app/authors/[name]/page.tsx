
import { allAuthors, allStories, allReels } from '@/lib/data';
import { notFound } from 'next/navigation';
import StoryCard from '@/components/story-card';
import AuthorCard from '@/components/author-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rss, Clapperboard, Mic, Calendar, MapPin, Ticket, PlayCircle } from 'lucide-react';
import ReelCard from '@/components/reel-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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

const FeedItem = ({ author, content, imageUrl, time }: { author: string, content: string, imageUrl?: string, time: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center gap-4">
            <Image src={allAuthors.find(a => a.name === author)?.avatarUrl || ''} alt={author} width={40} height={40} className="rounded-full" data-ai-hint="person portrait" />
            <div>
                <p className="font-semibold">{author}</p>
                <p className="text-xs text-muted-foreground">{time}</p>
            </div>
        </CardHeader>
        <CardContent>
            <p className="mb-4">{content}</p>
            {imageUrl && (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image src={imageUrl} alt="Feed image" fill className="object-cover" data-ai-hint="landscape" />
                </div>
            )}
        </CardContent>
    </Card>
);

const PodcastItem = ({ title, description, audioSrc, imageUrl }: { title: string, description: string, audioSrc: string, imageUrl: string }) => (
    <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-1/3 aspect-square">
                <Image src={imageUrl} alt={title} fill className="object-cover" data-ai-hint="podcast cover" />
            </div>
            <div className="md:w-2/3 p-6 flex flex-col justify-between">
                <div>
                    <h3 className="font-headline text-2xl mb-2">{title}</h3>
                    <p className="text-muted-foreground mb-4">{description}</p>
                </div>
                <audio controls className="w-full">
                    <source src={audioSrc} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
    </Card>
);

const EventItem = ({ date, title, location, description }: { date: { day: string, month: string }, title: string, location: string, description:string }) => (
    <Card className="flex flex-col md:flex-row">
        <div className="bg-secondary p-6 flex flex-col items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-t-none">
            <span className="font-headline text-4xl text-primary">{date.day}</span>
            <span className="font-semibold">{date.month}</span>
        </div>
        <div className="p-6 flex-grow">
            <h3 className="font-headline text-2xl mb-2">{title}</h3>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
            </div>
            <p className="text-muted-foreground mb-4">{description}</p>
            <Button>
                <Ticket className="mr-2 h-4 w-4" />
                Get Tickets
            </Button>
        </div>
    </Card>
);


export default function AuthorPage({ params }: AuthorPageProps) {
  const author = allAuthors.find(a => a.urlSlug === params.name);

  if (!author) {
    notFound();
  }

  const authorStories = allStories.filter(s => s.authorSlug === author.urlSlug);
  const authorReels = allReels.filter(r => r.authorSlug === author.urlSlug);

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
                   <FeedItem author={author.name} time="2 hours ago" content="Just finished the final chapter of my next book! It's been a long journey, but I can't wait for you all to read it. #amwriting #newbook" />
                   <FeedItem author={author.name} time="1 day ago" content="Finding inspiration in the most unexpected places. This misty morning view is definitely going into a story." imageUrl="https://picsum.photos/seed/feed1/800/450" />
                   <FeedItem author={author.name} time="3 days ago" content="Thank you all for the amazing feedback on 'Emberwing'! It means the world to me that the story is resonating with so many of you." />
                </TabsContent>
                <TabsContent value="podcasts" className="mt-8 max-w-3xl mx-auto space-y-8">
                    <PodcastItem 
                        title="Episode 5: World-Building Workshop"
                        description="Join me as I discuss my process for creating immersive fantasy worlds, from drawing maps to developing cultures and magic systems."
                        audioSrc="http://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/soundtrack.mp3"
                        imageUrl="https://picsum.photos/seed/podcast1/600/600"
                    />
                    <PodcastItem 
                        title="Episode 4: The Art of the Anti-Hero"
                        description="A deep dive into creating complex, morally grey characters that readers can't help but root for. Featuring a special guest!"
                        audioSrc="http://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/sonorous.mp3"
                        imageUrl="https://picsum.photos/seed/podcast2/600/600"
                    />
                </TabsContent>
                <TabsContent value="events" className="mt-8 max-w-3xl mx-auto space-y-8">
                    <EventItem
                        date={{ day: '15', month: 'AUG' }}
                        title="Book Signing & Q&A for 'Emberwing'"
                        location="The Grand Library, Neo-Veridia"
                        description="Join me for a live reading, Q&A session, and book signing for the release of my latest novel, Emberwing."
                    />
                     <EventItem
                        date={{ day: '22', month: 'SEP' }}
                        title="Fantasy Writers Convention - Keynote"
                        location="Online Virtual Event"
                        description="I'll be giving the keynote speech on 'The Power of Myth in Modern Storytelling' at this year's convention."
                    />
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
