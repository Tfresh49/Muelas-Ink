import { allStories } from '@/lib/data';
import { notFound } from 'next/navigation';
import StoryView from './story-view';

interface StoryPageProps {
  params: {
    id: string;
  };
}

export default function StoryPage({ params }: StoryPageProps) {
  const story = allStories.find(s => s.id === params.id);

  if (!story) {
    notFound();
  }

  return <StoryView story={story} />;
}

export async function generateStaticParams() {
  return allStories.map(story => ({
    id: story.id,
  }));
}
