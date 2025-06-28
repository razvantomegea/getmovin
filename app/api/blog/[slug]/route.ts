import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  author: string;
  readTime: number;
  tags: string[];
  featured: boolean;
  coverImage?: string;
  authorImage?: string;
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await params;
    const postsDirectory = path.join(process.cwd(), 'content/blog');
    const filePath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const htmlContent = await marked(content);

    const post: BlogPost = {
      slug: slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      content: htmlContent,
      publishedAt: data.publishedAt || new Date().toISOString(),
      author: data.author || 'Anonymous',
      readTime: calculateReadTime(content),
      tags: data.tags || [],
      featured: data.featured || false,
      coverImage: data.coverImage,
      authorImage: data.authorImage,
    };

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}
