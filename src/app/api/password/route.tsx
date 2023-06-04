import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  // TODO Make sure to make a query in the database
  // But make sure if the it doesn't exist, then return an error
  // If not then send a response.
  const response = await prisma.post.findMany({
    where: {
      password: query ? query : "",
    },
  });

  console.log(query);
}
