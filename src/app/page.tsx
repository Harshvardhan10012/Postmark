import { PostCard } from "@/components/blog/post-card";
import { Icons } from "@/components/icons";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, posts } from "@/lib/data";
import Link from "next/link";

export default function Home() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
              Feed
            </h1>
            <p className="text-muted-foreground">
              Browse the latest posts from our community.
            </p>
          </div>
          <Button asChild>
            <Link href="/posts/new">
              <Icons.Plus className="mr-2 h-4 w-4" /> New Post
            </Link>
          </Button>
        </header>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search posts..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
