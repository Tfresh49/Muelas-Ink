
import { allFeedItems } from '@/lib/feeds-data';
import { notFound } from 'next/navigation';
import FeedView from './feed-view';

interface FeedPageProps {
  params: {
    id: string;
  };
}

export default function FeedPage({ params }: FeedPageProps) {
  const item = allFeedItems.find(i => i.id === params.id);

  if (!item) {
    notFound();
  }

  return <FeedView item={item} />;
}

export async function generateStaticParams() {
  return allFeedItems.map(item => ({
    id: item.id,
  }));
}
