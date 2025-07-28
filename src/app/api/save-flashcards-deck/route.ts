import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { userId, deckName, flashcards } = await req.json()

    if (!userId || !deckName || !Array.isArray(flashcards) || flashcards.length === 0) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
    }

    // 1. Cria o deck
    const deck = await prisma.deck.create({
      data: {
        name: deckName,
        userId,
      },
    })

    // 2. Cria os flashcards com o deckId recém-criado
    const created = await prisma.flashcard.createMany({
      data: flashcards.map((card: any) => ({
        question: card.question,
        answer: card.answer,
        stats: card.stats || '',
        deckId: deck.id,
      })),
    })

    return NextResponse.json({ deckId: deck.id, created }, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar deck e flashcards:', error)
    return NextResponse.json({ error: 'Erro interno ao salvar' }, { status: 500 })
  }
}