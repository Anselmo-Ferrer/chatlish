import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    const overview = await prisma.overview.findUnique({
      where: { userId },
      select: {
        englishLevel: true,
        strengths: true,
        weaknesses: true
      }
    })

    return NextResponse.json({ overview })
  } catch (error) {
    console.error('Erro ao buscar overview:', error)
    return NextResponse.json({ error: 'Erro interno ao buscar resumos' }, { status: 500 })
  }
}