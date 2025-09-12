import Image from 'next/image';
import Link from 'next/link';
import type { Story } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Eye, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StoryCardProps {
  story: Story;
}

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />);
    } else {
      stars.push(<Star key={i} className="w-4 h-4 text-gray-400" />);
    }
  }
  return <div className="flex items-center">{stars}</div>;
};

export default function StoryCard({ story }: StoryCardProps) {
  const [currentImage, setCurrentImage] = useState(story.imageUrl);
  
  // This is a mock for multiple images. In a real scenario, story would have an array of images.
  const images = [
      story.imageUrl,
      `https://picsum.photos/seed/${story.id.length + 10}/600/400`,
      `https://picsum.photos/seed/${story.id.length + 20}/600/400`,
  ];

  useEffect(() => {
    let imageIndex = 0;
    const interval = setInterval(() => {
        imageIndex = (imageIndex + 1) % images.length;
        setCurrentImage(images[imageIndex]);
    }, 2000 + Math.random() * 6000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <Link href={`/stories/${story.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all group-hover:shadow-lg group-hover:border-primary flex flex-col">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={currentImage}
              alt={story.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              data-ai-hint={story.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="font-headline text-2xl mb-2">{story.title}</CardTitle>
          <CardDescription>{story.excerpt}</CardDescription>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4 p-6 pt-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <StarRating rating={story.rating} />
            <span>({story.rating.toFixed(1)})</span>
          </div>
          <div className="w-full flex justify-between items-center text-sm text-muted-foreground">
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{story.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{story.likes.toLocaleString()}</span>
                </div>
             </div>
            <Badge variant="outline" className="border-primary text-primary">{story.category}</Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
