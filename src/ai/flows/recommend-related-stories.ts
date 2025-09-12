'use server';

/**
 * @fileOverview A flow that recommends related stories based on user reading history and search queries.
 *
 * - recommendRelatedStories - A function that handles the recommendation process.
 * - RecommendRelatedStoriesInput - The input type for the recommendRelatedStories function.
 * - RecommendRelatedStoriesOutput - The return type for the recommendRelatedStories function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendRelatedStoriesInputSchema = z.object({
  readingHistory: z
    .string()
    .describe('The user reading history, including titles and categories.'),
  searchQueries: z
    .string()
    .describe('The user search queries related to stories.'),
  numberOfRecommendations: z
    .number()
    .default(3)
    .describe('The number of story recommendations to return.'),
});
export type RecommendRelatedStoriesInput = z.infer<typeof RecommendRelatedStoriesInputSchema>;

const RecommendRelatedStoriesOutputSchema = z.object({
  recommendedStories: z
    .array(z.string())
    .describe('A list of recommended story titles.'),
});
export type RecommendRelatedStoriesOutput = z.infer<typeof RecommendRelatedStoriesOutputSchema>;

export async function recommendRelatedStories(
  input: RecommendRelatedStoriesInput
): Promise<RecommendRelatedStoriesOutput> {
  return recommendRelatedStoriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendRelatedStoriesPrompt',
  input: {schema: RecommendRelatedStoriesInputSchema},
  output: {schema: RecommendRelatedStoriesOutputSchema},
  prompt: `You are a story recommendation expert. Based on the user's reading history and search queries, you will recommend related stories.

Reading History: {{{readingHistory}}}
Search Queries: {{{searchQueries}}}

Recommend {{{numberOfRecommendations}}} stories that the user might enjoy. Just return the story titles, one title per line.
`,
});

const recommendRelatedStoriesFlow = ai.defineFlow(
  {
    name: 'recommendRelatedStoriesFlow',
    inputSchema: RecommendRelatedStoriesInputSchema,
    outputSchema: RecommendRelatedStoriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
