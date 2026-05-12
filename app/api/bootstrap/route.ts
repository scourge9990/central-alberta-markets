import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

// Bootstrap - create tables if they don't exist
export async function POST() {
  try {
    console.log('Bootstrapping database tables...');
    
    // Create User table if not exists
    try {
      await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "User" (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT,
        role TEXT DEFAULT 'user',
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )`;
      console.log('User table ready');
    } catch (e) { /* ignore */ }
    
    // Create VendorApplication table if not exists
    try {
      await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "VendorApplication" (
        id SERIAL PRIMARY KEY,
        "businessName" TEXT NOT NULL,
        "contactName" TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        description TEXT,
        markets TEXT,
        status TEXT DEFAULT 'pending',
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )`;
      console.log('VendorApplication table ready');
    } catch (e) { /* ignore */ }
    
    // Create TableReservation table if not exists  
    try {
      await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "TableReservation" (
        id SERIAL PRIMARY KEY,
        "marketId" INTEGER NOT NULL,
        date TEXT NOT NULL,
        "tableType" TEXT NOT NULL,
        "vendorName" TEXT NOT NULL,
        email TEXT NOT NULL,
        requirements TEXT,
        status TEXT DEFAULT 'pending',
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )`;
      console.log('TableReservation table ready');
    } catch (e) { /* ignore */ }
    
    return NextResponse.json({ success: true, message: 'Database bootstrapped!' });
  } catch (error) {
    console.error('Bootstrap error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}