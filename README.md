# JobZygo - Job Portal Platform

JobZygo is a modern full-stack job portal application that connects job seekers with employers. Built with a robust Spring Boot backend and a premium Next.js frontend, it demonstrates enterprise-level web application development with modern technologies and clean architecture.

## 🚀 Project Overview

A comprehensive job portal platform featuring secure user authentication, job management, and AI-assisted search capabilities. The application showcases full-stack development skills with industry-standard technologies and architectural patterns.

## ✨ Key Features

- **🎨 Premium UI/UX**: Modern, high-contrast interface built with Next.js 15 and Tailwind CSS v4, featuring "glassmorphism" and smooth animations.
- **🔐 Secure Authentication**: JWT-based stateless authentication system with robust error handling and token validation.
- **📋 Job Management**: Complete CRUD operations for job postings with a refined data model.
- **🔍 Job Search**: Dynamic job search with filters for location, skills, and experience level.
- **👥 User Roles**: Dual-role system supporting both Job Seekers and Employers.
- **🛡️ Security**: BCrypt password encryption, protected API routes, and comprehensive CORS configuration.

## 🏗️ Architecture & Technologies

### Backend (Java/Spring Boot)
- **Framework**: Spring Boot 3.3.0+
- **Database**: MongoDB (Atlas) with Spring Data MongoDB
- **Security**: Spring Security 6 with custom JWT Filter
- **Reliability**: String-based ID mapping for seamless JSON serialization
- **Architecture**: Layered design (Controller → Service → Repository)

### Frontend (Next.js/React)
- **Framework**: Next.js 15.4.6 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 for ultra-modern visuals
- **UI Components**: Custom reusable components with Lucide React icons
- **State/Data**: Axios for API communication and React Hooks for state management

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- MongoDB Atlas account (or local MongoDB instance)

### Quick Run Scripts
For ease of development, use the following interactive scripts:

1. **Backend**: Run `run.bat` in the root directory.
   - *Note: Ensure your `MONGODB_URI` environment variable is set.*
2. **Frontend**: Run `run-frontend.bat` in the root directory.
   - *Access at: [http://localhost:3000](http://localhost:3000)*

---

### Backend Architecture
```
com.tony.JobZygo/
├── controller/     # REST API endpoints (/api)
├── service/        # Business logic layer
├── repo/           # Data access (PostRepo, UserRepo)
├── entity/         # Data models (JobPost, User)
├── config/         # Security & CORS configuration
└── filter/         # JWT authentication logic
```

### API Endpoints (Primary)
- **Auth**: `POST /api/auth/login`, `POST /api/auth/signup`
- **Jobs**: `GET /api/jobs`, `POST /api/jobs`
- **Search**: `GET /api/jobs/search/{text}`

## 🛡️ Security Implementation
- Stateless JWT-based authentication.
- Invalid/Expired token handling to ensure high availability.
- CORS configured for `http://localhost:3000` to allow secure frontend interaction.
- Exposed `Authorization` headers for frontend token management.

## 📊 Data Models
**JobPost**:
- Profile, job type, companyName, experience, salary, location, description, and required techs list.
- Uses `@Id` with `String` type for optimal compatibility with frontend keys.

**User**:
- Username, email, password (hashed), and userType.
- Database unique constraints on username and email.

## 👨‍💻 Developer & AI Collaboration

**Saurabh** - Java Backend Developer
*Java Expertise with AI-Assisted Mastery*

This project was built using a modern AI-collaborative workflow:
- **Backend Architecture**: Designed and implemented by Saurabh.
- **AI Collaboration**: Leveraged **Cursor AI** and **Antigravity** for rapid frontend development, logic optimization, and UI styling.
- **Result**: A high-performance, secure, and visually stunning web application delivered through the synergy of human expertise and advanced AI tools.


---

*This project demonstrates a professional blend of Java backend expertise and modern frontend development tools, delivering a high-performance, secure, and visually stunning web application.*

