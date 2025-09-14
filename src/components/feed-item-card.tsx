
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heart, MessageSquare } from 'lucide-react';
import type { FeedItem } from '@/lib/types';

export default function FeedItemCard({ item }: { item: FeedItem }) {
    return (
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
}
