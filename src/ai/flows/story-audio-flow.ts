'use server';

/**
 * @fileOverview A flow that converts a story's text content to speech audio.
 *
 * - generateStoryAudio - A function that handles the text-to-speech process.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import { googleAI } from '@genkit-ai/googleai';

const GenerateStoryAudioInputSchema = z.object({
  storyContent: z.string().describe('The text content of the story to be converted to audio.'),
});
export type GenerateStoryAudioInput = z.infer<typeof GenerateStoryAudioInputSchema>;

const GenerateStoryAudioOutputSchema = z.object({
  audioDataUri: z.string().describe("The generated audio as a data URI. Expected format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GenerateStoryAudioOutput = z.infer<typeof GenerateStoryAudioOutputSchema>;


async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', (d: Buffer) => bufs.push(d));
    writer.on('end', () => {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const generateStoryAudioFlow = ai.defineFlow(
  {
    name: 'generateStoryAudioFlow',
    inputSchema: GenerateStoryAudioInputSchema,
    outputSchema: GenerateStoryAudioOutputSchema,
  },
  async ({ storyContent }) => {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: storyContent,
    });

    if (!media) {
      throw new Error('No audio media was returned from the AI model.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavBase64 = await toWav(audioBuffer);

    return {
      audioDataUri: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);


export async function generateStoryAudio(input: GenerateStoryAudioInput): Promise<GenerateStoryAudioOutput> {
  return generateStoryAudioFlow(input);
}
