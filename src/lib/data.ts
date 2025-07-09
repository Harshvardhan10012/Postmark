import { User, Category, Post, Comment } from "@/types";

export const users: User[] = [
  { id: "user-1", name: "Eleanor Vance", avatarUrl: "https://placehold.co/100x100" },
  { id: "user-2", name: "Marcus Thorne", avatarUrl: "https://placehold.co/100x100" },
  { id: "user-3", name: "Isabella Rossi", avatarUrl: "https://placehold.co/100x100" },
];

export const categories: Category[] = [
  { id: "tech", name: "Technology" },
  { id: "travel", name: "Travel" },
  { id: "food", name: "Food & Cooking" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "design", name: "Design" },
];

export const posts: Post[] = [
  {
    id: "post-1",
    title: "The Future of AI in Web Development",
    slug: "future-of-ai-in-web-development",
    content: "Artificial Intelligence is rapidly changing the landscape of web development. From automated coding to intelligent testing, AI tools are becoming indispensable for developers. This post explores the potential impacts and emerging trends... The rest of the content is a deep dive into various AI tools and their applications in the modern web development workflow.",
    imageUrl: "https://placehold.co/600x400",
    imageHint: "technology abstract",
    authorId: "user-1",
    categoryId: "tech",
    tags: ["AI", "Web Development", "Future Tech"],
    likes: 128,
    commentsCount: 12,
    createdAt: "2024-05-20T14:48:00.000Z",
  },
  {
    id: "post-2",
    title: "A Culinary Journey Through Northern Italy",
    slug: "culinary-journey-through-northern-italy",
    content: "Join me on a delicious adventure through the flavors of Northern Italy. From creamy risottos in Lombardy to the rich balsamic vinegars of Modena, we'll uncover the secrets of this celebrated cuisine... The post continues with recipes, restaurant recommendations, and beautiful photography of Italian dishes.",
    imageUrl: "https://placehold.co/600x400",
    imageHint: "italian food",
    authorId: "user-3",
    categoryId: "food",
    tags: ["Italy", "Food", "Travel"],
    likes: 256,
    commentsCount: 28,
    createdAt: "2024-05-18T10:30:00.000Z",
  },
  {
    id: "post-3",
    title: "Minimalist Design: Less is More",
    slug: "minimalist-design-less-is-more",
    content: "Minimalism isn't just an aesthetic; it's a principle. By stripping away the non-essential, we can create user interfaces that are not only beautiful but also highly functional. This article delves into the core tenets of minimalist design... It further explores case studies of successful minimalist websites and apps.",
    imageUrl: "https://placehold.co/600x400",
    imageHint: "minimalist interior",
    authorId: "user-2",
    categoryId: "design",
    tags: ["Design", "UI/UX", "Minimalism"],
    likes: 512,
    commentsCount: 45,
    createdAt: "2024-05-15T09:00:00.000Z",
  },
  {
    id: "post-4",
    title: "Backpacking Through Southeast Asia",
    slug: "backpacking-through-southeast-asia",
    content: "My three-month journey across Southeast Asia was a life-changing experience. From the bustling streets of Bangkok to the serene temples of Angkor Wat, here's my guide to backpacking on a budget... The article provides a detailed itinerary, budget tips, and cultural insights.",
    imageUrl: "https://placehold.co/600x400",
    imageHint: "asia landscape",
    authorId: "user-1",
    categoryId: "travel",
    tags: ["Travel", "Backpacking", "Asia"],
    likes: 320,
    commentsCount: 34,
    createdAt: "2024-05-12T18:20:00.000Z",
  },
];

export const comments: Comment[] = [
    { id: 'comment-1', postId: 'post-1', authorId: 'user-2', text: 'Great insights on AI! Really makes you think about the future.', createdAt: '2024-05-20T15:00:00.000Z' },
    { id: 'comment-2', postId: 'post-1', authorId: 'user-3', text: 'I\'ve started using some of these tools and they are game-changers.', createdAt: '2024-05-21T09:15:00.000Z' },
    { id: 'comment-3', postId: 'post-2', authorId: 'user-1', text: 'This makes me so hungry! The photos are amazing.', createdAt: '2024-05-18T11:00:00.000Z' },
];
