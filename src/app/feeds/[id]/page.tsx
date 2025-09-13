
import { allFeedItems } from '@/lib/feeds-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Send } from 'lucide-react';
import CommentSection from '@/components/comment-section';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';

interface FeedPageProps {
  params: {
    id: string;
  };
}

export default function FeedPage({ params }: FeedPageProps) {
  const item = allFeedItems.find(i => i.id === params.id);

  if (!item) {
    notFound();
  }

  return (
    <div className="container py-16 md:py-24 max-w-2xl">
        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <Link href={`/authors/${item.authorSlug}`}>
                    <Image src={item.authorAvatar} alt={item.author} width={56} height={56} className="rounded-full" data-ai-hint="person portrait" />
                </Link>
                <div>
                    <Link href={`/authors/${item.authorSlug}`} className="font-semibold hover:underline">{item.author}</Link>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-lg mb-4">{item.content}</p>
                {item.imageUrl && (
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                        <Image src={item.imageUrl} alt="Feed image" fill className="object-cover" data-ai-hint="landscape" />
                    </div>
                )}
                 <div className="flex gap-4 text-muted-foreground text-sm items-center border-t border-b py-2">
                    <Button variant="ghost" className="flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        <span>{item.likes} Likes</span>
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        <span>{item.commentsCount} Comments</span>
                    </Button>
                     <Button variant="ghost" className="flex items-center gap-2 ml-auto">
                        <Send className="h-5 w-5" />
                        <span>Share</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
        
        <div className="mt-8">
            <h3 className="font-headline text-2xl mb-4">Comments</h3>
             <div className="flex items-start gap-2 mb-6">
                <Textarea placeholder="Write a comment..." rows={1} className="flex-grow"/>
                <Button>Post</Button>
            </div>
             {/* This is a placeholder for a real comment section */}
            <div className="space-y-4">
                <p className="text-muted-foreground text-center">Comments will be shown here.</p>
            </div>
        </div>

    </div>
  );
}

export async function generateStaticParams() {
  return allFeedItems.map(item => ({
    id: item.id,
  }));
}
