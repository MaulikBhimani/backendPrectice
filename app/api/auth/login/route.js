import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log('Login attempt:', { email });

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (user.password !== password) {
      console.log('Invalid password');
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    console.log('Generating token for user:', user.id);
    const token = generateToken({ id: user.id });
    console.log('Token generated:', !!token);

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: "Login error" },
      { status: 500 }
    );
  }
}