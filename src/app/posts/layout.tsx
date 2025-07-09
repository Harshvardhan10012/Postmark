import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { ReactNode } from "react";

export default function PostsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-muted/40">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold font-headline">
            <Icons.Book className="h-6 w-6 text-primary" />
            <span>PostMark</span>
        </Link>
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <Icons.ArrowLeft className="mr-2 h-4 w-4" />
            Back to Feed
          </Link>
        </Button>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
