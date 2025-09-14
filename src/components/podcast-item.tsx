
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Podcast } from '@/lib/types';

export default function PodcastItem({ podcast }: { podcast: Podcast }) {
    return (
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
}
