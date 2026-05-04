import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

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
      // Verify password
      const storedPassword = Buffer.from(existingUser.password, 'base64').toString();
      if (storedPassword !== password) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
      }
      return NextResponse.json({ 
        user: { id: existingUser.id, email: existingUser.email, name: existingUser.name, role: existingUser.role } 
      });
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        name: name || email.split('@')[0],
        password: passwordHash,
      },
    });

    return NextResponse.json({ 
      user: { id: user.id, email: user.email, name: user.name, role: user.role } 
    });
  } catch (error: any) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}