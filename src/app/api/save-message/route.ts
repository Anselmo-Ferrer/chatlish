import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message, role, chatId } = await req.json();

  if (!message || !role || !chatId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const newMessage = await prisma.message.create({
      data: {
        message,
        role,
        chatId,
        timeStamp: new Date()
      }
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}