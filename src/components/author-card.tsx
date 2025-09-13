
import Image from 'next/image';
import type { Author } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { UserPlus, MessageSquare } from 'lucide-react';

interface AuthorCardProps {
    author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
    return (
        <Card className="overflow-hidden">
            <div className="relative h-48 w-full bg-secondary">
                 <Image
                    src="https://picsum.photos/seed/author-banner/1200/300"
                    alt={`${author.name} banner`}
                    fill
                    className="object-cover"
                    data-ai-hint="abstract banner"
                 />
            </div>
            <CardHeader className="flex flex-col md:flex-row items-center gap-6 -mt-16 z-10 p-6">
                <Avatar className="h-32 w-32 border-4 border-background">
                    <AvatarImage src={author.avatarUrl} alt={author.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                    <CardTitle className="font-headline text-4xl">{author.name}</CardTitle>
                    <div className="flex gap-4 mt-4 justify-center md:justify-start">
                        <Button><UserPlus className="mr-2" />Follow</Button>
                        <Button variant="outline"><MessageSquare className="mr-2" />Message</Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground max-w-2xl mx-auto md:mx-0">{author.bio}</p>
            </CardContent>
        </Card>
    );
}
