import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessName, contactName, email, phone, products, markets } = body;

    // Create transporter using Gmail app password
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

    return NextResponse.json({ success: true, message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}