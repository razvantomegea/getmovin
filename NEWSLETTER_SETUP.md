# Newsletter Subscription Setup Guide

This guide explains how to set up the newsletter subscription feature using Mailchimp.

## Prerequisites

1. A Mailchimp account
2. An audience (list) created in Mailchimp

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Mailchimp Configuration
MAILCHIMP_API_KEY=your_mailchimp_api_key_here
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_AUDIENCE_ID=your_audience_id_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Getting Your Mailchimp Credentials

### 1. API Key

1. Log in to your Mailchimp account
2. Go to Account > Extras > API Keys
3. Create a new API key or use an existing one
4. Copy the API key to your `.env.local` file

### 2. Server Prefix

The server prefix is part of your API key. For example, if your API key ends with `-us1`, your server prefix is `us1`.

### 3. Audience ID

1. Go to Audience > All contacts
2. Click on your audience name
3. Go to Settings > Audience name and defaults
4. Copy the Audience ID

## Features

### Newsletter Subscription Component

- **Location**: `components/ui/newsletter-subscription.tsx`
- **Two variants**: Full card and compact inline form
- **Features**:
  - Email validation
  - Loading states
  - Success/error handling
  - Toast notifications
  - Responsive design

### API Endpoint

- **Location**: `app/api/newsletter/subscribe/route.ts`
- **Method**: POST
- **Features**:
  - Email validation
  - Duplicate email handling
  - Error handling for Mailchimp API
  - Proper HTTP status codes

### Integration Points

- **Blog listing page**: Full newsletter subscription card
- **Individual blog posts**: Compact subscription form
- **Future**: Can be added to homepage, footer, or any other page

## Customization

### Styling

The component uses Tailwind CSS and follows the existing design system with:

- Primary color: `#0095ff`
- Gradient backgrounds
- Consistent spacing and typography

### Content

You can customize the newsletter subscription content by passing props:

- `title`: Subscription form title
- `description`: Description text
- `compact`: Boolean for compact vs full card layout
- `className`: Additional CSS classes

### Mailchimp Tags

Subscribers are automatically tagged with `blog-subscriber` and include metadata:

- `SIGNUP`: "Website Blog"
- `OPTIN_TIME`: Timestamp of subscription

## Testing

### Development Mode (No Mailchimp Required)

1. Start your development server: `npm run dev`
2. Navigate to `/blog` or any blog post
3. Try subscribing with a test email
4. You'll see a success message and the subscription will be logged to the console
5. No actual Mailchimp API calls are made in development mode

### Production Mode (Requires Mailchimp)

1. Set up your environment variables in `.env.local`
2. Start your development server: `npm run dev`
3. Navigate to `/blog` or any blog post
4. Try subscribing with a test email
5. Check your Mailchimp audience for new subscribers

### API Testing

You can test the API directly using curl:

```bash
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Production Deployment

Make sure to:

1. Set environment variables in your production environment
2. Test the subscription flow in production
3. Monitor Mailchimp for new subscribers
4. Set up email campaigns for your subscribers

## Troubleshooting

### Common Issues

1. **"Newsletter service is not configured properly"**: Check your environment variables
2. **"This email is already subscribed"**: User already exists in your audience
3. **"Please provide a valid email address"**: Mailchimp rejected the email format

### Debug Mode

Check the browser console and server logs for detailed error messages from the Mailchimp API.
