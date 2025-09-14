
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookText, Loader2, ArrowLeft, Bold, Italic, Underline, Strikethrough, Heading1, Heading2, Heading3, Palette, Highlighter, Link2, Image as ImageIcon, PlusCircle } from "lucide-react";
import { addStory } from "@/lib/stories";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const episodeSchema = z.object({
  title: z.string().min(1, "Episode title is required"),
  content: z.string().min(1, "Episode content is required"),
});

const seasonSchema = z.object({
  title: z.string().min(1, "Season title is required"),
  episodes: z.array(episodeSchema).min(1, "A season must have at least one episode."),
});

const storySchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.string().min(1, "Tags are required"),
  seasons: z.array(seasonSchema).min(1, "A story must have at least one season."),
});

type FormValues = z.infer<typeof storySchema>;

const EditorToolbar = () => (
    <TooltipProvider>
        <div className="flex items-center gap-1 border rounded-md p-2 bg-secondary mb-4">
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon"><Bold /></Button></TooltipTrigger><TooltipContent><p>Bold</p></TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon"><Italic /></Button></TooltipTrigger><TooltipContent><p>Italic</p></TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon"><Underline /></Button></TooltipTrigger><TooltipContent><p>Underline</p></TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon"><Strikethrough /></Button></TooltipTrigger><TooltipContent><p>Strikethrough</p></TooltipContent></Tooltip>
            <div className="w-px h-6 bg-border mx-2" />
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon"><Heading1 /></Button></TooltipTrigger><TooltipContent><p>Heading 1</p></TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon"><Heading2 /></Button></TooltipTrigger><TooltipContent><p>Heading 2</p></TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon"><Heading3 /></Button></TooltipTrigger><TooltipContent><p>Heading 3</p></TooltipContent></Tooltip>
            <div className="w-px h-6 bg-border mx-2" />
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon"><Palette /></Button></TooltipTrigger><TooltipContent><p>Text Color</p></TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon"><Highlighter /></Button></TooltipTrigger><TooltipContent><p>Highlight</p></TooltipContent></Tooltip>
            <div className="w-px h-6 bg-border mx-2" />
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon"><Link2 /></Button></TooltipTrigger><TooltipContent><p>Insert Link</p></TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon"><ImageIcon /></Button></TooltipTrigger><TooltipContent><p>Upload Image</p></TooltipContent></Tooltip>
        </div>
    </TooltipProvider>
);


export default function NewStoryPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSeason, setActiveSeason] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: "",
      excerpt: "",
      category: "",
      tags: "",
      seasons: [{ title: "Season 1", episodes: [{ title: "Episode 1", content: "" }] }],
    },
  });

  const { fields: seasons, append: appendSeason } = useFieldArray({
    control: form.control,
    name: "seasons",
  });

  const { fields: episodes, append: appendEpisode } = useFieldArray({
    control: form.control,
    name: `seasons.${activeSeason}.episodes`,
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const newStoryData = {
        ...values,
        tags: values.tags.split(',').map(tag => tag.trim()),
        seasons: values.seasons.map(season => ({
            ...season,
            episodes: season.episodes.map(episode => ({ ...episode, id: crypto.randomUUID() })),
            id: crypto.randomUUID(),
        })),
      };
      await addStory(newStoryData as any); // Type assertion needed due to evolving type
      toast({
        title: "Success!",
        description: "Your story has been created.",
      });
      router.push("/admin/stories");
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

  const addSeason = () => {
    appendSeason({ title: `Season ${seasons.length + 1}`, episodes: [{ title: "Episode 1", content: "" }] });
    setActiveSeason(seasons.length);
  };
  
  const addEpisode = () => {
    const currentSeason = form.getValues(`seasons.${activeSeason}`);
    appendEpisode({ title: `Episode ${currentSeason.episodes.length + 1}`, content: "" });
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Link href="/admin/stories">
              <ArrowLeft className="h-6 w-6" />
          </Link>
          <BookText className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-2xl">Create New Story</CardTitle>
            <CardDescription>Fill out the details below to publish a new story.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Story Title</FormLabel>
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
            
            <div className="border p-4 rounded-lg space-y-4">
                <h3 className="font-headline text-lg">Content Editor</h3>
                <div className="flex gap-2">
                    {seasons.map((season, index) => (
                        <Button 
                            key={season.id} 
                            variant={activeSeason === index ? 'default' : 'outline'}
                            onClick={() => setActiveSeason(index)}
                        >
                            {form.watch(`seasons.${index}.title`)}
                        </Button>
                    ))}
                    <Button variant="ghost" onClick={addSeason} type="button"><PlusCircle className="mr-2" /> Add Season</Button>
                </div>

                <FormField
                    control={form.control}
                    name={`seasons.${activeSeason}.title`}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Season Title</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                 />

                <Tabs defaultValue="0" className="w-full">
                    <div className="flex items-center gap-2">
                        <TabsList>
                            {episodes.map((episode, index) => (
                                <TabsTrigger key={episode.id} value={String(index)}>
                                    {form.watch(`seasons.${activeSeason}.episodes.${index}.title`)}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <Button variant="ghost" size="sm" onClick={addEpisode} type="button"><PlusCircle className="mr-2" /> Add Episode</Button>
                    </div>

                    {episodes.map((episode, index) => (
                       <TabsContent key={episode.id} value={String(index)}>
                           <div className="space-y-4 pt-4">
                                <FormField
                                    control={form.control}
                                    name={`seasons.${activeSeason}.episodes.${index}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Episode Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`seasons.${activeSeason}.episodes.${index}.content`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Episode Content</FormLabel>
                                            <EditorToolbar />
                                            <FormControl>
                                                <Textarea {...field} rows={15} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                           </div>
                       </TabsContent>
                    ))}
                </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <FormLabel>Tags (comma-separated)</FormLabel>
                            <FormControl>
                                <Input placeholder="magic, adventure, forest" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Publish Story
                </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
