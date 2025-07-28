import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    const phrases = await prisma.phrase.findMany({
      where: { userId },
      select: {
        id: true,
        phrase: true,
        translation: true,
      },
    })

    return NextResponse.json({ phrases })
  } catch (error) {
    console.error('Erro ao buscar phrase:', error)
    return NextResponse.json({ error: 'Erro interno ao buscar phrase' }, { status: 500 })
  }
  
}