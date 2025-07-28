import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  const { phrase, translation, userId } = await req.json();
  
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }
  
    try {
      const newPhrase = await prisma.phrase.create({
        data: {
          phrase: phrase,
          translation: translation,
          userId: userId
        }
      });
  
      return NextResponse.json(newPhrase, { status: 201 });
    } catch (error) {
      console.error("Error creating phrase:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}