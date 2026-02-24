This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
<!-- npm install prisma @prisma/client mysql2 jsonwebtoken -->

First, run the development server:

```bash
npm run dev
```

app/
 └─ api/
     ├─ auth/
     │   ├─ signup/route.js
     │   └─ login/route.js
     ├─ users/
     │   ├─ route.js        (GET all users, POST create)
     │   └─ [id]/route.js   (GET, PATCH, DELETE user by id)
     ├─ students/
     │   ├─ route.js
     │   └─ [id]/route.js
     └─ faculty/
         ├─ route.js
         └─ [id]/route.js
lib/
 ├─ prisma.js
 └─ jwt.js