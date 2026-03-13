# SmartStudy AI - Development TODO PRD

This document breaks down the SmartStudy AI platform into systematic phases, modules, and atomic tasks based on the Product, Design, and Technology PRDs. The development approach enforces **one feature at a time** to avoid writing the entire codebase at once, ensuring stable and iterative progress.

---

## Phase 1: Project Setup and Foundation
**Goal:** Initialize the project structure, repositories, and foundational integrations.

### Module 1.1: Workspace Initialization
**Target Folders:** `/frontend`, `/backend`
- [x] **Task 1:** Initialize a Git repository at the root.
- [x] **Task 2:** Setup the Node.js + Express backend application (using `npm init`).
- [x] **Task 3:** Setup the React frontend (using Vite or similar tool).
- [x] **Task 4:** Install standard backend dependencies (`express`, `mongoose`, `dotenv`, `cors`, `helmet`).

### Module 1.2: Database & Environment Setup
**Target Folders:** `/backend/config`, `/backend/models`
- [x] **Task 1:** Configure MongoDB Atlas cluster and acquire connection string.
- [x] **Task 2:** Create database connection logic (`/backend/config/db.js`).
- [x] **Task 3:** Create foundational `.env` files for both frontend and backend.
- [x] **Task 4:** Create initial MongoDB Schemas: `User` and `AcademicRecord`.

### Module 1.3: Frontend UI Foundation
**Target Folders:** `/frontend/src`
- [x] **Task 1:** Install and configure Tailwind CSS in the React app.
- [x] **Task 2:** Set up the global CSS variables for the Dark Premium SaaS theme (Primary: `#0F0F12`, Accent: `#FF2E2E`, etc.).
- [x] **Task 3:** Install ShadCN UI (or equivalent component library) and configure base tokens.

---

## Phase 2: Role-Based Authentication System
**Goal:** Implement secure user registration and login with JWT before building core features.

### Module 2.1: Backend Auth Implementation
**Target Folders:** `/backend/controllers/authController.js`, `/backend/routes/authRoutes.js`, `/backend/middleware`
- [x] **Task 1:** Implement User Registration endpoint (`POST /api/register`), including `bcrypt` password hashing.
- [x] **Task 2:** Implement User Login endpoint (`POST /api/login`), establishing JWT token generation.
- [x] **Task 3:** Create JWT verification middleware (`verifyToken`).
- [x] **Task 4:** Create role-checking middleware (`adminOnly`, `studentOnly`).

### Module 2.2: Frontend Auth Pages
**Target Folders:** `/frontend/src/pages/auth`, `/frontend/src/components/ui`
- [x] **Task 1:** Create shared UI components (Button, Input) adopting the dark theme spec.
- [x] **Task 2:** Build Registration Page UI.
- [x] **Task 3:** Build Login Page UI.

### Module 2.3: Frontend Auth Integration
**Target Folders:** `/frontend/src/context`, `/frontend/src/services`
- [x] **Task 1:** Set up `AuthContext.jsx` to manage global user state.
- [x] **Task 2:** Setup Axios or Fetch generic interconnect logic handling JWT cookies/local storage.
- [x] **Task 3:** Wire Registration and Login UIs to backend APIs.
- [x] **Task 4:** Implement protected routing logic in React Router.

---

## Phase 3: Dashboard Shell & Layouts
**Goal:** Create the basic navigation structures for both User Roles (Student and Admin).

### Module 3.1: Admin Dashboard Shell
**Target Folders:** `/frontend/src/layouts/AdminLayout.jsx`, `/frontend/src/pages/admin`
- [x] **Task 1:** Build the Left Sidebar Navigation component with links (Dashboard, Students, Reports, Management).
- [x] **Task 2:** Build the empty `AdminDashboard` page wrapper respecting the layout guidelines.
- [x] **Task 3:** Wire Admin routes.

### Module 3.2: Student Dashboard Shell
**Target Folders:** `/frontend/src/layouts/StudentLayout.jsx`, `/frontend/src/pages/student`
- [x] **Task 1:** Build the Top Navigation Bar for students.
- [x] **Task 2:** Build the basic `StudentDashboard` page.
- [x] **Task 3:** Wire Student routes.

---

## Phase 4: Feature 1 - Academic Performance Analysis
**Goal:** Allow students to input marks and get AI-driven weak subject detection.

