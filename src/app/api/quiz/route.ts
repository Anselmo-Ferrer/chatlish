import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const quizSetId = searchParams.get("quizSetId");

  if (!quizSetId) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
  }

  try {
    const quiz = await prisma.quiz.findMany({
      where: { quizSetId },
      select: {
        id: true,
        quizSetId: true,
        question: true,
        answer: true,
        optionA: true,
        optionB: true,
        optionC: true,
        optionD: true,
      },
    })

    return NextResponse.json({ quiz })
  } catch (error) {
    console.error('Erro ao buscar resumos:', error)
    return NextResponse.json({ error: 'Erro interno ao buscar resumos' }, { status: 500 })
  }

}