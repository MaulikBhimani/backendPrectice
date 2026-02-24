// app/api/users/route.js
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { authorize } from "@/lib/rbac";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await getUser(req);

  try { authorize(user, "MANAGER"); }
  catch (e) { return NextResponse.json({ message: e.message }, { status: e.status }); }

  const { name, email, password, roleName } = await req.json();

  const role = await prisma.role.findUnique({ where: { name: roleName } });
  if (!role) return NextResponse.json({ message: "Invalid role" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { name, email, password: hashed, roleId: role.id },
  });

  return NextResponse.json(newUser, { status: 201 });
}

export async function GET(req) {
  const user = await getUser(req);

  try { authorize(user, "MANAGER"); }
  catch (e) { return NextResponse.json({ message: e.message }, { status: e.status }); }

  const users = await prisma.user.findMany({ include: { role: true } });
  return NextResponse.json(users);
}

// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";
// import { getUserFromRequest } from "@/lib/auth";

// // ✅ GET ALL USERS
// export async function GET(req) {
//   const user = getUserFromRequest(req);
//   if (!user)
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//   const users = await prisma.user.findMany();
//   return NextResponse.json(users);
// }

// // ✅ UPDATE USER
// export async function PUT(req) {
//   const authUser = getUserFromRequest(req);
//   if (!authUser)
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//   const { id, name } = await req.json();

//   const updated = await prisma.user.update({
//     where: { id },
//     data: { name },
//   });

//   return NextResponse.json(updated);
// }

// // ✅ DELETE USER
// export async function DELETE(req) {
//   const authUser = getUserFromRequest(req);
//   if (!authUser)
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//   const { id } = await req.json();

//   await prisma.user.delete({
//     where: { id },
//   });

//   return NextResponse.json({ success: true });
// }