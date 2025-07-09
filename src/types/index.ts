export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
  imageHint: string;
  authorId: string;
  categoryId: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  text: string;
  authorId: string;
  postId: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
}
