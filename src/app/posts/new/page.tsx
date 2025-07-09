import { PostForm } from "@/components/blog/post-form";

export default function NewPostPage() {
    return (
        <div className="flex justify-center p-4 md:p-8">
            <div className="w-full max-w-4xl">
                 <header className="mb-8">
                    <h1 className="font-headline text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                        Create a New Post
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Unleash your creativity and share your story with the world.
                    </p>
                </header>
                <PostForm />
            </div>
        </div>
    );
}
