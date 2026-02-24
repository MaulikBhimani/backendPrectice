import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { authorize } from "@/lib/rbac";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await getUser(req);

  try { authorize(user, "USER", "MANAGER"); }
  catch (e) { return NextResponse.json({ message: e.message }, { status: e.status }); }

  const { title, description, priority } = await req.json();

  if (title.length < 5 || description.length < 10)
    return NextResponse.json({ message: "Validation failed" }, { status: 400 });

  const ticket = await prisma.ticket.create({
    data: { title, description, priority, createdById: user.id },
  });

  return NextResponse.json(ticket, { status: 201 });
}

export async function GET(req) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  let where = {};

  if (user.role.name === "SUPPORT")
    where.assignedToId = user.id;

  if (user.role.name === "USER")
    where.createdById = user.id;

  const tickets = await prisma.ticket.findMany({ where });
  return NextResponse.json(tickets);
}