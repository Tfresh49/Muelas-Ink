
import type { FeedItem } from './types';

export const allFeedItems: FeedItem[] = [
    {
        id: 'feed-1',
        author: 'Elara Vance',
        authorSlug: 'elara-vance',
        authorAvatar: 'https://picsum.photos/seed/301/200/200',
        time: "2 hours ago",
        content: "Just finished the final chapter of my next book! It's been a long journey, but I can't wait for you all to read it. #amwriting #newbook",
        likes: 152,
        commentsCount: 12,
    },
    {
        id: 'feed-2',
        author: 'Elara Vance',
        authorSlug: 'elara-vance',
        authorAvatar: 'https://picsum.photos/seed/301/200/200',
        time: "1 day ago",
        content: "Finding inspiration in the most unexpected places. This misty morning view is definitely going into a story.",
        imageUrl: "https://picsum.photos/seed/feed1/800/450",
        likes: 483,
        commentsCount: 27,
    },
    {
        id: 'feed-3',
        author: 'Elara Vance',
        authorSlug: 'elara-vance',
        authorAvatar: 'https://picsum.photos/seed/301/200/200',
        time: "3 days ago",
        content: "Thank you all for the amazing feedback on 'Emberwing'! It means the world to me that the story is resonating with so many of you.",
        likes: 1200,
        commentsCount: 88,
    }
]
