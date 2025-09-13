
"use client";

import { allFeedItems, allComments } from '@/lib/data';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Send } from 'lucide-react';
import CommentSection from '@/components/comment-section';
import Link from 'next/link';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { FeedItem } from '@/lib/types';

interface FeedViewProps {
  item: FeedItem;
}

export default function FeedView({ item }: FeedViewProps) {
  const { toast } = useToast();

  const [likes, setLikes] = useState(item?.likes ?? 0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
      setLikes(isLiked ? likes - 1 : likes + 1);
      setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    const shareData = {
        title: "Check out this post",
        text: `"${item.content}" by ${item.author}`,
        url: window.location.href,
    };
    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(window.location.href);
            toast({
                title: "Link Copied!",
                description: "The post URL has been copied to your clipboard.",
            });
        }
    } catch (error) {
        console.error("Share failed:", error);
        await navigator.clipboard.writeText(window.location.href);
        toast({
            title: "Link Copied!",
            description: "The post URL has been copied to your clipboard.",
        });
    }
  };


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
                 <div className="flex gap-2 text-muted-foreground text-sm items-center border-t border-b py-2">
                    <Button variant="ghost" className="flex items-center gap-2" onClick={handleLike}>
                        <Heart className={cn("h-5 w-5", isLiked && "fill-red-500 text-red-500")} />
                        <span>{likes.toLocaleString()} Likes</span>
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        <span>{item.commentsCount} Comments</span>
                    </Button>
                     <Button variant="ghost" className="flex items-center gap-2 ml-auto" onClick={handleShare}>
                        <Send className="h-5 w-5" />
                        <span>Share</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
        
        <div className="mt-16">
            {/* The storyId prop is reused here for demonstration purposes to link comments to this feed item. */}
            <CommentSection storyId={item.id} />
        </div>

    </div>
  );
}
