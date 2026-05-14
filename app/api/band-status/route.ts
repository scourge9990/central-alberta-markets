import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

// PATCH - Update band's own status
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { bandId, bandStatus, notes, email } = body;

    // Get the band to verify ownership
    let band: any;
    try {
      band = await prisma.$queryRaw`SELECT * FROM "Band" WHERE id = ${Number(bandId)} LIMIT 1`;
      band = band[0];
    } catch {
      return NextResponse.json({ success: false, message: 'Band not found' }, { status: 404 });
    }

    if (!band) {
      return NextResponse.json({ success: false, message: 'Band not found' }, { status: 404 });
    }

    // Verify email matches
    if (band.email !== email) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 403 });
    }

    // Update the status
    try {
      await prisma.$executeRaw`
        UPDATE "Band" 
        SET "bandStatus" = ${bandStatus || 'available'}, notes = ${notes || null}, "updatedAt" = NOW()
        WHERE id = ${Number(bandId)}
      `;
    } catch (dbError) {
      console.log('Update failed:', dbError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating band status:', error);
    return NextResponse.json({ success: false, message: 'Failed to update status' }, { status: 500 });
  }
}

// GET - Get bands (by email for logged in user, or all for admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get('all');
    const email = searchParams.get('email');
    
    let bands: any[] = [];
    try {
      if (email) {
        // Get user's own bands
        bands = await prisma.$queryRaw`SELECT * FROM "Band" WHERE email = ${email} ORDER BY "createdAt" DESC`;
      } else if (showAll === 'true') {
        bands = await prisma.$queryRaw`SELECT * FROM "Band" ORDER BY "createdAt" DESC`;
      } else {
        bands = await prisma.$queryRaw`SELECT * FROM "Band" WHERE status = 'approved' ORDER BY "createdAt" DESC`;
      }
    } catch (dbError) {
      console.log('Fetch failed:', dbError);
    }

    return NextResponse.json({ bands });
  } catch (error) {
    console.error('Error fetching bands:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch bands' }, { status: 500 });
  }
}