
import { allEvents } from '@/lib/events-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Ticket, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface EventPageProps {
  params: {
    id: string;
  };
}

export default function EventPage({ params }: EventPageProps) {
  const event = allEvents.find(e => e.id === params.id);

  if (!event) {
    notFound();
  }

  return (
    <div>
      <section className="relative h-64 md:h-80 w-full">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
          priority
          data-ai-hint="event banner abstract"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </section>

      <div className="container -mt-24 md:-mt-32 relative z-10 pb-24">
        <Card>
          <CardHeader className="text-center">
            <p className="text-primary font-semibold tracking-wider">{event.date.month} {event.date.day}, {event.date.year}</p>
            <CardTitle className="font-headline text-4xl md:text-5xl">{event.title}</CardTitle>
            <div className="flex items-center justify-center gap-4 text-muted-foreground pt-2">
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.schedule[0].time}</span>
                </div>
            </div>
          </CardHeader>
          <CardContent className="max-w-3xl mx-auto">
             <div className="my-8">
                <Button size="lg" className="w-full">
                    <Ticket className="mr-2" />
                    Get Your Tickets
                </Button>
            </div>
            
            <p className="text-lg text-center text-foreground/90 mb-12">{event.longDescription}</p>

            <Separator />
            
            <div className="my-12">
                <h2 className="font-headline text-3xl mb-6 text-center">Event Schedule</h2>
                <div className="relative pl-6">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
                    {event.schedule.map((item, index) => (
                        <div key={index} className="relative mb-8 flex items-start gap-6">
                            <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-primary -translate-x-1/2" />
                            <div className="w-24 md:w-32 flex-shrink-0">
                                <p className="font-bold text-primary">{item.time}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{item.topic}</h3>
                                {item.speaker && (
                                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                        <User className="h-4 w-4" />
                                        {item.speaker}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return allEvents.map(event => ({
    id: event.id,
  }));
}
