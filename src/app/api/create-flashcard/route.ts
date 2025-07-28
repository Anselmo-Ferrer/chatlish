import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { deckId, question, answer } = await req.json();

  if (!deckId || !deckId || !answer) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const createFlashcard = await prisma.flashcard.create({
      data: {
        deckId,
        question,
        stats: '',
        answer,
      },
    });

    return NextResponse.json(createFlashcard, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating flashcard' }, { status: 500 });
  }
}