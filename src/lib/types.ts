

export type Episode = {
  id: string;
  title: string;
  content: string;
};

export type Season = {
  id: string;
  title: string;
  episodes: Episode[];
};

export type Story = {
  id: string;
  title: string;
  author: string;
  authorSlug: string;
  excerpt: string;
  seasons: Season[];
  category: string;
  tags: string[];
  imageUrl: string;
  imageHint: string;
  rating: number;
  views: number;
  likes: number;
};

export type Comment = {
  id:string;
  storyId: string;
  author: string;
  content: string;
  timestamp: string;
  avatarUrl: string;
};

export type Author = {
    name: string;
    urlSlug: string;
    avatarUrl: string;
    bio: string;
}

export type Reel = {
  id: string;
  authorSlug: string;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  likes: number;
  comments: { author: string; text: string }[];
  aspectRatio: 'portrait' | 'landscape';
};

export type Event = {
  id: string;
  title: string;
  date: {
    day: string;
    month: string;
    year: string;
  };
  location: string;
  venue: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  schedule: {
    time: string;
    topic: string;
    speaker?: string;
  }[];
};

export interface Notification {
    icon: 'star' | 'comment' | 'follower' | 'update';
    title: string;
    description: string;
    time: string;
    href: string;
}

export type FeedItem = {
    id: string;
    author: string;
    authorSlug: string;
    authorAvatar: string;
    time: string;
    content: string;
    imageUrl?: string;
    likes: number;
    commentsCount: number;
};

export type Podcast = {
  id: string;
  title: string;
  description: string;
  audioSrc: string;
  imageUrl: string;
  isLive: boolean;
  category: string;
  author: string;
};
