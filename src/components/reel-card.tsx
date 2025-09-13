
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Reel } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

interface ReelCardProps {
  reel: Reel;
}

export default function ReelCard({ reel }: ReelCardProps) {
  return (
    <Link href={`/reels/${reel.id}`} className="group block">
      <Card className="overflow-hidden aspect-[9/16] relative">
        <Image
          src={reel.thumbnailUrl}
          alt={reel.caption}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-105"
          data-ai-hint="video thumbnail"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <PlayCircle className="h-16 w-16 text-white/80" />
        </div>
        <div className="absolute bottom-0 left-0 p-4">
          <p className="text-white font-semibold text-sm line-clamp-2">{reel.caption}</p>
        </div>
      </Card>
    </Link>
  );
}
