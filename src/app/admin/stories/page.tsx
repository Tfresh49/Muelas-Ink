
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookText, PlusCircle, Trash2, Loader2 } from "lucide-react";
import { getStories, addStory, deleteStory } from "@/lib/stories";
import type { Story } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const storySchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.string().min(1, "Tags are required"),
});

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof storySchema>>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tags: "",
    },
  });

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

  const onSubmit = async (values: z.infer<typeof storySchema>) => {
    setIsSubmitting(true);
    try {
      const newStoryData = {
          ...values,
          tags: values.tags.split(',').map(tag => tag.trim()),
      };
      const newStory = await addStory(newStoryData);
      setStories([newStory, ...stories]);
      toast({
        title: "Success!",
        description: "Your story has been created.",
      });
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating story:", error);
       toast({
        title: "Error",
        description: "Failed to create the story.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2" />
                    Add Story
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                 <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">Create New Story</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="The Whispering Woods" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="excerpt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Excerpt</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="A short summary of the story..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Once upon a time..." {...field} rows={10} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Fantasy" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <Input placeholder="magic, adventure, forest" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Story
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
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
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(story.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </div>
                ))}
            </div>
        )}
      </CardContent>
    </Card>
  );
}
