import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const deckId = searchParams.get("deckId");

  if (!deckId) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
  }

  try {
    const flashcards = await prisma.flashcard.findMany({
      where: { deckId },
      select: {
        id: true,
        deckId: true,
        question: true,
        answer: true,
        stats: true
      },
    })

    return NextResponse.json({ flashcards })
  } catch (error) {
    console.error('Erro ao buscar resumos:', error)
    return NextResponse.json({ error: 'Erro interno ao buscar resumos' }, { status: 500 })
  }

}