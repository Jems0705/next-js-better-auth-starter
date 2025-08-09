# 🚀 Next.js + Better Auth Starter

A production-ready **starter template** for integrating [Better Auth](https://better-auth.com) with **Next.js**, featuring:

- **Email & Password Authentication**
- **Google OAuth Sign-In**
- **PostgreSQL (Neon) Integration** with Drizzle ORM
- **UI Components** with [shadcn/ui](https://ui.shadcn.com)
- **Form Handling & Validation** with react-hook-form + Zod
- **Type-Safe** and organized code structure

---

## 📦 Tech Stack

| Tech                         | Purpose |
|------------------------------|---------|
| **Next.js 15**               | Full-stack React framework |
| **Better Auth**              | Authentication library |
| **Drizzle ORM**              | Type-safe database queries |
| **PostgreSQL (Neon)**        | Cloud-hosted database |
| **shadcn/ui**                | UI components |
| **React Hook Form**          | Form state management |
| **Zod**                      | Schema validation |

---

## ⚙️ Features

✅ Email & password sign-in/sign-up  
✅ Google OAuth authentication  
✅ Server-side session handling  
✅ Typed API responses  
✅ Organized file structure for scalability  
✅ Environment variable-based configuration  
✅ Ready-to-use database migrations  

---

## 📂 Project Structure

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Jems0705/next-js-better-auth-starter.git
cd next-js-better-auth-starter
```

### 2️⃣ Install dependencies
Create a .env file in the root directory and add:
```bash
npm install
```

3️⃣ Set up environment variables
```bash
# Better Auth
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

# Database (Neon)
DATABASE_URL=postgresql://user:password@neon_host/db_name

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4️⃣ Run database migrations
```bash
npx drizzle-kit generate
npx drizzle-kit push
```

5️⃣ Start development server

```bash
npm run dev
```

App will be available at:
➡️ [http://localhost:3000](http://localhost:3000)

