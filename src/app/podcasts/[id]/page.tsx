
import { allPodcasts } from '@/lib/podcasts-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AudioPlayer from '@/components/audio-player';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface PodcastPageProps {
  params: {
    id: string;
  };
}

const RelatedPodcastCard = ({ podcast }: { podcast: typeof allPodcasts[0] }) => (
    <Link href={`/podcasts/${podcast.id}`} className="block group">
        <Card className="overflow-hidden h-full transition-all group-hover:shadow-md group-hover:border-primary/50">
            <div className="relative aspect-video">
                <Image src={podcast.imageUrl} alt={podcast.title} fill className="object-cover" data-ai-hint="podcast cover" />
            </div>
            <CardHeader>
                <CardTitle className="font-headline text-lg group-hover:text-primary">{podcast.title}</CardTitle>
                <CardDescription className="text-sm">{podcast.category}</CardDescription>
            </CardHeader>
        </Card>
    </Link>
);

export default function PodcastPage({ params }: PodcastPageProps) {
  const podcast = allPodcasts.find(p => p.id === params.id);

  if (!podcast) {
    notFound();
  }

  const relatedPodcasts = allPodcasts.filter(p => p.id !== podcast.id && !p.isLive).slice(0, 3);

  return (
    <div className="container py-16 md:py-24 max-w-4xl">
        <Card className="overflow-hidden">
            <div className="relative w-full aspect-video">
                <Image src={podcast.imageUrl} alt={podcast.title} fill className="object-cover" data-ai-hint="podcast cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-6">
                    <Badge>{podcast.category}</Badge>
                    <CardTitle className="font-headline text-3xl md:text-5xl text-white mt-2">{podcast.title}</CardTitle>
                    <CardDescription className="text-white/80 mt-2">By {podcast.author}</CardDescription>
                </div>
                 {podcast.isLive && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-md flex items-center gap-2 animate-pulse">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                        LIVE
                    </div>
                )}
            </div>
            <CardContent className="p-6">
                <p className="text-lg text-muted-foreground mb-8">{podcast.description}</p>
                <AudioPlayer src={podcast.audioSrc} isLive={podcast.isLive} storageKey={`podcast-progress-${podcast.id}`} />
            </CardContent>
        </Card>

         {!podcast.isLive && relatedPodcasts.length > 0 && (
            <div className="mt-16">
                <h2 className="font-headline text-3xl mb-8">Related Episodes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPodcasts.map(p => (
                        <RelatedPodcastCard key={p.id} podcast={p} />
                    ))}
                </div>
            </div>
        )}
    </div>
  );
}

export async function generateStaticParams() {
  return allPodcasts.map(podcast => ({
    id: podcast.id,
  }));
}
