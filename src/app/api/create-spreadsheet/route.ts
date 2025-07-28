import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  const { word, translation, userId } = await req.json();
  
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }
  
    try {
      const newSpreadSheet = await prisma.spreadsheet.create({
        data: {
          word: word,
          translation: translation,
          userId: userId
        }
      });
  
      return NextResponse.json(newSpreadSheet, { status: 201 });
    } catch (error) {
      console.error("Error creating spreadsheet:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}