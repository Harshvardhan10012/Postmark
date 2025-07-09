import { CommentSection } from "@/components/blog/comment-section";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { posts, users } from "@/lib/data";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const author = users.find((u) => u.id === post.authorId);

  return (
    <div className="flex justify-center">
      <article className="w-full max-w-4xl bg-background py-8 md:py-12">
        <div className="px-6 md:px-8">
          <header className="mb-8">
            <h1 className="mb-4 font-headline text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              {author && (
                <div className="flex items-center space-x-2">
                  <Link href={`/profile/${author.id}`}>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={author.avatarUrl} alt={author.name} />
                      <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <Link href={`/profile/${author.id}`} className="font-medium hover:underline">{author.name}</Link>
                </div>
              )}
              <Separator orientation="vertical" className="h-4" />
              <time dateTime={post.createdAt}>
                {format(new Date(post.createdAt), "MMMM d, yyyy")}
              </time>
            </div>
          </header>
        </div>

        <Image
          src={post.imageUrl}
          alt={post.title}
          width={1200}
          height={675}
          className="aspect-video w-full object-cover"
          data-ai-hint={post.imageHint}
        />

        <div className="prose prose-lg mx-auto max-w-none px-6 py-8 text-foreground/90 md:px-8 prose-headings:font-headline prose-headings:text-foreground">
          <p>{post.content}</p>
        </div>
        
        <div className="px-6 md:px-8">
            <div className="mb-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                    {tag}
                    </Badge>
                ))}
            </div>

            <Separator />

            <div className="my-6 flex items-center justify-between">
                <Button variant="outline">
                    <Icons.Heart className="mr-2 h-4 w-4" /> Like ({post.likes})
                </Button>
            </div>

            <Separator />

            <CommentSection postId={post.id} />
        </div>
      </article>
    </div>
  );
}
