import { comments, users } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const postComments = comments.filter((c) => c.postId === postId);

  return (
    <section className="py-8">
      <h2 className="mb-6 font-headline text-2xl font-bold">
        Comments ({postComments.length})
      </h2>
      <div className="mb-8">
        <form className="flex flex-col gap-4">
          <Textarea placeholder="Write a comment..." rows={3} />
          <Button type="submit" className="self-start">
            Post Comment
          </Button>
        </form>
      </div>
      <div className="space-y-6">
        {postComments.map((comment) => {
          const author = users.find((u) => u.id === comment.authorId);
          if (!author) return null;
          return (
            <div key={comment.id} className="flex items-start gap-4">
              <Link href={`/profile/${author.id}`}>
                <Avatar>
                  <AvatarImage src={author.avatarUrl} alt={author.name} />
                  <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <div className="mb-1 flex items-center gap-2 text-sm">
                  <Link href={`/profile/${author.id}`} className="font-bold hover:underline">
                    {author.name}
                  </Link>
                  <time
                    dateTime={comment.createdAt}
                    className="text-muted-foreground"
                  >
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </time>
                </div>
                <p className="text-foreground/90">{comment.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
