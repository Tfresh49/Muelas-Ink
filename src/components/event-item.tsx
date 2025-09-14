
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Ticket } from 'lucide-react';
import type { Event } from '@/lib/types';

export default function EventItem({ event }: { event: Event }) {
    return (
        <Link href={`/events/${event.id}`} className="block">
            <Card className="flex flex-col md:flex-row transition-all hover:shadow-md hover:border-primary/50">
                <div className="bg-secondary p-6 flex flex-col items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                    <span className="font-headline text-4xl text-primary">{event.date.day}</span>
                    <span className="font-semibold">{event.date.month}</span>
                </div>
                <div className="p-6 flex-grow">
                    <h3 className="font-headline text-2xl mb-2">{event.title}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                    </div>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <Button>
                        <Ticket className="mr-2 h-4 w-4" />
                        View Details
                    </Button>
                </div>
            </Card>
        </Link>
    );
}
