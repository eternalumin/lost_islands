import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const islands = await prisma.islands.findMany({
      include: {
        discoveries: true,
        media: true,
        reference: true,
      },
    });

    return NextResponse.json(islands);
  } catch (error) {
    console.error('Error fetching island data:', error);
    return NextResponse.json({ error: 'Failed to fetch islands' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
