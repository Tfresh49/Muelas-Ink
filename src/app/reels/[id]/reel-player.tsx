
"use client";

import { useState, useRef, useEffect } from 'react';
import type { Reel } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Heart, MessageCircle, Play, Pause, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ReelPlayerProps {
  reel: Reel;
}

export default function ReelPlayer({ reel }: ReelPlayerProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(reel.likes);

  const lastClickTime = useRef(0);

  useEffect(() => {
    if (videoRef.current) {
        isPlaying ? videoRef.current.play() : videoRef.current.pause();
    }
  }, [isPlaying]);

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikes(l => l + 1);
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    } else {
        setIsLiked(false);
        setLikes(l => l - 1);
    }
  };

  const handleVideoClick = () => {
    const now = new Date().getTime();
    if (now - lastClickTime.current < 300) { // Double click
      handleLike();
    } else { // Single click
      setIsPlaying(!isPlaying);
    }
    lastClickTime.current = now;
  };
  

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <button onClick={() => router.back()} className="absolute top-4 left-4 z-30 text-white bg-black/50 rounded-full p-2">
        <X className="h-6 w-6" />
      </button>

      <div className={cn(
        "relative bg-black rounded-lg overflow-hidden transition-all duration-300",
        reel.aspectRatio === 'portrait' ? 'w-full max-w-sm aspect-[9/16]' : 'w-full max-w-4xl aspect-video',
        showComments && reel.aspectRatio === 'portrait' ? '-translate-y-1/4' : '',
        showComments && reel.aspectRatio === 'landscape' ? '-translate-y-1/4' : ''
      )}>
        <video
          ref={videoRef}
          src={reel.videoUrl}
          loop
          onClick={handleVideoClick}
          className="w-full h-full object-cover"
        />

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Play className="h-20 w-20 text-white/70" />
          </div>
        )}

        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart className="h-24 w-24 text-white animate-ping" />
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/50 to-transparent">
          <p className="font-semibold">{reel.caption}</p>
        </div>

        <div className="absolute right-4 bottom-1/4 flex flex-col items-center gap-6 z-20">
            <button onClick={handleLike} className="flex flex-col items-center gap-1 text-white">
                <Heart className={cn("w-8 h-8 transition-all", isLiked ? "fill-red-500 text-red-500" : "")} />
                <span className="font-bold text-sm">{likes.toLocaleString()}</span>
            </button>
            <button onClick={() => setShowComments(!showComments)} className="flex flex-col items-center gap-1 text-white">
                <MessageCircle className="w-8 h-8" />
                <span className="font-bold text-sm">{reel.comments.length}</span>
            </button>
        </div>
      </div>
      
      {/* Comments Section */}
      <div className={cn(
          "absolute bottom-0 left-0 right-0 h-1/2 bg-background p-4 transform transition-transform duration-300 ease-in-out z-20 overflow-y-auto",
          showComments ? 'translate-y-0' : 'translate-y-full'
      )}>
        <div className="max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-headline text-xl">Comments ({reel.comments.length})</h3>
                <button onClick={() => setShowComments(false)}><X /></button>
            </div>
            <div className="space-y-4">
                {reel.comments.map((comment, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm">{comment.author}</p>
                          <p>{comment.text}</p>
                        </div>
                    </div>
                ))}
                {reel.comments.length === 0 && <p className="text-muted-foreground text-center">No comments yet.</p>}
            </div>
        </div>
      </div>
    </div>
  );
}
