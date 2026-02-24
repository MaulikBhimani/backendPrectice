// app/api/auth/login/route.js
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password, role } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user || user.password !== password)
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

  const token = jwt.sign(
    { id: user.id, email: user.email, role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return NextResponse.json({ token });
}

// import { prisma } from "@/lib/prisma";
// import { generateToken } from "@/lib/jwt";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { email, password } = await req.json();

//     const user = await prisma.user.findUnique({ where: { email } });

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "User not found" },
//         { status: 404 }
//       );
//     }

//     if (user.password !== password) {
//       return NextResponse.json(
//         { success: false, message: "Invalid password" },
//         { status: 401 }
//       );
//     }

//     const token = generateToken({ id: user.id, email: user.email });

//     return NextResponse.json({ success: true, user, token });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, message: "Login failed" },
//       { status: 500 }
//     );
//   }
// }