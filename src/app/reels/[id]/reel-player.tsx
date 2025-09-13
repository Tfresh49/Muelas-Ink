
"use client";

import { useState, useRef, useEffect, FormEvent } from 'react';
import type { Reel } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Heart, MessageCircle, Play, Pause, X, ChevronUp, ChevronDown, Maximize } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { allReels } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
  const [comments, setComments] = useState(reel.comments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animationClass, setAnimationClass] = useState('animate-in fade-in');
  const [isLandscapeFullscreen, setIsLandscapeFullscreen] = useState(false);


  const lastClickTime = useRef(0);

  const currentIndex = allReels.findIndex(r => r.id === reel.id);
  const prevReel = currentIndex > 0 ? allReels[currentIndex - 1] : null;
  const nextReel = currentIndex < allReels.length - 1 ? allReels[currentIndex + 1] : null;

  useEffect(() => {
    if (videoRef.current) {
        isPlaying ? videoRef.current.play() : videoRef.current.pause();
    }
  }, [isPlaying]);
  
  useEffect(() => {
    // Reset animation on new reel
    setAnimationClass('animate-in fade-in');
    setIsLandscapeFullscreen(false);
  }, [reel.id]);

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
  
  const handleSubmitComment = (e: FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const comment = {
        author: 'Reader',
        text: newComment,
      };
      setComments([comment, ...comments]);
      setNewComment('');
      setIsSubmitting(false);
    }, 500);
  };
  
  const navigateToReel = (targetReel: Reel | null, direction: 'up' | 'down') => {
    if (!targetReel) return;
    setAnimationClass(direction === 'down' ? 'animate-out slide-out-to-top' : 'animate-out slide-out-to-bottom');
    setTimeout(() => {
      router.push(`/reels/${targetReel.id}`);
    }, 300);
  };

  const isLandscape = reel.aspectRatio === 'landscape';

  return (
    <div className={cn(
        "relative w-screen h-screen flex items-center justify-center overflow-hidden",
        isLandscape && isLandscapeFullscreen ? "bg-black" : ""
    )}>
      <button onClick={() => router.back()} className="absolute top-4 left-4 z-30 text-white bg-black/50 rounded-full p-2">
        <X className="h-6 w-6" />
      </button>

      {!isLandscapeFullscreen && prevReel && (
         <Button variant="ghost" size="icon" className="absolute top-1/2 -translate-y-1/2 left-2 z-30 text-white bg-black/30 hover:bg-black/50" onClick={() => navigateToReel(prevReel, 'up')}>
          <ChevronUp className="h-8 w-8" />
        </Button>
      )}
      {!isLandscapeFullscreen && nextReel && (
        <Button variant="ghost" size="icon" className="absolute top-1/2 -translate-y-1/2 right-2 z-30 text-white bg-black/30 hover:bg-black/50" onClick={() => navigateToReel(nextReel, 'down')}>
          <ChevronDown className="h-8 w-8" />
        </Button>
      )}


      <div className={cn(
        "relative bg-black rounded-lg overflow-hidden transition-all duration-300 ease-in-out",
        isLandscape 
            ? (isLandscapeFullscreen ? 'w-full h-full' : 'w-full max-w-4xl aspect-video')
            : 'w-full h-full md:w-auto md:h-full md:aspect-[9/16]',
        showComments ? (isLandscapeFullscreen ? 'scale-100' : '-translate-y-1/4 scale-90') : 'translate-y-0 scale-100',
        animationClass
      )}>
        <video
          ref={videoRef}
          src={reel.videoUrl}
          loop
          onClick={handleVideoClick}
          className="w-full h-full object-contain"
        />

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
            <Play className="h-20 w-20 text-white/70" />
          </div>
        )}

        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart className="h-24 w-24 text-white animate-ping" />
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
          <p className="font-semibold">{reel.caption}</p>
        </div>

        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-20">
            <button onClick={handleLike} className="flex flex-col items-center gap-1 text-white">
                <Heart className={cn("w-8 h-8 transition-all", isLiked ? "fill-red-500 text-red-500" : "")} />
                <span className="font-bold text-sm">{likes.toLocaleString()}</span>
            </button>
            <button onClick={() => setShowComments(!showComments)} className="flex flex-col items-center gap-1 text-white">
                <MessageCircle className="w-8 h-8" />
                <span className="font-bold text-sm">{comments.length}</span>
            </button>
             {isLandscape && (
                <button onClick={() => setIsLandscapeFullscreen(!isLandscapeFullscreen)} className="flex flex-col items-center gap-1 text-white">
                    <Maximize className="w-8 h-8" />
                </button>
            )}
        </div>
      </div>
      
      {/* Comments Section */}
      <div className={cn(
          "absolute bottom-0 left-0 right-0 h-1/2 bg-background p-4 transform transition-transform duration-500 ease-in-out z-20 rounded-t-2xl flex flex-col",
          showComments ? 'translate-y-0' : 'translate-y-full',
          isLandscapeFullscreen ? 'max-w-sm right-0 left-auto' : 'max-w-sm mx-auto'
      )}>
        <div className="w-full flex-grow flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <h3 className="font-headline text-xl">Comments ({comments.length})</h3>
                <button onClick={() => setShowComments(false)}><X /></button>
            </div>
             <div className="space-y-4 overflow-y-auto flex-grow mb-4">
                {comments.map((comment, i) => (
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
                {comments.length === 0 && <p className="text-muted-foreground text-center py-8">No comments yet.</p>}
            </div>
            <form onSubmit={handleSubmitComment} className="mt-auto flex-shrink-0">
              <div className="flex items-center gap-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={1}
                  className="resize-none"
                />
                <Button type="submit" disabled={isSubmitting || newComment.trim() === ''}>
                  {isSubmitting ? 'Posting...' : 'Post'}
                </Button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
}
