'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, X, Eye } from 'lucide-react';
import Link from 'next/link';

export default function BlogAdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    author: 'Movin Team',
    tags: [] as string[],
    featured: false,
    coverImage: '',
  });

  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/blog/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create blog post');
      }

      toast({
        title: 'Blog post created successfully!',
        description: `Your post "${formData.title}" has been created and is now live on the blog.`,
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        content: '',
        author: 'Movin Team',
        tags: [],
        featured: false,
        coverImage: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to create blog post. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#0095ff] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <Link href="/admin/blog/manage">
            <Button variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              Manage Posts
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Blog Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter blog post title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Author name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the blog post"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL (optional)</Label>
                <Input
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleInputChange}
                  placeholder="/images/your-image.png"
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="featured">Featured Post</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown)</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your blog post content in Markdown format..."
                  rows={20}
                  required
                  className="font-mono text-sm"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0095ff] hover:bg-[#0080e0]"
              >
                {loading ? 'Creating...' : 'Create Blog Post'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">How to add a new blog post:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Fill out the form above with your blog post details</li>
                <li>Write your content in Markdown format</li>
                <li>Click "Create Blog Post" to automatically create the markdown file</li>
                <li>The blog post will immediately appear on the blog page</li>
                <li>The markdown file will be saved in the `content/blog/` directory</li>
              </ol>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Markdown Tips:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Use # for headings (# H1, ## H2, ### H3)</li>
                <li>Use **bold** for bold text</li>
                <li>Use *italic* for italic text</li>
                <li>Use - or * for bullet points</li>
                <li>Use [link text](URL) for links</li>
                <li>Use `code` for inline code</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
