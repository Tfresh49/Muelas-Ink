
import type { Event } from './types';

export const allEvents: Event[] = [
  {
    id: 'book-signing-emberwing',
    title: "Book Signing & Q&A for 'Emberwing'",
    date: { day: '15', month: 'AUG', year: '2024' },
    location: 'The Grand Library, Neo-Veridia',
    venue: 'Main Reading Hall',
    description: "Join me for a live reading, Q&A session, and book signing for the release of my latest novel, Emberwing.",
    longDescription: "Celebrate the launch of 'Emberwing' in the magnificent Main Reading Hall of The Grand Library. I'll be sharing a few of my favorite passages, answering your questions about the world of Drakoria, and signing copies of the new book. Exclusive merchandise will be available.",
    imageUrl: 'https://picsum.photos/seed/event1/1200/400',
    schedule: [
      { time: '6:00 PM', topic: 'Doors Open & Welcome' },
      { time: '6:30 PM', topic: 'Live Reading from Emberwing', speaker: 'Elara Vance' },
      { time: '7:00 PM', topic: 'Author Q&A Session', speaker: 'Elara Vance' },
      { time: '7:45 PM', topic: 'Book Signing Begins' },
      { time: '9:00 PM', topic: 'Event Concludes' },
    ],
  },
  {
    id: 'fantasy-writers-con-2024',
    title: 'Fantasy Writers Convention - Keynote',
    date: { day: '22', month: 'SEP', year: '2024' },
    location: 'Online Virtual Event',
    venue: 'Main Stage stream',
    description: "I'll be giving the keynote speech on 'The Power of Myth in Modern Storytelling' at this year's convention.",
    longDescription: "I'm honored to be delivering the keynote address at this year's Fantasy Writers Convention. My talk, 'The Power of Myth in Modern Storytelling,' will explore how ancient legends and archetypes can be reimagined to create powerful, resonant narratives for today's readers. The event is fully virtual, so you can tune in from anywhere in the world.",
    imageUrl: 'https://picsum.photos/seed/event2/1200/400',
    schedule: [
      { time: '10:00 AM PST', topic: 'Keynote: The Power of Myth in Modern Storytelling', speaker: 'Elara Vance' },
      { time: '11:00 AM PST', topic: 'Panel: World-Building in Epic Fantasy' },
      { time: '12:00 PM PST', topic: 'Virtual Networking Lunch' },
      { time: '1:30 PM PST', topic: 'Workshop: Crafting Compelling Characters' },
    ],
  },
];
