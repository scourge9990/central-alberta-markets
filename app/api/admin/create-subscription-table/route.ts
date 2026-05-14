import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Create Subscription table if it doesn't exist
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Subscription" (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER UNIQUE NOT NULL,
        "stripeCustomerId" VARCHAR(255) UNIQUE NOT NULL,
        "stripeSubscriptionId" VARCHAR(255) UNIQUE,
        "stripePriceId" VARCHAR(255),
        status VARCHAR(50) NOT NULL,
        "currentPeriodEnd" TIMESTAMP,
        email VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT NOW()
      )
    `;
    
    return NextResponse.json({ success: true, message: 'Subscription table created' });
  } catch (error: any) {
    console.error('Error creating table:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}