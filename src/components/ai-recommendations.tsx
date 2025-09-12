"use client"

import { recommendRelatedStories } from "@/ai/flows/recommend-related-stories";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

export default function AIRecommendations() {
  const [readingHistory, setReadingHistory] = useState('');
  const [searchQueries, setSearchQueries] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const storedReadingHistory = localStorage.getItem('readingHistory');
    if (storedReadingHistory) {
      setReadingHistory(JSON.parse(storedReadingHistory).join(', '));
    }
    const storedSearchHistory = localStorage.getItem('searchHistory');
    if (storedSearchHistory) {
      setSearchQueries(JSON.parse(storedSearchHistory).join(', '));
    }
  }, []);

  const handleGetRecommendations = () => {
    startTransition(async () => {
      const result = await recommendRelatedStories({
        readingHistory,
        searchQueries,
        numberOfRecommendations: 3,
      });
      setRecommendations(result.recommendedStories);
    });
  };

  if (!readingHistory && !searchQueries) {
    return null;
  }

  return (
    <Card className="mb-8 bg-card/50 border-dashed">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="text-accent" />
          <span>Stories Picked For You</span>
        </CardTitle>
        <CardDescription>
          Based on your activity, you might like these stories. Get new recommendations anytime.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button onClick={handleGetRecommendations} disabled={isPending}>
              {isPending ? 'Thinking...' : 'Suggest Stories'}
            </Button>
            {recommendations.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {recommendations.map((rec, index) => (
                        <span key={index} className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground">
                            {rec}
                        </span>
                    ))}
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  )
}
