import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PostUser } from "@/models/post-user";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  if (!query) {
    return NextResponse.json({ error: "No query provided" }, { status: 400 });
  }

  const response = await prisma.post.findFirst({
    where: {
      password: query,
    },
    select: {
      nickname: true,
      password: true,
      id: true,
    },
  });

  if (!response) {
    return NextResponse.json({ error: "Doesn't exist!" }, { status: 400 });
  }

  return NextResponse.json(response);
}
