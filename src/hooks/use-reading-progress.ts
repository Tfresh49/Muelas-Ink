"use client";

import { useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast"
import { Button } from '@/components/ui/button';

const SAVE_INTERVAL = 2000; // Save progress every 2 seconds

export function useReadingProgress(storyId: string) {
  const { toast } = useToast();

  const handleScroll = useCallback(() => {
    localStorage.setItem(`progress-${storyId}`, window.scrollY.toString());
  }, [storyId]);

  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress-${storyId}`);
    if (savedProgress && parseInt(savedProgress) > 0) {
      const scrollPosition = parseInt(savedProgress);
      toast({
        title: "Welcome back!",
        description: "You have previous reading progress.",
        action: (
            <Button variant="secondary" size="sm" onClick={() => {
                window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
            }}>
                Continue Reading
            </Button>
        ),
      })
    }
  }, [storyId, toast]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const scrollListener = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, SAVE_INTERVAL);
    };

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);
}
