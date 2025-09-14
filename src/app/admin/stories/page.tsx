
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookText, PlusCircle, Trash2, Loader2, Edit } from "lucide-react";
import { getStories, deleteStory } from "@/lib/stories";
import type { Story } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchStories() {
      setIsLoading(true);
      try {
        const fetchedStories = await getStories();
        setStories(fetchedStories);
      } catch (error) {
        console.error("Error fetching stories:", error);
        toast({
          title: "Error",
          description: "Could not fetch stories.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchStories();
  }, [toast]);

   const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    try {
      await deleteStory(id);
      setStories(stories.filter(story => story.id !== id));
      toast({
        title: "Story Deleted",
        description: "The story has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting story:", error);
      toast({
        title: "Error",
        description: "Failed to delete the story.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
            <BookText className="h-8 w-8 text-primary" />
            <div>
                <CardTitle className="font-headline text-2xl">Manage Stories</CardTitle>
                <CardDescription>Create, edit, and delete stories.</CardDescription>
            </div>
        </div>
        <Button asChild>
            <Link href="/admin/stories/new">
                <PlusCircle className="mr-2" />
                Add Story
            </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
            <div className="flex justify-center items-center h-48">
                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        ) : stories.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">
                You haven't created any stories yet. Click "Add Story" to get started.
            </p>
        ) : (
            <div className="space-y-4">
                {stories.map(story => (
                    <div key={story.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <h3 className="font-semibold">{story.title}</h3>
                            <p className="text-sm text-muted-foreground">{story.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                           <Button variant="outline" size="icon" asChild>
                               <Link href={`/admin/stories/edit/${story.id}`}>
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                               </Link>
                           </Button>
                            <Button variant="destructive" size="icon" onClick={() => handleDelete(story.id)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </CardContent>
    </Card>
  );
}
