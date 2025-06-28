'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Loader2, CheckCircle } from 'lucide-react';

interface NewsletterSubscriptionProps {
  title?: string;
  description?: string;
  className?: string;
  compact?: boolean;
}

export function NewsletterSubscription({
  title = 'Stay Updated',
  description = 'Subscribe to our newsletter for the latest insights on fitness technology, web3, and move-to-earn innovations.',
  className = '',
  compact = false,
}: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
        toast({
          title: 'Successfully Subscribed!',
          description:
            "Thank you for subscribing to our newsletter. You'll receive updates about our latest blog posts and product news.",
        });
      } else {
        toast({
          title: 'Subscription Failed',
          description: data.error || 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: 'Network Error',
        description: 'Unable to connect. Please check your internet connection and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (compact) {
    return (
      <div
        className={`border rounded-lg p-4 bg-gradient-to-r from-[#0095ff]/5 to-[#00d4ff]/5 ${className}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Mail className="h-5 w-5 text-[#0095ff]" />
          <h3 className="font-semibold">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>

        {isSubscribed ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">You're subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={isLoading}
              size="sm"
              className="bg-[#0095ff] hover:bg-[#0095ff]/90"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Subscribe'}
            </Button>
          </form>
        )}
      </div>
    );
  }

  return (
    <Card
      className={`bg-gradient-to-br from-[#0095ff]/5 to-[#00d4ff]/5 border-[#0095ff]/20 ${className}`}
    >
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-[#0095ff] rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isSubscribed ? (
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">You're all set!</h3>
            <p className="text-muted-foreground">
              Thank you for subscribing. Check your email for a confirmation message.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#0095ff] hover:bg-[#0095ff]/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Subscribe to Newsletter
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
