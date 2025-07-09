import { Post, User, Category } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { users, categories } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "../icons";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const author = users.find((user) => user.id === post.authorId) as User;
  const category = categories.find(
    (cat) => cat.id === post.categoryId
  ) as Category;

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/posts/${post.slug}`} className="block">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={600}
            height={400}
            className="aspect-[3/2] w-full object-cover"
            data-ai-hint={post.imageHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <Badge variant="secondary" className="mb-2">
          {category.name}
        </Badge>
        <CardTitle className="mb-2 font-headline text-xl leading-tight">
          <Link href={`/posts/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/profile/${author.id}`}>
            <Avatar className="h-6 w-6">
              <AvatarImage src={author.avatarUrl} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <Link href={`/profile/${author.id}`} className="font-medium hover:underline">
            {author.name}
          </Link>
          <span>·</span>
          <time dateTime={post.createdAt}>
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </time>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Icons.Heart className="h-4 w-4" />
              {post.likes}
            </span>
            <span className="flex items-center gap-1.5">
              <Icons.MessageCircle className="h-4 w-4" />
              {post.commentsCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
