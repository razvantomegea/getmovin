# Movin Blog System

A complete blog system built with Next.js, TypeScript, and Shadcn/UI components that matches the Movin app's design theme.

## Features

- 📱 **Responsive Design**: Mobile-first design that looks great on all devices
- 🔍 **Search Functionality**: Real-time search through blog posts by title, description, or tags
- 📄 **Pagination**: Clean pagination for easy navigation through posts
- 🏷️ **Tagging System**: Organize posts with tags and filter by them
- 🎨 **SEO Optimized**: Rich metadata, Open Graph, Twitter Cards, and structured data
- ✍️ **Markdown Support**: Write posts in Markdown format for easy formatting
- 🎯 **Admin Interface**: Simple form-based interface for creating new posts
- 🚀 **Performance**: Static generation with ISR for fast loading times

## Structure

```
├── app/
│   ├── blog/
│   │   ├── page.tsx              # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx          # Individual blog post page
│   ├── admin/
│   │   └── blog/
│   │       └── page.tsx          # Admin interface for creating posts
│   └── api/
│       └── blog/
│           ├── route.ts          # API endpoint for all posts
│           └── [slug]/
│               └── route.ts      # API endpoint for individual posts
├── content/
│   └── blog/                     # Markdown files storage
│       ├── welcome-to-movin-blog.md
│       ├── the-science-behind-move-to-earn.md
│       └── building-healthy-habits-with-web3.md
└── BLOG_README.md               # This file
```

## Getting Started

### 1. Dependencies

The blog system uses the following dependencies:

- `gray-matter` - For parsing frontmatter in markdown files
- `marked` - For converting markdown to HTML
- `@tailwindcss/typography` - For better prose styling

These are already installed if you followed the setup.

### 2. Creating Blog Posts

#### Method 1: Using the Admin Interface (Recommended)

1. Navigate to `/admin/blog` in your browser
2. Fill out the form with your blog post details
3. Write your content in Markdown format
4. Click "Create Blog Post"
5. Copy the generated markdown from the browser console
6. Create a new `.md` file in `content/blog/` directory
7. Paste the content and save

#### Method 2: Manual Creation

1. Create a new `.md` file in the `content/blog/` directory
2. Use the following frontmatter structure:

```markdown
---
title: 'Your Blog Post Title'
description: 'A brief description of your post'
publishedAt: '2024-01-15'
author: 'Author Name'
tags: ['tag1', 'tag2', 'tag3']
featured: true
coverImage: '/images/your-image.png'
---

# Your Blog Post Content

Write your content here using Markdown syntax...
```

### 3. Frontmatter Fields

| Field         | Required | Description                            |
| ------------- | -------- | -------------------------------------- |
| `title`       | Yes      | The blog post title                    |
| `description` | Yes      | Brief description for SEO and previews |
| `publishedAt` | Yes      | Publication date (YYYY-MM-DD format)   |
| `author`      | Yes      | Author name                            |
| `tags`        | No       | Array of tags for categorization       |
| `featured`    | No       | Boolean to mark as featured post       |
| `coverImage`  | No       | Path to cover image                    |
| `authorImage` | No       | Path to author profile image           |

### 4. Markdown Syntax Guide

The blog supports standard Markdown syntax:

```markdown
# Heading 1

## Heading 2

### Heading 3

**Bold text**
_Italic text_

- Bullet point 1
- Bullet point 2

1. Numbered list item 1
2. Numbered list item 2

[Link text](https://example.com)

`inline code`

> Blockquote text

![Image alt text](/path/to/image.jpg)
```

## Customization

### Styling

The blog uses Tailwind CSS classes and follows the Movin app's design system:

- Primary color: `#0095ff`
- Typography: Tailwind Typography plugin
- Components: Shadcn/UI components

### SEO Configuration

Each blog post automatically generates:

- Meta tags for title, description, and keywords
- Open Graph tags for social media sharing
- Twitter Card tags
- JSON-LD structured data for search engines
- Canonical URLs

### Search and Pagination

- **Search**: Searches through title, description, and tags
- **Pagination**: 6 posts per page (configurable in `app/blog/page.tsx`)
- **Sorting**: Posts are sorted by publication date (newest first)

## API Endpoints

### GET `/api/blog`

Returns all blog posts with metadata.

**Response:**

```json
{
  "posts": [
    {
      "slug": "post-slug",
      "title": "Post Title",
      "description": "Post description",
      "content": "HTML content",
      "publishedAt": "2024-01-15",
      "author": "Author Name",
      "readTime": 5,
      "tags": ["tag1", "tag2"],
      "featured": true,
      "coverImage": "/images/cover.png"
    }
  ]
}
```

### GET `/api/blog/[slug]`

Returns a specific blog post by slug.

**Response:**

```json
{
  "post": {
    "slug": "post-slug",
    "title": "Post Title",
    "description": "Post description",
    "content": "HTML content",
    "publishedAt": "2024-01-15",
    "author": "Author Name",
    "readTime": 5,
    "tags": ["tag1", "tag2"],
    "featured": true,
    "coverImage": "/images/cover.png"
  }
}
```

## Navigation Integration

The blog is integrated into the main site navigation:

- Desktop navigation includes "Blog" link
- Mobile navigation includes "Blog" link
- Blog pages include navigation back to the main site

## Performance Considerations

- **Static Generation**: Blog posts are statically generated at build time
- **ISR**: Uses Incremental Static Regeneration for dynamic updates
- **Image Optimization**: Next.js Image component for optimized loading
- **Code Splitting**: Each blog post is a separate route for optimal loading

## Security

- **Input Sanitization**: Markdown content is processed server-side
- **XSS Protection**: HTML content is properly sanitized
- **Rate Limiting**: Consider adding rate limiting to API endpoints for production

## Best Practices

1. **Images**: Store images in the `public/images/` directory
2. **Slugs**: Use kebab-case for file names (becomes the URL slug)
3. **Tags**: Use consistent, lowercase tags for better organization
4. **Content**: Write in Markdown for consistency and maintainability
5. **SEO**: Always include title, description, and relevant tags

## Troubleshooting

### Common Issues

1. **Blog post not appearing**: Check that the markdown file is in `content/blog/` and has proper frontmatter
2. **Image not loading**: Verify the image path is correct and the file exists in `public/`
3. **Styling issues**: Ensure Tailwind classes are properly applied and the typography plugin is installed
4. **Search not working**: Check that the API endpoints are accessible

### Debug Mode

Add `console.log` statements in the API routes to debug post loading issues.

## Future Enhancements

Consider adding these features:

- **Comments System**: Integration with a comment service
- **Newsletter**: Email subscription for new posts
- **Social Sharing**: Share buttons for social media platforms
- **Analytics**: Track blog post performance
- **RSS Feed**: Generate RSS feed for blog posts
- **Categories**: Additional organization beyond tags
- **Draft System**: Ability to save drafts before publishing

## Contributing

When adding new features to the blog system:

1. Follow the existing code structure
2. Maintain the Movin design theme
3. Update this README with any new features
4. Test on both desktop and mobile devices
5. Ensure accessibility compliance