### Module 4.1: AI Service Integration
**Target Folders:** `/backend/services/aiService.js`
- [x] **Task 1:** Integrate the OpenRouter API SDK or REST call logic.
- [x] **Task 2:** Create prompt templates for academic performance evaluation.

### Module 4.2: Backend Analysis API
**Target Folders:** `/backend/controllers/performanceController.js`, `/backend/routes/aiRoutes.js`
- [x] **Task 1:** Create `POST /api/ai/analyze-performance` endpoint.
- [x] **Task 2:** Connect endpoint to OpenRouter service logic.
- [x] **Task 3:** Save AI analysis response into the `AcademicRecord` collection.

### Module 4.3: Frontend Analysis Integration
**Target Folders:** `/frontend/src/components/student`, `/frontend/src/pages/student`
- [x] **Task 1:** Build a Subject Marks Input form component (matching the rounded card design).
- [x] **Task 2:** Integrate form submission to call the analysis API.
- [x] **Task 3:** Implement loading states (spinner) while waiting for AI response.
- [x] **Task 4:** Build UI to elegantly display performance summary and detected weak subjects.

---

## Phase 5: Feature 2 - AI Study Plan Generator
**Goal:** Provide personalized weekly study plans based on prior performance analysis.

### Module 5.1: Backend Study Plan API
**Target Folders:** `/backend/models/StudyPlan.js`, `/backend/controllers/studyPlanController.js`
- [x] **Task 1:** Create the MongoDB `StudyPlan` scheme.
- [x] **Task 2:** Update prompt logic in `aiService.js` to generate formatted study plans.
- [x] **Task 3:** Create `POST /api/ai/generate-study-plan` endpoint.
- [x] **Task 4:** Store successfully generated plans in the database.

### Module 5.2: Frontend Study Plan Integration
**Target Folders:** `/frontend/src/components/student/StudyPlan`
- [x] **Task 1:** Create UI to request a study plan (inputting preferred study duration).
- [x] **Task 2:** Call the plan generator API.
- [x] **Task 3:** Build a stylized component to display the generated Weekly Study Plan and strategies visually.

---

## Phase 6: Feature 3 - AI Resource Recommendation
**Goal:** Offer links/topics for weak subjects.

### Module 6.1: Backend Resource API
**Target Folders:** `/backend/controllers/resourceController.js`
- [x] **Task 1:** Update `aiService.js` to handle resource suggestion prompts.
- [x] **Task 2:** Create `POST /api/ai/recommend-resources` endpoint.

### Module 6.2: Frontend Resource Integration
**Target Folders:** `/frontend/src/components/student/Resources`
- [x] **Task 1:** Build the Resource Suggestion UI component.
- [x] **Task 2:** Integrate API and render recommendations.

---

## Phase 7: Admin Controls & Management
**Goal:** Give Admins visibility over the platform.

### Module 7.1: Backend Admin Features
**Target Folders:** `/backend/controllers/adminController.js`, `/backend/routes/adminRoutes.js`
- [x] **Task 1:** Create `GET /api/admin/dashboard` to serve platform analytics and user counts.
- [x] **Task 2:** Implement an API to fetch the active user/student list.

### Module 7.2: Frontend Admin Dashboard Completion
**Target Folders:** `/frontend/src/components/admin`
- [x] **Task 1:** Build summary statistic cards on the Admin Dashboard.
- [x] **Task 2:** Build the user management data-table component.
- [x] **Task 3:** Implement Admin registration/creation form (Admin role only).

---

## Phase 8: Polish & Deployment
**Goal:** Ensure UX robustness and deploy the application.

### Module 8.1: UX/UI Polish
**Target Folders:** `/frontend/src/components/ui`, App-wide
- [x] **Task 1:** Implement global Toast Notifications for API success/failures.
- [x] **Task 2:** Enforce the minimum 320px responsive guidelines (Sidebar collapse to hamburger).
- [x] **Task 3:** Verify accessibility specs (Contrast ratio, 14px minimum font, 44px minimum button targets).

### Module 8.2: Deployment
**Target Folders:** Vercel / Render Configurations
- [x] **Task 1:** Prepare environment variables for production.
- [x] **Task 2:** Deploy Backend to Render/Railway and ensure MongoDB Atlas IP allowance.
- [x] **Task 3:** Deploy Frontend to Vercel/Netlify connected to the live backend URL.
- [x] **Task 4:** Final End-To-End Testing in the production environment.
