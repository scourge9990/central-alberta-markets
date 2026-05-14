import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, email, stripeSubscriptionId, status } = body;

    if (!userId || !email) {
      return NextResponse.json({ error: 'userId and email required' }, { status: 400 });
    }

    // Create or update subscription
    const subscription = await prisma.subscription.upsert({
      where: { userId },
      update: {
        status: status || 'active',
        stripeSubscriptionId,
      },
      create: {
        userId,
        email,
        stripeCustomerId: `cus_${userId}`,
        stripeSubscriptionId: stripeSubscriptionId || '',
        stripePriceId: '',
        status: status || 'active',
      },
    });

    return NextResponse.json({ subscription });
  } catch (error: any) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}