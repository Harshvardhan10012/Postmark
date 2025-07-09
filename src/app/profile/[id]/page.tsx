import { PostCard } from "@/components/blog/post-card";
import { AppLayout } from "@/components/layout/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users, posts } from "@/lib/data";
import { notFound } from "next/navigation";

export default function ProfilePage({ params }: { params: { id: string } }) {
  const user = users.find((u) => u.id === params.id);
  if (!user) {
    notFound();
  }

  const userPosts = posts.filter((p) => p.authorId === user.id);

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <header className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <Avatar className="h-24 w-24 border-4 border-background shadow-md">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-3xl">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
              {user.name}
            </h1>
            <p className="text-muted-foreground">
              {userPosts.length} posts
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
