import { prisma } from "@/db";
import { NextResponse } from "next/server";
import { PostType } from "@/models/post-user";

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

export async function PUT(request: Request) {
  try {
    const json = await request.json();

    const obj: PostType = json;

    const user = await prisma.post.update({
      where: {
        id: obj.id,
      },
      data: {
        content: obj.content,
        id: obj.id,
        nickname: obj.nickname,
        password: obj.password,
      },
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
