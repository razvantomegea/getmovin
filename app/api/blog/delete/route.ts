import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
    }

    const postsDirectory = path.join(process.cwd(), 'content/blog');
    const filePath = path.join(postsDirectory, `${slug}.md`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Delete the file
    fs.unlinkSync(filePath);

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully!',
      slug: slug,
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post. Please try again.' },
      { status: 500 },
    );
  }
}
