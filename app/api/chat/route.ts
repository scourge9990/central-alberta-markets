import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

// POST - Send message
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, message } = body;

    if (!email || !name || !message) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    try {
      await prisma.$executeRaw`
        INSERT INTO "ChatMessage" (email, name, message, "createdAt")
        VALUES (${email}, ${name}, ${message}, NOW())
      `;
    } catch (e) {
      console.log('Chat save:', e);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// GET - Recent messages
export async function GET() {
  try {
    let messages: any[] = [];
    try {
      messages = await prisma.$queryRaw`
        SELECT * FROM "ChatMessage" ORDER BY "createdAt" DESC LIMIT 10
      `;
    } catch (e) {
      console.log('Chat fetch:', e);
    }
    return NextResponse.json({ messages: messages.reverse() });
  } catch (error) {
    return NextResponse.json({ messages: [] });
  }
}