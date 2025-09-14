
import { allEvents } from '@/lib/events-data';
import EventItem from '@/components/event-item';
import { Calendar } from 'lucide-react';

export default function AllEventsPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <Calendar className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">Upcoming Events</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Join us for live readings, Q&A sessions, and more.
        </p>
      </div>

      {allEvents.length > 0 ? (
        <div className="max-w-3xl mx-auto space-y-8">
            {allEvents.map(event => (
                <EventItem key={event.id} event={event} />
            ))}
        </div>
      ) : (
         <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">No Upcoming Events</h2>
            <p className="text-muted-foreground">Please check back later for new event announcements.</p>
        </div>
      )}
    </div>
  );
}
