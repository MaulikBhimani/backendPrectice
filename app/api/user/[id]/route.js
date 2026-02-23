import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req, { params }) {
  const authUser = getUserFromRequest(req);
  if (!authUser)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json(user);
}