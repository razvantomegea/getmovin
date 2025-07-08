import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const pages: MetadataRoute.Sitemap = [
    {
      url: 'https://getmovin.ai',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://getmovin.ai/lightpaper',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://getmovin.ai/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Dynamic blog posts
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  let blogPosts: MetadataRoute.Sitemap = [];
  if (fs.existsSync(postsDirectory)) {
    const fileNames = fs.readdirSync(postsDirectory);
    blogPosts = fileNames
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const slug = file.replace(/\.md$/, '');
        return {
          url: `https://getmovin.ai/blog/${slug}`,
          lastModified: fs.statSync(path.join(postsDirectory, file)).mtime,
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        };
      });
  }

  // Return all sitemap entries (excluding /admin and API/component routes)
  return [...pages, ...blogPosts];
}
