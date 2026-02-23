// app/api/auth/signup/route.js
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    console.log('Signup attempt:', { name, email });

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log('Email already exists');
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 400 }
      );
    }
    
    const user = await prisma.user.create({
      data: { name, email, password },
    });
    console.log('User created:', user.id);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log('Token generated:', !!token);

    return NextResponse.json({ success: true, user, token });
  } catch (error) {
    console.error('Signup error:', error);

    return NextResponse.json(
      { success: false, message: "Signup failed" },
      { status: 500 }
    );
  }
}