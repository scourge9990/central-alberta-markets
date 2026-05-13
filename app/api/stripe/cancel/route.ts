import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Get user's subscription
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: { subscription: true }
    });

    if (!user?.subscription?.stripeSubscriptionId) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
    }

    // Cancel via Stripe
    await stripe.subscriptions.cancel(user.subscription.stripeSubscriptionId);

    // Update local DB
    await prisma.subscription.delete({
      where: { userId: parseInt(userId) }
    });

    return NextResponse.json({ success: true, message: 'Subscription cancelled' });
  } catch (error: any) {
    console.error('Cancel error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}