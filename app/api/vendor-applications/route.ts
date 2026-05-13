import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET - Fetch ALL vendor applications (for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    const applications = await prisma.vendorApplication.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

// PATCH - Approve vendor application
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;
    
    const application = await prisma.vendorApplication.update({
      where: { id },
      data: { status: 'approved' }
    });
    
    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to approve application' }, { status: 500 });
  }
}

// DELETE - Reject/delete vendor application
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '0');
    
    await prisma.vendorApplication.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}