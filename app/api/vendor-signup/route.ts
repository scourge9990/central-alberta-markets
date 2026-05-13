import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '../../lib/prisma';

// GET - Fetch approved vendors by market name
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const market = searchParams.get('market');
    
    let where = {};
    if (market) {
      const markets = JSON.parse(market);
      where = { status: 'approved', markets: { contains: markets[0] } };
    } else {
      where = { status: 'approved' };
    }
    
    const vendors = await prisma.vendorApplication.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json({ vendors });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ vendors: [] }, { status: 200 });
  }
}

// POST - Submit new vendor application
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessName, contactName, email, phone, products, markets } = body;

    // Save to database
    const application = await prisma.vendorApplication.create({
      data: {
        businessName,
        contactName,
        email,
        phone: phone || null,
        description: products || null,
        markets: markets ? JSON.stringify(markets) : null,
        status: 'pending'
      }
    });

    // Also send email notification
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'centralalbertaafterdarkads@gmail.com',
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: 'centralalbertaafterdarkads@gmail.com',
        to: 'centralalbertaafterdarkads@gmail.com',
        subject: `New Vendor Application: ${businessName}`,
        html: `
          <h2>New Vendor Application</h2>
          <p><strong>Business Name:</strong> ${businessName}</p>
          <p><strong>Contact Name:</strong> ${contactName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Products:</strong> ${products}</p>
          <p><strong>Markets Interested:</strong> ${markets?.join(', ') || 'Not specified'}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    return NextResponse.json({ success: true, message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit application' }, { status: 500 });
  }
}
