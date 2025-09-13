
export type Story = {
  id: string;
  title: string;
  author: string;
  authorSlug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl: string;
  imageHint: string;
  rating: number;
  views: number;
  likes: number;
};

export type Comment = {
  id: string;
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
