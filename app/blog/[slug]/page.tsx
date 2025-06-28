import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { ShareButton } from '@/components/ui/share-button';
import { Toaster } from '@/components/ui/toaster';
import { NewsletterSubscription } from '@/components/ui/newsletter-subscription';

export const viewport = {
  themeColor: '#ffffff',
};

interface BlogPost {
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

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || location.origin}/api/blog/${slug}`,
      {
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.post;
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Movin Blog',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | Movin Blog`,
    description: post.description,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://getmovin.ai/blog/${post.slug}`,
      siteName: 'Movin Blog',
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
    },
    alternates: {
      canonical: `https://getmovin.ai/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Movin Logo"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="text-xl font-bold text-[#0095ff]">Movin</span>
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-[#0095ff]">
              Home
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium transition-colors hover:text-[#0095ff]"
            >
              Blog
            </Link>
          </nav>
        </div>
      </header>

      <main className="container py-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#0095ff] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">{post.description}</p>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {post.authorImage ? (
                    <Image
                      src={post.authorImage}
                      alt={post.author}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#0095ff] flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime} min read
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ShareButton
                title={post.title}
                description={post.description}
                hashtags={post.tags}
                variant="outline"
                size="sm"
              />
            </div>

            <Separator />
          </header>

          {/* Featured Image */}
          {post.coverImage && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12 dark:prose-invert">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="prose-headings:font-bold prose-a:text-[#0095ff] prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-[#0095ff] prose-blockquote:bg-[#0095ff]/5 prose-blockquote:px-4 prose-blockquote:py-2 prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm"
            />
          </div>

          {/* Author Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                {post.authorImage ? (
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-[#0095ff] flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg">{post.author}</h3>
                  <p className="text-muted-foreground">
                    Author at Movin - Passionate about fitness technology and web3 innovation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Subscription */}
          <div className="mb-8">
            <NewsletterSubscription
              title="Stay in the Loop"
              description="Subscribe to get notified when we publish new articles about fitness technology, web3, and move-to-earn innovations."
              compact={true}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link href="/blog">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </article>
      </main>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            image: post.coverImage,
            author: {
              '@type': 'Person',
              name: post.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Movin',
              logo: {
                '@type': 'ImageObject',
                url: 'https://getmovin.ai/images/logo.png',
              },
            },
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://getmovin.ai/blog/${post.slug}`,
            },
          }),
        }}
      />
      <Toaster />
    </div>
  );
}
