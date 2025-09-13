
import { allReels } from '@/lib/data';
import { notFound } from 'next/navigation';
import ReelPlayer from './reel-player';

interface ReelPageProps {
  params: {
    id: string;
  };
}

export default function ReelPage({ params }: ReelPageProps) {
  const reel = allReels.find(r => r.id === params.id);

  if (!reel) {
    notFound();
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <ReelPlayer reel={reel} />
    </div>
  );
}

export async function generateStaticParams() {
  return allReels.map(reel => ({
    id: reel.id,
  }));
}
