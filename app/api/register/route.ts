import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { market, date, tableType, vendorName, email, setupNeeds } = body;

    // Map market name to ID
    const marketMap: Record<string, number> = {
      'Saturday Morning Market - Red Deer': 1,
      'Sunday Farmers Market - Lacombe': 2,
      'Wednesday Night Market - Ponoka': 3,
      'Friday Market - Wetaskiwin': 4
    };

    const marketId = marketMap[market] || 1;
    const tableTypeMap: Record<string, string> = {
      'Single Table ($25)': 'single',
      'Double Table ($45)': 'double',
      '10x10 Booth ($75)': 'booth10',
      '20x20 Booth ($150)': 'booth20'
    };

    // Save to database
    const reservation = await prisma.tableReservation.create({
      data: {
        marketId,
        date,
        tableType: tableTypeMap[tableType] || tableType,
        vendorName,
        email,
        requirements: setupNeeds || null,
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
        subject: `New Table Reservation: ${vendorName} - ${market}`,
        html: `
          <h2>New Table Reservation</h2>
          <p><strong>Market:</strong> ${market}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Table Type:</strong> ${tableType}</p>
          <p><strong>Vendor Name:</strong> ${vendorName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Setup Needs:</strong> ${setupNeeds || 'None'}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    return NextResponse.json({ success: true, message: 'Reservation submitted successfully!' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit reservation' }, { status: 500 });
  }
}