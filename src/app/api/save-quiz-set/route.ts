import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { userId, quizName, quizSet } = await req.json()

    if (!userId || !quizName || !Array.isArray(quizSet) || quizSet.length === 0) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
    }

    const createdQuizSet = await prisma.quizSet.create({
      data: {
        name: quizName,
        userId,
      },
    })

    const createdQuizzes = await prisma.quiz.createMany({
      data: quizSet.map((card: any) => ({
        quizSetId: createdQuizSet.id,
        question: card.question,
        answer: card.answer,
        optionA: card.optionA,
        optionB: card.optionB,
        optionC: card.optionC,
        optionD: card.optionD,
      })),
    })

    return NextResponse.json({ quizSetId: createdQuizSet.id, createdQuizzes }, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar quizSet e quizzes:', error)
    return NextResponse.json({ error: 'Erro interno ao salvar' }, { status: 500 })
  }
}