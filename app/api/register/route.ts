import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { market, date, tableType, vendorName, email, setupNeeds } = body;

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

    return NextResponse.json({ success: true, message: 'Reservation submitted successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}