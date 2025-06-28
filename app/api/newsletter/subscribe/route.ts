import { NextRequest, NextResponse } from 'next/server';

// Dynamic import to avoid initialization errors
let mailchimp: any = null;

async function getMailchimpClient() {
  if (!mailchimp) {
    const mailchimpModule = await import('@mailchimp/mailchimp_marketing');
    mailchimp = mailchimpModule.default;

    // Only configure if environment variables are available
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_SERVER_PREFIX) {
      mailchimp.setConfig({
        apiKey: process.env.MAILCHIMP_API_KEY,
        server: process.env.MAILCHIMP_SERVER_PREFIX,
      });
    }
  }
  return mailchimp;
}

// Helper function to validate email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Input validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // Check if Mailchimp is configured
    if (
      !process.env.MAILCHIMP_API_KEY ||
      !process.env.MAILCHIMP_SERVER_PREFIX ||
      !process.env.MAILCHIMP_AUDIENCE_ID
    ) {
      console.warn(
        'Mailchimp configuration missing. Environment variables required: MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, MAILCHIMP_AUDIENCE_ID',
      );

      // For development, return a success message without actually subscribing
      if (process.env.NODE_ENV === 'development') {
        console.log(`[DEV MODE] Would subscribe email: ${email}`);
        return NextResponse.json({
          success: true,
          message: 'Development mode: Subscription logged successfully!',
          id: 'dev-' + Date.now(),
        });
      }

      return NextResponse.json(
        { error: 'Newsletter service is temporarily unavailable. Please try again later.' },
        { status: 503 },
      );
    }

    // Get Mailchimp client
    const mailchimpClient = await getMailchimpClient();

    // Add subscriber to Mailchimp audience
    const response = await mailchimpClient.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        SIGNUP: 'Website Blog',
        OPTIN_TIME: new Date().toISOString(),
        SOURCE: 'Movin Website',
      },
      tags: ['blog-subscriber', 'website-signup'],
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      id: response.id,
    });
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);

    // Handle specific Mailchimp errors
    if (error.status === 400 && error.response?.body) {
      const errorDetail = error.response.body.detail || error.message;

      if (errorDetail.includes('already a list member')) {
        return NextResponse.json(
          { error: 'This email is already subscribed to our newsletter.' },
          { status: 400 },
        );
      }

      if (errorDetail.includes('fake email') || errorDetail.includes('invalid email')) {
        return NextResponse.json(
          { error: 'Please provide a valid email address.' },
          { status: 400 },
        );
      }

      if (errorDetail.includes('too many recent signup requests')) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again in a few minutes.' },
          { status: 429 },
        );
      }
    }

    // Handle rate limiting
    if (error.status === 429) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429 },
      );
    }

    // Handle authentication errors
    if (error.status === 401) {
      console.error('Mailchimp API authentication failed. Check your API key.');
      return NextResponse.json(
        { error: 'Newsletter service configuration error.' },
        { status: 500 },
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Newsletter subscription endpoint. Use POST to subscribe.' },
    { status: 200 },
  );
}
