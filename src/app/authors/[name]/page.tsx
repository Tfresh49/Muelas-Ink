
import { allAuthors, allStories } from '@/lib/data';
import { notFound } from 'next/navigation';
import StoryCard from '@/components/story-card';
import AuthorCard from '@/components/author-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rss, Clapperboard, Mic, Calendar } from 'lucide-react';

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

  return (
    <div className="container py-16 md:py-24">
        <AuthorCard author={author} />
        
        <div className="mt-16">
            <Tabs defaultValue="stories" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="stories">Stories ({authorStories.length})</TabsTrigger>
                    <TabsTrigger value="feed"><Rss className="mr-2" /> Feed</TabsTrigger>
                    <TabsTrigger value="reels"><Clapperboard className="mr-2" /> Reels</TabsTrigger>
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
                <TabsContent value="feed">
                    <PlaceholderContent title="Author Feed" icon={Rss} />
                </TabsContent>
                <TabsContent value="reels">
                     <PlaceholderContent title="Author Reels" icon={Clapperboard} />
                </TabsContent>
                <TabsContent value="podcasts">
                    <PlaceholderContent title="Author Podcasts" icon={Mic} />
                </TabsContent>
                <TabsContent value="events">
                     <PlaceholderContent title="Author Events" icon={Calendar} />
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
