import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";

// ✅ GET ALL USERS
export async function GET(req) {
  const user = getUserFromRequest(req);
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// ✅ UPDATE USER
export async function PUT(req) {
  const authUser = getUserFromRequest(req);
  if (!authUser)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id, name } = await req.json();

  const updated = await prisma.user.update({
    where: { id },
    data: { name },
  });

  return NextResponse.json(updated);
}

// ✅ DELETE USER
export async function DELETE(req) {
  const authUser = getUserFromRequest(req);
  if (!authUser)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();

  await prisma.user.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}