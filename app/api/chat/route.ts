import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

// POST - Send message
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, message } = body;

    if (!email || !name || !message) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    try {
      await prisma.chatMessage.create({
        data: {
          email,
          name,
          message,
        }
      });
      return NextResponse.json({ success: true });
    } catch (e) {
      console.error('Chat save error:', e);
      return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
    }
  } catch (error) {
    console.error('Chat POST error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

// GET - Recent messages
export async function GET() {
  try {
    let messages: any[] = [];
    try {
      messages = await prisma.chatMessage.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10
      });
    } catch (e) {
      console.error('Chat fetch error:', e);
    }
    return NextResponse.json({ messages: messages.reverse() });
  } catch (error) {
    console.error('Chat GET error:', error);
    return NextResponse.json({ messages: [] });
  }
}