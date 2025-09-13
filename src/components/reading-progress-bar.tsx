
"use client";

import { useReadingProgressBar } from '@/hooks/use-reading-progress-bar';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function ReadingProgressBar() {
  const progress = useReadingProgressBar();

  return (
    <Progress
      value={progress}
      className={cn(
        "fixed top-0 left-0 right-0 h-1 z-50 w-full rounded-none",
        "bg-transparent", // Make background transparent
        "[&>div]:bg-primary" // Style the indicator
      )}
    />
  );
}
