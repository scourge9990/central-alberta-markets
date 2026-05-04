import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, username } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // Simple hash for demo (use bcrypt in production)
    const passwordHash = Buffer.from(password).toString('base64');

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (Buffer.from(existingUser.passwordHash, 'base64').toString() !== password) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
      }
      return NextResponse.json({ 
        user: { id: existingUser.id, email: existingUser.email, username: existingUser.username, isVendor: existingUser.isVendor, isAdmin: existingUser.isAdmin } 
      });
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        username: username || email.split('@')[0],
        passwordHash,
      },
    });

    return NextResponse.json({ 
      user: { id: user.id, email: user.email, username: user.username, isVendor: user.isVendor, isAdmin: user.isAdmin } 
    });
  } catch (error: any) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}