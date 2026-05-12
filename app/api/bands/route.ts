import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

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
