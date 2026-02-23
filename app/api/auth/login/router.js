import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );

    // ✅ simple password check
    if (user.password !== password) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const token = generateToken({ id: user.id });

    return NextResponse.json({ token });
  } catch {
    return NextResponse.json(
      { message: "Login error" },
      { status: 500 }
    );
  }
}