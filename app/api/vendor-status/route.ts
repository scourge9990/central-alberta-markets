import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

// PATCH - Update vendor's own status for a market date
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { reservationId, vendorStatus, notes, email } = body;

    // Get the reservation to verify ownership
    const reservation = await prisma.tableReservation.findUnique({
      where: { id: Number(reservationId) }
    });

    if (!reservation) {
      return NextResponse.json({ success: false, message: 'Reservation not found' }, { status: 404 });
    }

    // Verify email matches
    if (reservation.email !== email) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 403 });
    }

    // Update the status
    const updated = await prisma.tableReservation.update({
      where: { id: Number(reservationId) },
      data: {
        vendorStatus: vendorStatus || 'attending',
        notes: notes || null,
      }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json({ success: false, message: 'Failed to update status' }, { status: 500 });
  }
}

// GET - Get vendor's own reservations
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email required' }, { status: 400 });
    }

    const reservations = await prisma.tableReservation.findMany({
      where: { email },
      orderBy: { date: 'asc' }
    });

    return NextResponse.json({ reservations });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch reservations' }, { status: 500 });
  }
}