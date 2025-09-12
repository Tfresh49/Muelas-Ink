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

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Link href={`/stories/${story.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all group-hover:shadow-lg group-hover:border-accent">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={story.imageUrl}
              alt={story.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              data-ai-hint={story.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="font-headline text-2xl mb-2">{story.title}</CardTitle>
          <CardDescription>{story.excerpt}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-6 pt-0">
          <p className="text-sm text-muted-foreground">By {story.author}</p>
          <Badge variant="outline" className="border-accent text-accent">{story.category}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
