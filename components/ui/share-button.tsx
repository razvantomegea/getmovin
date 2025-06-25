'use client';

import { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Link, Check, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

interface ShareButtonProps {
  title: string;
  description?: string;
  url?: string;
  hashtags?: string[];
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

export function ShareButton({
  title,
  description = '',
  url,
  hashtags = [],
  className = '',
  size = 'sm',
  variant = 'outline',
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  // Use current URL if not provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const shareText = description || title;
  const hashtagText = hashtags.length > 0 ? hashtags.map((tag) => `#${tag}`).join(' ') : '';

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        });

        toast({
          title: 'Shared successfully!',
          description: 'Content has been shared.',
        });
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed:', error);
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      toast({
        title: 'Link copied!',
        description: 'The link has been copied to your clipboard.',
      });
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast({
        title: 'Failed to copy',
        description: 'Please try again or copy the URL manually.',
        variant: 'destructive',
      });
    }
  };

  const handleTwitterShare = () => {
    const tweetText = `${shareText} ${hashtagText}`.trim();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText,
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl,
    )}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl,
    )}`;
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppShare = () => {
    const whatsappText = `${shareText}\n\n${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Check if native sharing is available
  const hasNativeShare = typeof navigator !== 'undefined' && navigator.share;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={`gap-2 ${className}`}>
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {hasNativeShare && (
          <DropdownMenuItem onClick={handleNativeShare} className="gap-2">
            <Share2 className="h-4 w-4" />
            Share via...
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={handleTwitterShare} className="gap-2">
          <Twitter className="h-4 w-4" />
          Share on Twitter
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleFacebookShare} className="gap-2">
          <Facebook className="h-4 w-4" />
          Share on Facebook
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleLinkedInShare} className="gap-2">
          <Linkedin className="h-4 w-4" />
          Share on LinkedIn
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleWhatsAppShare} className="gap-2">
          <MessageCircle className="h-4 w-4" />
          Share on WhatsApp
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleCopyLink} className="gap-2">
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-600" />
              Copied!
            </>
          ) : (
            <>
              <Link className="h-4 w-4" />
              Copy Link
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
