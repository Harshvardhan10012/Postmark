"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getSuggestedTags, getSuggestedTitle } from "@/lib/actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "../icons";
import { Badge } from "../ui/badge";

const postFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  content: z.string().min(10, "Content must be at least 10 characters."),
});

type PostFormValues = z.infer<typeof postFormSchema>;

export function PostForm() {
  const [isTitleLoading, setIsTitleLoading] = useState(false);
  const [isTagsLoading, setIsTagsLoading] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
    mode: "onChange",
  });

  const handleSuggestTitle = async () => {
    const content = form.getValues("content");
    if (content.length < 50) {
      toast({
        variant: "destructive",
        title: "Content too short",
        description: "Please write at least 50 characters to suggest a title.",
      });
      return;
    }
    setIsTitleLoading(true);
    const result = await getSuggestedTitle(content.substring(0, 200));
    if (result.success && result.title) {
      form.setValue("title", result.title, { shouldValidate: true });
      toast({
        title: "Title Suggested!",
        description: "We've filled in a title for you based on your content.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    }
    setIsTitleLoading(false);
  };

  const handleSuggestTags = async () => {
    const content = form.getValues("content");
    if (content.length < 100) {
        toast({
            variant: "destructive",
            title: "Content too short",
            description: "Please write at least 100 characters to suggest tags.",
        });
        return;
    }
    setIsTagsLoading(true);
    const result = await getSuggestedTags(content);
    if (result.success && result.tags) {
        setSuggestedTags(result.tags);
        toast({
            title: "Tags Suggested!",
            description: "We've suggested some tags based on your content.",
        });
    } else {
        toast({
            variant: "destructive",
            title: "Error",
            description: result.error,
        });
    }
    setIsTagsLoading(false);
  };

  const onSubmit = (data: PostFormValues) => {
    console.log(data);
    toast({
        title: "Post Submitted!",
        description: "Your post has been successfully created.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
            <CardContent className="p-6 space-y-8">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-lg">Post Title</FormLabel>
                    <FormControl>
                    <Input placeholder="Your amazing blog post title" {...field} className="text-base py-6" />
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
                    <FormLabel className="text-lg">Content</FormLabel>
                    <FormControl>
                    <Textarea
                        placeholder="Once upon a time..."
                        className="min-h-[400px] text-base"
                        {...field}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <div>
                <h3 className="text-lg font-medium mb-4">AI Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-secondary/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base font-semibold">
                                <Icons.Sparkles className="h-5 w-5 text-primary" /> Suggest a Title
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">Generate a catchy title based on the first few lines of your content.</p>
                            <Button type="button" variant="outline" onClick={handleSuggestTitle} disabled={isTitleLoading}>
                                {isTitleLoading && <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Generate Title
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base font-semibold">
                                <Icons.Sparkles className="h-5 w-5 text-primary" /> Suggest Tags
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-sm text-muted-foreground mb-4">Generate relevant tags to help others discover your amazing post.</p>
                            <Button type="button" variant="outline" onClick={handleSuggestTags} disabled={isTagsLoading}>
                                {isTagsLoading && <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Generate Tags
                            </Button>
                            {suggestedTags.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {suggestedTags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
            </CardContent>
            <CardFooter>
            <Button type="submit" size="lg">Publish Post</Button>
            </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
