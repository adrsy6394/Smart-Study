You are a senior UI/UX designer and frontend architect.

Create a **Design PRD document in Markdown format** for a MERN stack web application.

Follow **exactly the structure provided below** and fill all sections with clear design rules.

The UI must be **inspired by a dark premium admin dashboard design** with a red accent color, modern card layout, and a left sidebar navigation similar to modern SaaS dashboards.

The design should look **professional, secure, and premium**, suitable for an **AI-powered student learning assistant platform with admin controls**.

The design should match the following visual style:

* Dark background dashboard
* Red accent buttons
* Rounded cards
* Soft shadows
* Clean typography
* Left sidebar navigation
* Admin management panels
* Card based UI blocks

Use practical UI specifications that developers can implement using **React + Tailwind CSS**.

---

# 1. Design Vision

Theme:
Dark / Premium / Minimal SaaS Dashboard

Emotional Tone:
Professional / Secure / Modern

Design Goals:

* Create a clean and professional admin dashboard interface
* Ensure easy navigation and clear data visualization
* Maintain consistent UI components across the system
* Highlight important actions using accent colors

---

# 2. Color System

Primary Background:
#0F0F12

Secondary Background:
#16181D

Accent Color:
#FF2E2E

Success Color:
#22C55E

Danger Color:
#EF4444

Text Primary:
#FFFFFF

Text Secondary:
#9CA3AF

---

# 3. Typography

Font Family:
Inter / Poppins

Heading Sizes:

* H1: 32px
* H2: 24px
* H3: 18px

Body Text Size:
16px

Line Height:
1.5

---

# 4. Layout Guidelines

Design Approach:
Desktop-first dashboard layout

Minimum Mobile Width:
320px

Breakpoints:

* 320px
* 480px
* 768px
* 1024px
* 1280px

Container Width:
Max width: 1280px

Spacing System:

Use a consistent spacing scale:

* 4px
* 8px
* 12px
* 16px
* 24px
* 32px
* 48px

Padding inside cards:
24px

---

# 5. Component Styling

Buttons:

* Border radius: 10px
* Primary style: Red background with white text
* Hover behavior: Slight brightness increase and soft shadow

Inputs:

* Background: Dark gray (#1F2228)
* Border radius: 8px
* Focus state: Red border glow
* Placeholder style: Light gray text

Cards:

* Border radius: 16px
* Background: #16181D
* Shadow style: Soft dark shadow

Modals:

* Animation: Fade + slight scale
* Overlay style: Semi transparent black background

Badges:

Color variants:

* Red (alerts)
* Green (success)
* Gray (inactive)

---

# 6. Role-Based UI Structure

## Role 1 Dashboard: Admin

Layout structure:

Left Sidebar Navigation + Main Content Area

Sidebar contains:

* Dashboard
* Students
* Recent Activity
* Merchant History
* Reports
* Management
* Main Database
* Profile

Main panel contains:

* Page header
* Management tabs (Admins / Vendors)
* Admin registration form
* Active admin list

Primary actions:

* Register new admin
* Manage users
* View reports

---

## Role 2 Dashboard: Student

Layout structure:

Top navigation bar + learning dashboard

Sections include:

* Performance overview
* AI study plan
* Weak subject analysis
* Recommended resources

Interaction style:

* Card based layout
* AI suggestions highlighted with accent color

---

# 7. UX Behavior

Navigation Type:

Sidebar navigation with active state highlight

Feedback System:

* Toast notifications for success messages
* Inline validation errors for forms

Animation Duration:

200–300ms

Loading Indicators:

* Skeleton loaders for dashboards
* Spinner for AI processing

---

# 8. Accessibility Rules

Minimum font size:

14px

Button height:

Minimum 44px

Contrast ratio:

Maintain WCAG accessibility contrast standards

Keyboard Navigation:

Supported

---

# 9. Responsive Behavior

Mobile:

Sidebar collapses into hamburger menu
Components become full width

Tablet:

Two column layout for cards

Desktop:

Grid based dashboard layout with sidebar navigation
