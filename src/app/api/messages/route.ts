import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const chatId = searchParams.get('chatId');

  if (!chatId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    const messages = await prisma.message.findMany({
      where: { chatId },
      select: {
        message: true,
        role: true,
        timeStamp: true
      }
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error('Erro ao buscar resumos:', error)
    return NextResponse.json({ error: 'Erro interno ao buscar resumos' }, { status: 500 })
  }
}