import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { compare, hash } from 'bcryptjs';

// GET - Fetch user profile
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: {
        subscription: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword });
  } catch (error: any) {
    console.error('Account fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH - Update user profile
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, name, currentPassword, newPassword } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update data object
    const updateData: any = {};

    // If changing name
    if (name !== undefined) {
      updateData.name = name;
    }

    // If changing password
    if (newPassword !== undefined) {
      if (!currentPassword) {
        return NextResponse.json({ error: 'Current password required' }, { status: 400 });
      }

      // Verify current password (bcrypt or plaintext)
      const isValid = await compare(currentPassword, user.password);
      const isPlaintext = user.password === currentPassword;
      if (!isValid && !isPlaintext) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
      }

      // Validate new password
      if (newPassword.length < 8) {
        return NextResponse.json({ error: 'New password must be at least 8 characters' }, { status: 400 });
      }

      // Hash new password
      updateData.password = await hash(newPassword, 12);
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    // Return user without password
    const { password, ...userWithoutPassword } = updatedUser;
    return NextResponse.json({ user: userWithoutPassword });
  } catch (error: any) {
    console.error('Account update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Delete account
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Delete user (cascades to subscription if exists)
    await prisma.user.delete({
      where: { id: parseInt(userId) }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Account delete error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}