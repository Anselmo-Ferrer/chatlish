import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const flashcardDecks = await prisma.deck.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json({ flashcardDecks });
  } catch (error) {
    console.error("Erro ao buscar resumos:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar resumos" },
      { status: 500 }
    );
  }
}