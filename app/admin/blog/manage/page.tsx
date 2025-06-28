'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Trash2, Edit, Eye, Plus } from 'lucide-react';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  readTime: number;
  tags: string[];
  featured: boolean;
  coverImage?: string;
}

export default function BlogManagePage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load blog posts.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    setDeletingSlug(slug);
    try {
      const response = await fetch(`/api/blog/delete?slug=${slug}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete blog post');
      }

      toast({
        title: 'Blog post deleted',
        description: 'The blog post has been successfully deleted.',
      });

      // Refresh the posts list
      loadBlogPosts();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete blog post.',
        variant: 'destructive',
      });
    } finally {
      setDeletingSlug(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0095ff]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#0095ff] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <Link href="/admin/blog">
            <Button className="bg-[#0095ff] hover:bg-[#0080e0] gap-2">
              <Plus className="h-4 w-4" />
              Create New Post
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Manage Blog Posts</h1>
          <p className="text-muted-foreground">View, edit, and delete your blog posts</p>
        </div>

        {posts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No blog posts found</h3>
              <p className="text-muted-foreground mb-4">
                Get started by creating your first blog post.
              </p>
              <Link href="/admin/blog">
                <Button className="bg-[#0095ff] hover:bg-[#0080e0]">Create Your First Post</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {post.featured && (
                          <Badge variant="default" className="bg-[#0095ff] hover:bg-[#0080e0]">
                            Featured
                          </Badge>
                        )}
                        <Badge variant="outline">{formatDate(post.publishedAt)}</Badge>
                        <Badge variant="secondary">{post.readTime} min read</Badge>
                      </div>
                      <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                      <p className="text-muted-foreground text-sm mb-3">{post.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <span>By {post.author}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                            disabled={deletingSlug === post.slug}
                          >
                            <Trash2 className="h-4 w-4" />
                            {deletingSlug === post.slug ? 'Deleting...' : 'Delete'}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the blog post "{post.title}". This action
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(post.slug)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete Post
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
