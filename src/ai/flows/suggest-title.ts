'use server';

/**
 * @fileOverview AI-powered tool to suggest relevant blog post titles based on content.
 *
 * - suggestTitle - A function that suggests a title for a blog post.
 * - SuggestTitleInput - The input type for the suggestTitle function.
 * - SuggestTitleOutput - The return type for the suggestTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTitleInputSchema = z.object({
  contentSnippet: z
    .string()
    .describe(
      'The first few lines of the blog post content to generate a title from.'
    ),
});
export type SuggestTitleInput = z.infer<typeof SuggestTitleInputSchema>;

const SuggestTitleOutputSchema = z.object({
  title: z.string().describe('The suggested title for the blog post.'),
});
export type SuggestTitleOutput = z.infer<typeof SuggestTitleOutputSchema>;

export async function suggestTitle(input: SuggestTitleInput): Promise<SuggestTitleOutput> {
  return suggestTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTitlePrompt',
  input: {schema: SuggestTitleInputSchema},
  output: {schema: SuggestTitleOutputSchema},
  prompt: `You are an expert blog post title generator.

  You will generate a title based on the first few lines of content.

  Content Snippet: {{{contentSnippet}}}
  `,
});

const suggestTitleFlow = ai.defineFlow(
  {
    name: 'suggestTitleFlow',
    inputSchema: SuggestTitleInputSchema,
    outputSchema: SuggestTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
