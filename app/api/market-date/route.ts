import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

// POST - Create or update market date status
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { marketId, date, status, newTime, newDate, notes, email } = body;

    // Upsert the market date
    const marketDate = await prisma.marketDate.upsert({
      where: {
        marketId_date: {
          marketId: Number(marketId),
          date: date
        }
      },
      update: {
        status,
        newTime: newTime || null,
        newDate: newDate || null,
        notes: notes || null,
        updatedBy: email || null,
      },
      create: {
        marketId: Number(marketId),
        date,
        status,
        newTime: newTime || null,
        newDate: newDate || null,
        notes: notes || null,
        updatedBy: email || null,
      }
    });

    return NextResponse.json({ success: true, data: marketDate });
  } catch (error) {
    console.error('Error updating market date:', error);
    return NextResponse.json({ success: false, message: 'Failed to update market date' }, { status: 500 });
  }
}

// GET - Get market dates status
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const marketId = searchParams.get('marketId');

    const where = marketId ? { marketId: Number(marketId) } : {};
    
    // Also get dates that are NOT cancelled for displaying
    const dates = await prisma.marketDate.findMany({
      where,
      orderBy: { date: 'asc' }
    });

    return NextResponse.json({ dates });
  } catch (error) {
    console.error('Error fetching market dates:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch market dates' }, { status: 500 });
  }
}