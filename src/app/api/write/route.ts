import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const user = await prisma.post.create({
      data: json,
      select: {
        content: true,
        id: true,
        nickname: true,
        password: true,
      },
    });

    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new NextResponse(e.message, { status: 400 });
  }
}
