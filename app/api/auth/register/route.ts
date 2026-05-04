import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory user storage (replace with database in production)
const users: Map<string, { id: number; email: string; name: string; password: string; role: string }> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const existingUser = users.get(email);

    if (existingUser) {
      // Verify password
      if (existingUser.password !== password) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
      }
      return NextResponse.json({ 
        user: { id: existingUser.id, email: existingUser.email, name: existingUser.name, role: existingUser.role } 
      });
    }

    // Create new user
    const userId = users.size + 1;
    const user = { id: userId, email, name: name || email.split('@')[0], password, role: 'user' };
    users.set(email, user);

    return NextResponse.json({ 
      user: { id: user.id, email: user.email, name: user.name, role: user.role } 
    });
  } catch (error: any) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}