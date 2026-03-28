# JobZygo - Full-Stack Job Portal Platform

JobZygo is a modern, premium job portal that connects job seekers with employers. Built with a robust Spring Boot backend and a high-performance Next.js frontend, it demonstrates modern web development best practices.

## 🏗️ Architecture Summary

- **Frontend**: Next.js 15 (App Router, TypeScript, Tailwind CSS v4)
- **Backend**: Spring Boot 3.3.0+ (Java 17, Spring Security, JWT)
- **Database**: MongoDB Atlas

---

## 🚀 Deployment Guide

### 1. Database (MongoDB Atlas)
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Free Cluster.
3. In **Network Access**, allow access from anywhere (`0.0.0.0/0`) for the initial deployment.
4. Create a database user and copy your **Connection String (URI)**.

### 2. Backend Deployment (e.g., [Render](https://render.com) or [Railway](https://railway.app))
1. Connect your GitHub repository.
2. Set the root directory to project root or use the detected Java environment.
3. **Environment Variables**:
   - `MONGODB_URI`: (Your Atlas URI)
   - `APP_CORS_ORIGINS`: (Your production frontend URL, e.g., `https://jobzygo.vercel.app`)
4. Build Command: `./mvnw clean package -DskipTests`
5. Start Command: `java -jar target/*.jar`

### 3. Frontend Deployment ([Vercel](https://vercel.com))
1. Import your project to Vercel.
2. Choose **Next.js** as the framework.
3. Set the **Root Directory** to `frontend`.
4. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: (Your production backend URL, e.g., `https://jobzygo-api.onrender.com`)
5. Click **Deploy**.

---

## 🛠️ Local Development

### Requirements
- Java 17+
- Node.js 18+
- MongoDB URI

### Steps
1. **Clone the Repo**: `git clone <your-repo-url>`
2. **Backend**:
   - Set environment variable: `MONGODB_URI`
   - Run `run.bat` or `./mvnw spring-boot:run`
3. **Frontend**:
   - Go to `frontend/`
   - Run `npm install`
   - Run `npm run dev` (Access at `localhost:3000`)

---

## ✨ Features Implemented
- **AI-Assisted Search**: Smart search with Atlas Search and a robust Regex fallback for reliability.
- **Auto-Login**: Seamless transition from signup to dashboard.
- **Premium Dashboards**: Dedicated "Profile" and "Applications" tracking pages.
- **Secure Auth**: JWT-based authentication with protected API routes.
- **Enterprise Design**: High-contrast, accessibility-first UI with modern animations.

---

## 👨‍💻 Author
**Saurabh** - *Building Full-Stack Excellence*
AI Collaboration partner: Antigravity AI
