'use server';

import { suggestTags } from "@/ai/flows/suggest-tags";
import { suggestTitle } from "@/ai/flows/suggest-title";

export async function getSuggestedTitle(contentSnippet: string) {
    try {
        const result = await suggestTitle({ contentSnippet });
        return { success: true, title: result.title };
    } catch (error) {
        console.error("Error suggesting title:", error);
        return { success: false, error: "Failed to suggest title." };
    }
}

export async function getSuggestedTags(content: string) {
    try {
        if (!content.trim()) {
            return { success: false, error: "Content is too short to suggest tags." };
        }
        const result = await suggestTags({ content });
        return { success: true, tags: result.tags };
    } catch (error) {
        console.error("Error suggesting tags:", error);
        return { success: false, error: "Failed to suggest tags." };
    }
}
