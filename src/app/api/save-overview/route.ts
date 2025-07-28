import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, level, strengths, weaknesses } = await req.json();

  if (!userId || !level || !strengths || !weaknesses) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const existingOverview = await prisma.overview.findFirst({
      where: { userId },
    });

    let overview;

    if (existingOverview) {
      overview = await prisma.overview.update({
        where: { id: existingOverview.id },
        data: {
          englishLevel: level,
          strengths,
          weaknesses,
        },
      });
    } else {
      overview = await prisma.overview.create({
        data: {
          userId,
          englishLevel: level,
          strengths,
          weaknesses,
        },
      });
    }

    return NextResponse.json(overview, { status: 201 });
  } catch (error) {
    console.error("Error saving overview:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}