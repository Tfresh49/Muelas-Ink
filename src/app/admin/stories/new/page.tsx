
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookText, Loader2, ArrowLeft, Bold, Italic, Underline, Strikethrough, Heading1, Heading2, Heading3, Palette, Highlighter, Link2, Image as ImageIcon, PlusCircle, Eye } from "lucide-react";
import { addStory } from "@/lib/stories";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";


const episodeSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Episode title is required"),
  content: z.string().min(1, "Episode content is required"),
});

const seasonSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Season title is required"),
  episodes: z.array(episodeSchema).min(1, "A season must have at least one episode."),
});

const storySchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.string().min(1, "Tags are required"),
  seasons: z.array(seasonSchema).min(1, "A story must have at least one season."),
  coverImageUrl: z.string().url("Must be a valid URL").min(1, "Cover Image URL is required"),
});

type FormValues = z.infer<typeof storySchema>;

const EditorToolbar = ({ onFormat }: { onFormat: (type: string) => void }) => (
    <TooltipProvider>
        <div className="flex items-center gap-1 border rounded-md p-2 bg-secondary mb-4">
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon" type="button" onClick={() => onFormat("bold")}><Bold /></Button></TooltipTrigger><TooltipContent><p>Bold</p></TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon" type="button" onClick={() => onFormat("italic")}><Italic /></Button></TooltipTrigger><TooltipContent><p>Italic</p></TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon" type="button" onClick={() => onFormat("underline")}><Underline /></Button></TooltipTrigger><TooltipContent><p>Underline</p></TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon" type="button" onClick={() => onFormat("strike")}><Strikethrough /></Button></TooltipTrigger><TooltipContent><p>Strikethrough</p></TooltipContent></Tooltip>
            <div className="w-px h-6 bg-border mx-2" />
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon" type="button" onClick={() => onFormat("h1")}><Heading1 /></Button></TooltipTrigger><TooltipContent><p>Heading 1</p></TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon" type="button" onClick={() => onFormat("h2")}><Heading2 /></Button></TooltipTrigger><TooltipContent><p>Heading 2</p></TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon" type="button" onClick={() => onFormat("h3")}><Heading3 /></Button></TooltipTrigger><TooltipContent><p>Heading 3</p></TooltipContent></Tooltip>
            <div className="w-px h-6 bg-border mx-2" />
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon" type="button"><Palette /></Button></TooltipTrigger><TooltipContent><p>Text Color (Not Implemented)</p></TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon" type="button"><Highlighter /></Button></TooltipTrigger><TooltipContent><p>Highlight (Not Implemented)</p></TooltipContent></Tooltip>
            <div className="w-px h-6 bg-border mx-2" />
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon" type="button" onClick={() => onFormat("link")}><Link2 /></Button></TooltipTrigger><TooltipContent><p>Insert Link</p></TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon" type="button" onClick={() => onFormat("image")}><ImageIcon /></Button></TooltipTrigger><TooltipContent><p>Insert Image</p></TooltipContent></Tooltip>
        </div>
    </TooltipProvider>
);

const StoryPreview = ({ storyData }: { storyData: Partial<FormValues> }) => {
    const { title, category, tags, seasons, coverImageUrl } = storyData;
    const activeContent = seasons?.[0]?.episodes?.[0]?.content || "Start writing to see your preview...";

    const formattedContent = activeContent
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto; border-radius: 0.5rem;" />')
      .replace(/\n/g, '<br />');

    return (
        <ScrollArea className="h-full w-full">
            <div className="p-8">
                <header className="mb-8">
                    <div className="flex gap-2 mb-4">
                        {category && <Badge variant="outline" className="border-accent text-accent">{category}</Badge>}
                        {tags?.split(',').map(tag => (
                            <Badge key={tag} variant="secondary">{tag.trim()}</Badge>
                        ))}
                    </div>
                    <h1 className="font-headline text-4xl md:text-5xl font-extrabold mb-2 leading-tight">
                        {title || "Your Story Title"}
                    </h1>
                </header>
                <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-8 shadow-lg bg-secondary">
                    <Image
                        src={coverImageUrl || "https://picsum.photos/seed/preview/1200/800"}
                        alt={title || "Story Preview"}
                        fill
                        className="object-cover"
                        data-ai-hint="abstract background"
                    />
                </div>
                 <div
                    className="prose prose-lg dark:prose-invert max-w-none font-body text-foreground/90 leading-relaxed space-y-6"
                    dangerouslySetInnerHTML={{ __html: formattedContent }}
                />
            </div>
        </ScrollArea>
    );
};


