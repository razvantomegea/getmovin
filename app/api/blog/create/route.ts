import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, content, author, tags, featured, coverImage } = body;

    if (!title || !description || !content || !author) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, content, author' },
        { status: 400 },
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Generate current date
    const publishedAt = new Date().toISOString().split('T')[0];

    // Create markdown content with frontmatter
    const markdownContent = `---
title: "${title}"
description: "${description}"
publishedAt: "${publishedAt}"
author: "${author}"
tags: [${tags.map((tag: string) => `"${tag}"`).join(', ')}]
featured: ${featured || false}
${coverImage ? `coverImage: "${coverImage}"` : ''}
---

${content}`;

    // Ensure content/blog directory exists
    const postsDirectory = path.join(process.cwd(), 'content/blog');
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    // Write the file
    const filePath = path.join(postsDirectory, `${slug}.md`);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'A post with this title already exists. Please choose a different title.' },
        { status: 409 },
      );
    }

    fs.writeFileSync(filePath, markdownContent, 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully!',
      slug: slug,
      filePath: `content/blog/${slug}.md`,
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post. Please try again.' },
      { status: 500 },
    );
  }
}
