import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, desc, userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const newChat = await prisma.chat.create({
      data: {
        name: name,
        description: desc,
        userId: userId
      }
    });

    return NextResponse.json(newChat, { status: 201 });
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}