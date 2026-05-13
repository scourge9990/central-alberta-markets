import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { compare, hash } from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Verify password with bcrypt
    const isValidPassword = await compare(password, user.password);
    
    // Also check plaintext (legacy accounts)
    const isPlaintext = user.password === password;
    
    if (!isValidPassword && !isPlaintext) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Migrate plaintext to bcrypt if needed
    if (isPlaintext) {
      await prisma.user.update({
        where: { email },
        data: { password: await hash(password, 12) }
      });
    }

    return NextResponse.json({ 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role,
        isAdmin: user.role === 'admin',
        isVendor: user.role === 'vendor'
      } 
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}