
import type { Podcast } from './types';

export const allPodcasts: Podcast[] = [
  {
    id: 'ep-5-world-building',
    title: "Episode 5: World-Building Workshop",
    description: "Join me as I discuss my process for creating immersive fantasy worlds, from drawing maps to developing cultures and magic systems.",
    audioSrc: "http://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/soundtrack.mp3",
    imageUrl: "https://picsum.photos/seed/podcast1/600/600",
    isLive: false,
    category: 'Writing Craft',
    author: 'Elara Vance',
  },
  {
    id: 'ep-4-art-of-the-anti-hero',
    title: "Episode 4: The Art of the Anti-Hero (LIVE)",
    description: "A deep dive into creating complex, morally grey characters that readers can't help but root for. Featuring a special guest!",
    audioSrc: "http://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/sonorous.mp3",
    imageUrl: "https://picsum.photos/seed/podcast2/600/600",
    isLive: true,
    category: 'Character Study',
    author: 'Elara Vance',
  },
    {
    id: 'ep-3-sci-fi-tropes',
    title: "Episode 3: Deconstructing Sci-Fi Tropes",
    description: "Exploring classic sci-fi tropes and how to subvert them to create fresh and unpredictable stories for a modern audience.",
    audioSrc: "http://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/thrust.mp3",
    imageUrl: "https://picsum.photos/seed/podcast3/600/600",
    isLive: false,
    category: 'Genre Analysis',
    author: 'Elara Vance',
    },
];
