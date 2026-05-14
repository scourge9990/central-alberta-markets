import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Auto-create Subscription table if it doesn't exist
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Subscription" (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL,
        "stripeCustomerId" VARCHAR(255) NOT NULL,
        "stripeSubscriptionId" VARCHAR(255),
        "stripePriceId" VARCHAR(255),
        status VARCHAR(50) NOT NULL,
        "currentPeriodEnd" TIMESTAMP,
        email VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT NOW(),
        CONSTRAINT "Subscription_userId_key" UNIQUE ("userId")
      )
    `.catch(() => {});
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}