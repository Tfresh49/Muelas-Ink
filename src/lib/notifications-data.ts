
export interface Notification {
    icon: 'star' | 'comment' | 'follower' | 'update';
    title: string;
    description: string;
    time: string;
}

export const allNotifications: Notification[] = [
    {
        icon: 'star',
        title: "New Rating",
        description: "'The Whispering Woods' received a 5-star rating from Bookworm_88.",
        time: "5m ago",
    },
    {
        icon: 'comment',
        title: "New Comment",
        description: "FantasyFanatic commented on 'Emberwing'.",
        time: "1h ago",
    },
    {
        icon: 'follower',
        title: "New Follower",
        description: "Cyberpunk_Sam started following you.",
        time: "3h ago",
    },
    {
        icon: 'update',
        title: "Story Update",
        description: "A new chapter of 'Chronos' Echo' has been released.",
        time: "1d ago",
    },
    {
        icon: 'star',
        title: "New Rating",
        description: "'Void Drifter' received a 4-star rating.",
        time: "2d ago",
    },
    {
        icon: 'comment',
        title: "New Comment",
        description: "SciFiLover replied to your comment on 'Chronos' Echo'.",
        time: "2d ago",
    }
];