export default function NewStoryPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSeason, setActiveSeason] = useState(0);
  const [activeTab, setActiveTab] = useState("0");
  const [activeTextarea, setActiveTextarea] = useState<HTMLTextAreaElement | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: "",
      excerpt: "",
      category: "",
      tags: "",
      coverImageUrl: "",
      seasons: [{ title: "Season 1", episodes: [{ title: "Episode 1", content: "" }] }],
    },
  });

  const storyData = form.watch();

  const { fields: seasons, append: appendSeason, remove: removeSeason } = useFieldArray({
    control: form.control,
    name: "seasons",
  });
  
  const { fields: episodes, append: appendEpisode, remove: removeEpisode } = useFieldArray({
    control: form.control,
    name: `seasons.${activeSeason}.episodes`,
  });

  const handleFormat = (type: string) => {
    if (!activeTextarea) return;

    const start = activeTextarea.selectionStart;
    const end = activeTextarea.selectionEnd;
    const selectedText = activeTextarea.value.substring(start, end);
    let markdown = "";
    let newCursorPos = start;

    switch (type) {
        case "bold":
            markdown = `**${selectedText}**`;
            newCursorPos = start + 2;
            break;
        case "italic":
            markdown = `*${selectedText}*`;
            newCursorPos = start + 1;
            break;
        case "underline":
             markdown = `<u>${selectedText}</u>`;
             newCursorPos = start + 3;
             break;
        case "strike":
            markdown = `~~${selectedText}~~`;
            newCursorPos = start + 2;
            break;
        case "h1":
            markdown = `# ${selectedText}`;
            newCursorPos = start + 2;
            break;
        case "h2":
            markdown = `## ${selectedText}`;
            newCursorPos = start + 3;
            break;
        case "h3":
            markdown = `### ${selectedText}`;
            newCursorPos = start + 4;
            break;
        case "link":
             const linkUrl = prompt("Enter the URL:", "https://");
             if (linkUrl) {
                markdown = `[${selectedText || 'link text'}](${linkUrl})`;
                newCursorPos = start + 1;
             }
             break;
        case "image":
            const imageUrl = prompt("Enter the Image URL:");
            if(imageUrl) {
                markdown = `![${selectedText || 'alt text'}](${imageUrl})`;
                newCursorPos = start + 2;
            }
            break;
        default:
            return;
    }
    
    if (markdown === "") return;

    const episodeIndex = parseInt(activeTab);
    const fieldName = `seasons.${activeSeason}.episodes.${episodeIndex}.content`;
    const currentContent = form.getValues(fieldName as any);
    const newContent = currentContent.substring(0, start) + markdown + currentContent.substring(end);
    
    form.setValue(fieldName as any, newContent, { shouldDirty: true });
    
    setTimeout(() => {
        activeTextarea.focus();
        if (selectedText.length === 0 && (type === 'link' || type === 'image')) {
            // Move cursor inside the brackets/parentheses
            activeTextarea.setSelectionRange(newCursorPos, newCursorPos + (type === 'link' ? 9 : 8));
        } else {
            activeTextarea.setSelectionRange(newCursorPos, newCursorPos + selectedText.length);
        }
    }, 0);
  };


  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const { coverImageUrl, ...restOfValues } = values;
      const newStoryData = {
        ...restOfValues,
        imageUrl: coverImageUrl, // Map coverImageUrl to the expected imageUrl field
        tags: values.tags.split(',').map(tag => tag.trim()),
        seasons: values.seasons.map(season => ({
            ...season,
            episodes: season.episodes.map(episode => ({ ...episode, id: crypto.randomUUID() })),
            id: crypto.randomUUID(),
        })),
      };
      await addStory(newStoryData as any);
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
    setActiveTab("0");
  };
  
  const addEpisode = () => {
    const currentSeason = form.getValues(`seasons.${activeSeason}`);
    if(currentSeason.episodes) {
        appendEpisode({ title: `Episode ${currentSeason.episodes.length + 1}`, content: "" });
        setActiveTab(String(currentSeason.episodes.length));
    } else {
        appendEpisode({ title: 'Episode 1', content: '' });
        setActiveTab('0');
    }
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
                <Link href="/admin/stories">
                    <ArrowLeft />
                </Link>
            </Button>
            <BookText className="h-8 w-8 text-primary" />
            <div>
                <CardTitle className="font-headline text-2xl">Create New Story</CardTitle>
                <CardDescription>Fill out the details below to publish a new story.</CardDescription>
            </div>
            </div>
             <div className="flex justify-end gap-4">
                <Sheet>
                    <SheetTrigger asChild>
                         <Button type="button" variant="outline"><Eye className="mr-2" /> Preview</Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:max-w-2xl p-0">
                        <SheetHeader className="p-4 border-b">
                           <SheetTitle className="sr-only">Story Preview</SheetTitle>
                        </SheetHeader>
                        <StoryPreview storyData={storyData} />
                    </SheetContent>
                </Sheet>
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" form="story-form" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Publish Story
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form id="story-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <div className="flex flex-wrap items-center gap-2">
                    {seasons.map((season, index) => (
                        <Button 
                            key={season.id} 
                            type="button"
                            variant={activeSeason === index ? 'default' : 'outline'}
                            onClick={() => { setActiveSeason(index); setActiveTab("0"); }}
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

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="flex items-center gap-2 flex-wrap">
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
                       <TabsContent key={episode.id} value={String(index)} forceMount={true} className={cn(activeTab !== String(index) && "hidden")}>
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
                                            <EditorToolbar onFormat={handleFormat} />
                                            <FormControl>
                                                <Textarea 
                                                    {...field}
                                                    rows={15} 
                                                    onFocus={(e) => setActiveTextarea(e.target)}
                                                />
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
            
            <FormField
              control={form.control}
              name="coverImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                   <FormDescription>
                    This is the main image that will appear on the story card listings.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

    