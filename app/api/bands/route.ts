import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function GET() {
  try {
    // Try to fetch from database
    let bands: any[] = [];
    try {
      bands = await prisma.$queryRaw`SELECT * FROM "Band" ORDER BY "createdAt" DESC`;
    } catch (dbError) {
      // Database not available, return empty
      console.log('Database fetch failed');
    }
    return NextResponse.json(bands);
  } catch (error) {
    console.error('Bands fetch error:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const { bandName, contactName, email, phone, genre, description, fee, markets } = await request.json();

    if (!bandName || !contactName || !email || !genre || !description) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Try to save to database
    let dbSuccess = false;
    try {
      await prisma.$executeRaw`
        INSERT INTO "Band" ("bandName", "contactName", email, phone, genre, description, fee, markets, status, "createdAt", "updatedAt")
        VALUES (${bandName}, ${contactName}, ${email}, ${phone}, ${genre}, ${description}, ${fee}, ${markets?.join(', ') || 'All markets'}, 'pending', NOW(), NOW())
      `;
      dbSuccess = true;
    } catch (dbError) {
      console.log('Database save failed:', dbError);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted! We\'ll be in touch.'
    });
  } catch (error) {
    console.error('Bands submission error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit application' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');

    if (!id && !email) {
      return NextResponse.json({ error: 'ID or email required' }, { status: 400 });
    }

    try {
      if (id) {
        await prisma.$executeRaw`DELETE FROM "Band" WHERE id = ${parseInt(id)}`;
      } else {
        await prisma.$executeRaw`DELETE FROM "Band" WHERE email = ${email}`;
      }
      return NextResponse.json({ success: true });
    } catch (dbError) {
      console.log('Delete failed:', dbError);
      return NextResponse.json({ success: false }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
