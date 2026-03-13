You are a senior Software Architect and MERN stack engineer.

Create a **Technology Product Requirement Document (tech-prd.md)** in Markdown format for a full stack web application.

The system is an **AI-powered student learning assistant** that analyzes student academic performance and generates personalized study plans using AI.

The application will use the **MERN stack (MongoDB, Express, React, Node.js)** and integrate **OpenRouter AI API** for AI analysis and recommendations.

Follow **exactly the structure below** and fill every section with clear technical specifications suitable for a production-ready prototype and hackathon implementation.

---

# 1. System Architecture

Architecture Pattern:

Client-Server Architecture (Monolithic backend)

Application Type:

Web Application

The system consists of:

Frontend React application communicating with a Node.js backend API which connects to MongoDB and OpenRouter AI API.

System Flow:

User → React Frontend → Express API → AI Service (OpenRouter) → MongoDB → Response to UI

---

# 2. Technology Stack

Frontend:

Framework:
React.js (Vite or Next.js optional)

UI Library:
ShadCN UI or custom component library

Styling:
Tailwind CSS

Backend:

Runtime:
Node.js

Framework:
Express.js

Database:

Type:
NoSQL Document Database

Hosting:
MongoDB Atlas

Authentication:

JWT (JSON Web Tokens)

Hosting:

Frontend:
Vercel / Netlify

Backend:
Render / Railway / Node server

Database:
MongoDB Atlas

AI Integration:

OpenRouter AI API

Used for:

* performance analysis
* study plan generation
* learning resource suggestions

---

# 3. Folder Structure

Backend Structure:

/src
/config
/controllers
/models
/routes
/middleware
/services
/utils
server.js

Important services:

/services/aiService.js → OpenRouter AI integration

---

Frontend Structure:

/src
/pages
/components
/hooks
/services
/context
/utils
App.jsx

Key folders:

components → reusable UI components
services → API calls
context → authentication context

---

# 4. Authentication System

Login Flow:

Step-by-step flow:

1 User registers with email and password
2 Backend hashes password using bcrypt
3 User logs in with credentials
4 Server verifies credentials
5 JWT token generated
6 Token returned to frontend
7 Token stored in httpOnly cookie or local storage
8 Protected routes require valid JWT

Token Strategy:

JWT payload structure:

{
userId,
role,
email,
issuedAt
}

Cookie Strategy:

httpOnly: true
secure: true
sameSite: strict

Token Expiry:

7d

---

# 5. Role-Based Middleware

Roles:

Admin
Student

Middleware Logic:

1 Extract JWT token from request
2 Verify token using secret key
3 Decode payload
4 Check user role
5 Allow access if role permitted
6 Return 403 if role mismatch

Example middleware usage:

adminOnly middleware
authRequired middleware

---

# 6. Database Design

Collections / Tables:

Collection 1: users

Fields:

* _id
* name
* email
* password
* role
* createdAt

Collection 2: academicRecords

Fields:

* _id
* userId
* subjects
* marks
* weakSubjects
* aiAnalysis
* createdAt

Collection 3: studyPlans

Fields:

* _id
* userId
* generatedPlan
* aiPrompt
* createdAt

Indexes:

Unique fields:

email

Frequently queried fields:

userId

Relationships:

academicRecords.userId → users._id
studyPlans.userId → users._id

---

# 7. API Structure

Base Route:

`/api`

Auth Routes:

POST /login
POST /register

AI Routes:

POST /ai/analyze-performance
POST /ai/generate-study-plan
POST /ai/recommend-resources

Role-Specific Routes:

GET /admin/dashboard
GET /user/profile

Response Format:

{
success: true,
data: {}
}

---

# 8. Business Logic Implementation

Critical Logic:

Validation rules:

* Marks must be between 0 and 100
* Email must be unique
* Required fields cannot be empty

Atomic operations:

* Record creation and AI analysis stored together

Rate limits:

* AI endpoints limited to prevent abuse

Transaction Handling:

If AI analysis fails, record creation should rollback or retry.

---

# 9. Security Strategy

Password Hashing:

bcrypt

Environment Variables:

Required secrets:

OPENROUTER_API_KEY
JWT_SECRET
MONGO_URI
PORT

CORS Policy:

Allowed origins:

frontend domain

Rate Limiting:

Login endpoint protection
AI API endpoint throttling

Data Protection:

No sensitive data returned in API responses
Passwords never exposed

---

# 10. Error Handling Strategy

Standard Response Format:

{
success: false,
message: ""
}

HTTP Status Codes:

200 Success
400 Bad Request
401 Unauthorized
403 Forbidden
500 Server Error

---

# 11. Deployment Plan

Frontend Deployment:

Vercel

Backend Deployment:

Render or Railway

Database Hosting:

MongoDB Atlas

Environment Configuration:

Production variables:

OPENROUTER_API_KEY
JWT_SECRET
MONGO_URI
NODE_ENV=production
