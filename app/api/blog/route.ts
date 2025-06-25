import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  publishedAt: string
  author: string
  readTime: number
  tags: string[]
  featured: boolean
  coverImage?: string
  authorImage?: string
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/blog')
    
    // Create content/blog directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
      
      // Create a sample blog post
      const samplePost = `---
title: "Welcome to Movin Blog"
description: "Discover the future of fitness with move-to-earn technology and web3 innovation."
publishedAt: "2024-01-15"
author: "Movin Team"
tags: ["fitness", "web3", "move-to-earn", "blockchain"]
featured: true
coverImage: "/images/splash-dark.png"
---

# Welcome to the Movin Blog

We're excited to share insights about the future of fitness technology, web3 innovation, and the revolutionary move-to-earn ecosystem.

## What is Move-to-Earn?

Move-to-earn represents a paradigm shift in how we think about fitness and rewards. By combining physical activity with blockchain technology, we're creating a new economy where your effort truly counts.

### Key Benefits

- **Earn while you exercise**: Get rewarded for staying active
- **Track your progress**: Monitor calories, steps, and fitness goals
- **Join a community**: Connect with like-minded fitness enthusiasts
- **Blockchain-powered**: Secure, transparent, and decentralized

## The Future is Here

With Movin, every step you take is a step towards a healthier, more rewarding lifestyle. Join us on this journey to revolutionize fitness through web3 technology.

Ready to get started? Download the Movin app today and start earning rewards for your fitness journey!
`
      
      fs.writeFileSync(path.join(postsDirectory, 'welcome-to-movin-blog.md'), samplePost)
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const posts: BlogPost[] = []

    for (const fileName of fileNames) {
      if (fileName.endsWith('.md')) {
        const filePath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)
        
        const slug = fileName.replace(/\.md$/, '')
        
        posts.push({
          slug,
          title: data.title || 'Untitled',
          description: data.description || '',
          content: content,
          publishedAt: data.publishedAt || new Date().toISOString(),
          author: data.author || 'Anonymous',
          readTime: calculateReadTime(content),
          tags: data.tags || [],
          featured: data.featured || false,
          coverImage: data.coverImage,
          authorImage: data.authorImage,
        })
      }
    }

    // Sort posts by publish date (newest first)
    posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
} 