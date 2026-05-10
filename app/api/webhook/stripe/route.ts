import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET for Stripe connection test
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    status: 'Stripe webhook endpoint active',
    message: 'Add STRIPE_WEBHOOK_SECRET env var'
  });
}

// POST to handle Stripe webhooks
export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    return NextResponse.json(
      { error: 'STRIPE_WEBHOOK_SECRET not configured' },
      { status: 200 } // Return 200 so Stripe doesn't keep retrying
    );
  }
  
  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json(
      { error: 'No stripe-signature header' },
      { status: 400 }
    );
  }
  
  // Full webhook processing would go here
  return NextResponse.json({ received: true });
}