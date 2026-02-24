// lib/auth.js
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";

export async function getUser(req) {
  const header = req.headers.get("authorization");

  if (!header?.startsWith("Bearer "))
    return null;

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { role: true },
    });
  } catch {
    return null;
  }
}
// import { verifyToken } from "./jwt";
// import { NextResponse } from "next/server";

// export function authenticate(req) {
//   const authHeader = req.headers.get("Authorization");
//   if (!authHeader) throw new Error("No token provided");

//   const token = authHeader.split(" ")[1]; 
//   try {
//     const decoded = verifyToken(token);
//     return decoded; 
//   } catch {
//     throw new Error("Invalid token");
//   }
// }