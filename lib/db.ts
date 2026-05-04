// Supabase/PostgreSQL client
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Get markets with their items
export async function getMarkets() {
  return prisma.market.findMany({
    where: { isActive: true },
    include: { vendors: { where: { active: true } }, items: { where: { available: true } } },
    orderBy: { name: 'asc' },
  });
}

// Get single market
export async function getMarket(slug: string) {
  return prisma.market.findUnique({
    where: { slug },
    include: { vendors: true, items: true },
  });
}

// Get vendor's items for today
export async function getVendorItems(vendorId: number) {
  return prisma.marketItem.findMany({
    where: { vendorId, available: true },
    orderBy: { name: 'asc' },
  });
}

// Update vendor's available items (for vendor dashboard)
export async function updateVendorItems(vendorId: number, items: { name: string; category?: string; price?: string; unit?: string }[]) {
  // First, mark all current items as unavailable
  await prisma.marketItem.updateMany({
    where: { vendorId },
    data: { available: false },
  });

  // Then create/update items
  for (const item of items) {
    await prisma.marketItem.upsert({
      where: { id: 0 }, // will create if not exists
      create: { vendorId, name: item.name, category: item.category, price: item.price, unit: item.unit },
      update: { name: item.name, category: item.category, price: item.price, unit: item.unit, available: true },
    });
  }
}

// Get weekly "What's Fresh"
export async function getWhatsFresh() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  return prisma.whatsFresh.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });
}

// User subscriptions
export async function getUserAlerts(userId: number) {
  return prisma.alert.findMany({ where: { userId, active: true } });
}

export async function addAlert(userId: number, keyword: string) {
  return prisma.alert.create({ data: { userId, keyword } });
}

export async function removeAlert(alertId: number) {
  return prisma.alert.update({ where: { id: alertId }, data: { active: false } });
}