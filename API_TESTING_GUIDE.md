# API Testing Guide - Simple Way

## 🚀 Quick Start

### 1. Start Your Server
```bash
npm run dev
```
Server runs on: `http://localhost:3000`

---

## 📝 Testing Login API

### Method 1: Using Thunder Client / Postman (Easiest)

1. **Install Thunder Client** (VS Code Extension) or use Postman
2. Create a new POST request
3. URL: `http://localhost:3000/api/auth/login`
4. Headers: `Content-Type: application/json`
5. Body (raw JSON):
```json
{
  "email": "manager@example.com",
  "password": "password123"
}
```

### Method 2: Using cURL (Command Line)

```bash
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"manager@example.com\",\"password\":\"password123\"}"
```

### Method 3: Using test.html (Browser)

Open `test.html` in your browser and click the buttons!

---

## 📊 Expected Responses

### ✅ Success (200)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### ❌ Wrong Email/Password (401)
```json
{
  "message": "Invalid credentials"
}
```

### ❌ Missing Data (500)
Server error if email or password is missing

---

## 🧪 Test Scenarios

### Test 1: Valid Login
```json
{
  "email": "manager@example.com",
  "password": "password123"
}
```
**Expected:** Token returned ✅

### Test 2: Wrong Password
```json
{
  "email": "manager@example.com",
  "password": "wrongpassword"
}
```
**Expected:** 401 Invalid credentials ❌

### Test 3: Wrong Email
```json
{
  "email": "notexist@example.com",
  "password": "password123"
}
```
**Expected:** 401 Invalid credentials ❌

### Test 4: Missing Email
```json
{
  "password": "password123"
}
```
**Expected:** Error ❌

### Test 5: Missing Password
```json
{
  "email": "manager@example.com"
}
```
**Expected:** Error ❌

### Test 6: Empty Body
```json
{}
```
**Expected:** Error ❌

---

## 🔐 Using Token for Other APIs

After login, copy the token and use it:

### Example: Get All Users
```bash
curl -X GET http://localhost:3000/api/user ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📦 Sample Test Users (You need to create these first)

| Email | Password | Role |
|-------|----------|------|
| manager@example.com | password123 | MANAGER |
| support@example.com | password123 | SUPPORT |
| user@example.com | password123 | USER |

---

## 🛠️ Create Test User (First Time Setup)

Use this to create a MANAGER user:

```bash
curl -X POST http://localhost:3000/api/user ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Manager User\",\"email\":\"manager@example.com\",\"password\":\"password123\",\"role\":\"MANAGER\"}"
```

Or run the seed script if you have one!
