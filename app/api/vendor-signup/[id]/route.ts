import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function PATCH(request: NextRequest) {
  try {
    const id = parseInt(request.url.split('/').pop() || '0');
    
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

export async function DELETE(request: NextRequest) {
  try {
    const id = parseInt(request.url.split('/').pop() || '0');
    
    await prisma.vendorApplication.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to reject application' }, { status: 500 });
  }
}