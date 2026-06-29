# Agency Portfolio Website — Full Content Guide
> Complete content for all public pages + admin panel structure.
> Team fills in: Agency Name, Logo, Team Photos, Project Screenshots.

---

## 📌 QUICK REFERENCE — PAGE MAP

```
PUBLIC SIDE                    ADMIN SIDE
─────────────────────────      ──────────────────────────
/ (Home)                       /admin (Dashboard)
/services                      /admin/enquiries
/work                          /admin/projects
/work/[project-slug]           /admin/services
/about                         /admin/team
/contact                       /admin/blog
/blog                          /admin/users
/blog/[post-slug]
```

---

## 🛠️ TECH STACK

```
Frontend   →  Next.js 14
Styling    →  Tailwind CSS + ShadcnUI
Backend    →  Next.js API Routes
Database   →  PostgreSQL + Prisma
Auth       →  NextAuth.js (Admin login)
Images     →  Cloudinary
Deploy     →  Vercel
```

---
---

# 🌐 PUBLIC SIDE — PAGE CONTENT

---

## PAGE 1 — HOME ( / )

---

### Section 1: Hero

```
Headline      →  "We Build Digital Products That Actually Work"
Sub-headline  →  "Full-stack web, mobile, and AI solutions for
                  startups and growing businesses — built fast,
                  built clean, built to scale."

CTA Buttons:
  Primary   →  "Start a Project"  (links to /contact)
  Secondary →  "See Our Work"     (scrolls to projects section)

Visual →  Clean dark/light background with subtle tech graphic
          or animated code element
```

---

### Section 2: Services Overview

```
Heading → "What We Do"
Sub     → "We cover everything your startup needs — from idea to deployment."

Card 1 — AI & Automation
  Icon    → Robot / Automation icon
  Title   → "AI & Automation"
  Text    → "WhatsApp AI agents, workflow automation, and intelligent
              systems that run your business without manual effort."

Card 2 — Web Development
  Icon    → Browser / Code icon
  Title   → "Web Development"
  Text    → "Full-stack web applications, ecommerce platforms, admin
              dashboards, and internal tools built with modern stacks."

Card 3 — Mobile Apps
  Icon    → Mobile icon
  Title   → "Mobile Apps"
  Text    → "Cross-platform mobile apps using Flutter — from GPS
              tracking systems to customer-facing ordering apps."

Card 4 — IT Consulting
  Icon    → Lightbulb / Strategy icon
  Title   → "IT Consulting"
  Text    → "We audit your current tech setup and tell you exactly
              what to fix, what to build, and where to invest."

CTA below cards → "View All Services →" (links to /services)
```

---

### Section 3: Why Choose Us

```
Heading → "Why Startups Work With Us"

Point 1 — We Move Fast
  "We don't spend 6 months planning. We scope, build,
   and ship your product in weeks — not quarters."

Point 2 — We Think Like Founders
  "We've built real products for real clients. We
   understand startup pressure, budget limits, and
   what actually matters for early-stage growth."

Point 3 — Full-Stack Team
  "One team handles everything — frontend, backend,
   mobile, AI, and deployment. No handoff chaos."
```

---

### Section 4: Featured Projects

```
Heading → "Work We're Proud Of"
Sub     → "Real projects. Real problems solved."

Show 3 best project cards here (pulled from /admin/projects)
Each card shows:
  - Project thumbnail/screenshot
  - Project name
  - Category tag (Web / Mobile / AI)
  - One-line description
  - "View Project →" button

CTA below → "See All Projects →" (links to /work)
```

---

### Section 5: Testimonials

```
Heading → "What Clients Say"

[Testimonial cards — add as you collect them]

Placeholder format:
  Quote   → "Working with [Agency Name] was smooth from
              start to finish. They understood exactly what
              we needed and delivered on time."
  Name    → Client Name
  Role    → Founder, Company Name
  Photo   → Client photo (optional)
```

---

### Section 6: Team Preview

```
Heading → "The Team Behind The Work"
Sub     → "4 people. Real skills. No outsourcing."

Show all 4 team member cards:
  - Photo
  - Name
  - Role
  - LinkedIn icon link

CTA → "Meet The Full Team →" (links to /about)
```

---

### Section 7: Contact CTA Banner

```
Background  →  Dark / Brand color section
Heading     →  "Have a Project in Mind?"
Sub         →  "Let's talk. We'll scope it, price it, and
                get started within a week."
CTA Button  →  "Get a Free Consultation" (links to /contact)
```

---
---

## PAGE 2 — SERVICES ( /services )

---

### Hero

```
Heading  →  "Services We Offer"
Sub      →  "From AI automation to full-stack development —
              we build what your business actually needs."
```

---

### Service 1 — AI & WhatsApp Automation

```
Title       →  "AI & WhatsApp Automation"
Who it's for→  "Startups, clinics, ecommerce brands, coaching
                centers — any business that loses customers
                due to slow responses or manual follow-ups."

What's included:
  → WhatsApp AI agent setup (replies 24/7 automatically)
  → Lead capture and qualification via WhatsApp
  → Appointment booking automation
  → Abandoned cart recovery (for ecommerce)
  → n8n workflow automation for repetitive tasks
  → Monthly maintenance and monitoring

Result you get:
  → "Your business runs on autopilot.
     No missed leads. No manual follow-up. No wasted time."

CTA → "Get a Quote" (links to /contact)
```

---

### Service 2 — Full-Stack Web Development

```
Title        →  "Full-Stack Web Development"
Who it's for →  "Startups who need a product built from scratch,
                 or businesses who need to upgrade their
                 current web platform."

What's included:
  → Custom web application development
  → Ecommerce platforms with payment integration
  → Admin dashboards and analytics portals
  → REST API and backend development
  → Database design and management
  → Deployment and hosting setup
  → 1 month post-launch support

Tech stack:
  Next.js · React · Node.js · PostgreSQL ·
  Prisma · Tailwind CSS · Stripe · Vercel

CTA → "Get a Quote" (links to /contact)
```

---

### Service 3 — Mobile App Development

```
Title        →  "Mobile App Development"
Who it's for →  "Businesses that need a customer-facing
                 mobile app or an internal team app."

What's included:
  → Cross-platform app (iOS + Android) using Flutter
  → GPS and location-based features
  → Push notification system
  → OTP and authentication
  → Admin panel to manage app content
  → Play Store / App Store deployment support

CTA → "Get a Quote" (links to /contact)
```

---

### Service 4 — Internal Tools & Admin Portals

```
Title        →  "Internal Tools & Admin Portals"
Who it's for →  "Startups that are paying too much for
                 SaaS tools that don't fit their workflow."

What's included:
  → Custom CRM systems
  → HR and attendance management tools
  → Inventory management systems
  → Custom reporting and analytics dashboards
  → Role-based access control
  → Fully owned by you — no monthly SaaS fee

CTA → "Get a Quote" (links to /contact)
```

---

### Service 5 — IT Consulting

```
Title        →  "IT Consulting & Tech Audit"
Who it's for →  "Businesses that already have a product
                 but feel something is broken, slow, or
                 costing too much."

What's included:
  → Full tech stack audit
  → Security review
  → Performance bottleneck identification
  → Written report with fix recommendations
  → Roadmap for next 3-6 months

Deliverable:
  "A clear, plain-English report that tells you
   exactly what's wrong and how to fix it."

CTA → "Book an Audit" (links to /contact)
```

---

### Pricing Note Section

```
Heading → "How Our Pricing Works"

Point 1 → "Every project is scoped individually.
            We don't do one-size-fits-all pricing."
Point 2 → "We give you a fixed quote before starting —
            no surprise bills at the end."
Point 3 → "We offer milestone-based payment —
            you pay as we deliver, not all upfront."

CTA → "Talk to us about your project →" (links to /contact)
```

---
---

## PAGE 3 — WORK / PROJECTS ( /work )

---

### Hero

```
Heading  →  "Our Work"
Sub      →  "Projects we've built for real clients
              across web, mobile, and AI."
```

---

### Filter Tabs

```
All  |  Web  |  Mobile  |  AI & Automation  |  Internal Tools
```

---

### Project Cards (Pulled from Admin Panel)

```
Each card shows:
  - Screenshot / thumbnail
  - Project name
  - Category tag
  - Client industry (not client name if private)
  - Tech stack (3-4 tags)
  - One-line description
  - "View Details →" button
```

---

## PAGE 3A — PROJECT DETAIL ( /work/[slug] )

```
Layout:
  - Project name + category tag
  - Hero screenshot (large)

  Problem section:
    "The Challenge"
    → What problem the client had

  Solution section:
    "What We Built"
    → What we built, features list

  Result section:
    "The Outcome"
    → What changed after delivery

  Tech Stack section:
    → Logos/tags of technologies used

  Screenshots section:
    → Gallery of project screenshots

  CTA at bottom:
    "Want something like this?"
    → "Start a Project" button (links to /contact)
```

---

### Projects Content (Fill In)

---

#### Project 1 — Ecommerce Platform
```
Slug        →  ecommerce-platform
Category    →  Web
Industry    →  Ecommerce / Retail
Stack       →  Next.js 15, React 19, Stripe, PostgreSQL, Vercel

Problem     →  "Client needed a complete ecommerce store with
                modern payment integration, live inventory
                updates, and a full admin panel."

What we built:
  → Full product catalog with filtering and search
  → Live stock update system
  → Stripe payment gateway integration
  → JWT-authenticated admin portal
  → SSR with Next.js for fast loading and SEO
  → Deployed on Vercel

Result      →  "Production-ready ecommerce store handling real
                transactions — deployed and live."
```

---

#### Project 2 — Nature Fresh Food — Grocery Ordering Platform
```
Slug        →  nature-fresh-food
Category    →  Web
Industry    →  Food & Grocery
Stack       →  Node.js, TypeScript, Express, Prisma,
               PostgreSQL, Cloudinary, JWT, Nodemailer

Problem     →  "A fresh food business needed a complete
                digital ordering system with separate
                portals for customers and admins."

What we built:
  → Customer ordering portal
  → Full admin dashboard (orders, products, users)
  → Backend API with JWT auth + role-based access
  → Cloudinary for product image management
  → Automated email notifications

Result      →  "3 connected portals (user, admin, backend)
                running live for the client."
```

---

#### Project 3 — One More Mile — Fitness Rewards App
```
Slug        →  one-more-mile
Category    →  Mobile
Industry    →  Health & Fitness
Stack       →  Flutter, Go Fiber, PostgreSQL

Problem     →  "People need motivation to exercise.
                Merchants want to reward active customers.
                No existing app connected both."

What we built:
  → GPS-based walking/running tracker
  → Real-time step count, speed, distance tracking
  → Challenge system — complete distance, earn rewards
  → QR-based reward redemption at merchant stores
  → 4 user roles: User, Merchant, Employee, Admin
  → OTP login, subscription system

Result      →  "A complete fitness reward ecosystem connecting
                users and merchants through real GPS-tracked
                challenges."
```

---

#### Project 4 — Larsunlab — Lab Management Platform
```
Slug        →  larsunlab
Category    →  Web / Internal Tool
Industry    →  Laboratory / Healthcare
Stack       →  Node.js, Prisma, PostgreSQL

Problem     →  "A lab needed a digital platform with
                separate portals for users and admins
                to manage operations efficiently."

What we built:
  → Admin management portal
  → User-facing portal
  → Backend API with Prisma ORM
  → Role-based access for admin vs users
```

---

#### Project 5 — NeuHealthcare — Healthcare Platform
```
Slug        →  neuhealthcare
Category    →  Web
Industry    →  Healthcare
Stack       →  Next.js, React

Problem     →  "Healthcare client needed a modern, fast
                web platform for their services."

What we built:
  → Full responsive Next.js frontend
  → Clean, accessible UI for healthcare context
  → SEO optimized, fast page loads
```

---

#### Project 6 — JARVIS Voice AI Assistant
```
Slug        →  jarvis-voice-assistant
Category    →  AI & Automation
Industry    →  Personal / AI
Stack       →  Python, Claude API, Porcupine,
               Kivy, Pyjnius, Android

Problem     →  "Existing voice assistants don't understand
                Tamil + English (Tanglish) naturally and
                can't control phone functions."

What we built:
  → Android voice assistant with custom wake word
  → Claude AI integration for smart responses
  → Tanglish language support
  → Phone control via voice (calls, SMS, apps)

Result      →  "A fully working JARVIS-style assistant
                built for Tamil speakers."
```

---

#### Project 7 — Resume Analyzer & Job Match System
```
Slug        →  resume-analyzer
Category    →  AI & Automation
Industry    →  HR / Career Tech
Stack       →  Python, NLP, AI
GitHub      →  github.com/krishna-tech1/Resume_Analyzer_Job_Match_System

Problem     →  "Job seekers waste hours applying to jobs
                their resume doesn't match."

What we built:
  → AI that reads resume + job description
  → Gives a match score
  → Suggests specific improvements
  → Open source — available on GitHub

Result      →  "Helps candidates fix their resume before
                applying, saving hours of wasted effort."
```

---
---

## PAGE 4 — ABOUT ( /about )

---

### Hero

```
Heading  →  "Who We Are"
Sub      →  "A small team of developers and tech enthusiasts
              based in Chennai, building real products for
              real businesses."
```

---

### Agency Story

```
Heading → "Our Story"

Content →
  "[Agency Name] started with a simple belief — most small
   businesses and startups deserve the same quality of
   technology that big companies have, without the big
   company price tag.

   We're a team of 4 — developers and a business specialist
   — who came together to build digital products that
   actually solve problems. Every project we take is
   something we care about delivering well.

   Based in Chennai, we work with startups and growing
   businesses across India."
```

---

### Mission

```
Heading → "What Drives Us"

"We build technology that works — clean code, clear
 communication, and products delivered on time.
 No fluff. No excuses."
```

---

### Team Section

```
Heading → "Meet The Team"

[Team Member Card × 4]

Card format:
  - Photo
  - Name           → [Fill in]
  - Role           → [Fill in per person]
  - One-liner      → [Fill in — what they're best at]
  - LinkedIn link
```

---

### Values Section

```
Heading → "How We Work"

Value 1 — Honest Communication
  "We tell you what's possible, what's not, and
   how long it'll actually take."

Value 2 — Quality Over Quantity
  "We don't take 10 projects at once. We focus on
   what we've committed to and do it well."

Value 3 — Long-Term Thinking
  "We build things that last — clean code, proper
   documentation, and systems you can maintain."
```

---
---

## PAGE 5 — CONTACT ( /contact )

---

### Hero

```
Heading  →  "Let's Build Something Together"
Sub      →  "Tell us about your project. We'll get back
              to you within 24 hours."
```

---

### Contact Form Fields

```
Full Name          →  Text input        (required)
Email Address      →  Email input       (required)
Phone Number       →  Tel input         (required)
Service Needed     →  Dropdown          (required)
  Options:
    - AI & WhatsApp Automation
    - Full-Stack Web Development
    - Mobile App Development
    - Internal Tools & Admin Portal
    - IT Consulting / Tech Audit
    - Not sure yet

Budget Range       →  Dropdown          (optional)
  Options:
    - Under ₹25,000
    - ₹25,000 – ₹75,000
    - ₹75,000 – ₹1,50,000
    - Above ₹1,50,000
    - Let's discuss

Project Description →  Textarea         (required)
  Placeholder: "Tell us about your project, what
                problem you're solving, and any
                deadline you have in mind..."

Submit Button      →  "Send Message →"
```

---

### After Form Submit

```
Success message →
  "Thanks! We've received your message.
   We'll get back to you within 24 hours.
   For urgent enquiries, WhatsApp us directly."
```

---

### Other Contact Options

```
WhatsApp  →  "Chat with us on WhatsApp"
             [Click to chat link — add number]

Email     →  [Agency email — create one]
             e.g. hello@[agencyname].in

Response  →  "We typically respond within 24 hours
              on working days."
```

---
---

## PAGE 6 — BLOG ( /blog ) — Optional

---

### Hero

```
Heading  →  "Insights & Guides"
Sub      →  "Practical tech articles for startup
              founders and small business owners."
```

---

### Blog Card Format

```
Each card:
  - Thumbnail image
  - Category tag (AI / Web Dev / Startup Tips)
  - Title
  - Short excerpt (2 lines)
  - Date published
  - Read time
  - "Read More →" link
```

---

### Starter Blog Post Ideas

```
1. "Why Your WhatsApp is Losing You Customers (And How to Fix It)"
2. "5 Things to Do Before You Build Your Startup's First App"
3. "Next.js vs WordPress — Which One Should You Choose in 2025?"
4. "What is an MVP and Why Your Startup Needs One First"
5. "How We Built a GPS Fitness App with Flutter in 8 Weeks"
```

---
---

# 🔐 ADMIN PANEL — PAGE CONTENT & FEATURES

---

## ADMIN PAGE 1 — DASHBOARD ( /admin )

```
Header cards (stats):
  → Total Enquiries Received
  → New Enquiries This Week
  → Total Projects Listed
  → Total Blog Posts Published

Quick action buttons:
  → "+ Add New Project"
  → "View New Enquiries"
  → "+ Write Blog Post"

Recent enquiries table (last 5):
  → Name | Service | Date | Status
```

---

## ADMIN PAGE 2 — ENQUIRIES ( /admin/enquiries )

```
Page heading → "Enquiries & Leads"

Table columns:
  # | Name | Email | Phone | Service | Budget | Date | Status | Actions

Status options (color coded):
  🟡 New          → Just came in, not contacted yet
  🔵 Contacted    → Team reached out
  🟢 In Progress  → Project started
  🔴 Closed       → Done or lost

Actions per row:
  → View full message (modal popup)
  → Change status (dropdown)
  → Assign to team member
  → Add internal note
  → Delete

Filters at top:
  → All | New | Contacted | In Progress | Closed
  → Date range picker
  → Search by name or email
```

---

## ADMIN PAGE 3 — PROJECTS ( /admin/projects )

```
Page heading → "Portfolio Projects"

Top button → "+ Add New Project"

Table columns:
  # | Project Name | Category | Status | Date Added | Actions

Actions:
  → Edit
  → Toggle visibility (Show/Hide on website)
  → Delete

Add / Edit Project Form:
  → Project Title              (text)
  → Slug                       (auto-generated, editable)
  → Category                   (dropdown: Web/Mobile/AI/Internal Tool)
  → Client Industry            (text)
  → Tech Stack                 (tag input)
  → Problem Description        (textarea)
  → What We Built              (textarea / bullet points)
  → Result / Outcome           (textarea)
  → Upload Screenshots         (multi-image upload → Cloudinary)
  → Show on Website?           (toggle)
  → Featured Project?          (toggle — shows on home page)
```

---

## ADMIN PAGE 4 — SERVICES ( /admin/services )

```
Page heading → "Services"

Top button → "+ Add New Service"

Table:
  # | Service Name | Visible on Site | Actions

Actions:
  → Edit
  → Toggle visibility
  → Delete

Edit Service Form:
  → Service Title
  → Short description (for home page card)
  → Full description (for services page)
  → What's included (bullet list)
  → Who it's for
  → CTA button text
  → Show on Website? (toggle)
```

---

## ADMIN PAGE 5 — TEAM ( /admin/team )

```
Page heading → "Team Members"

Top button → "+ Add Member"

Cards view (not table):
  Each member card shows:
    → Photo preview
    → Name, Role
    → Edit button
    → Toggle show/hide

Edit Member Form:
  → Full Name
  → Role / Title
  → One-liner bio
  → LinkedIn URL
  → Upload Photo (Cloudinary)
  → Show on Website? (toggle)
  → Display Order (number)
```

---

## ADMIN PAGE 6 — BLOG ( /admin/blog )

```
Page heading → "Blog Posts"

Top button → "+ Write New Post"

Table:
  # | Title | Category | Status | Date | Actions

Status:
  → Draft
  → Published
  → Unpublished

Actions:
  → Edit
  → Publish / Unpublish
  → Delete

Post Editor:
  → Title
  → Slug (auto-generated)
  → Category (AI / Web Dev / Startup Tips / Other)
  → Cover image (Cloudinary upload)
  → Content (rich text editor — TipTap or similar)
  → Read time (auto-calculated)
  → Meta description (for SEO)
  → Publish / Save Draft button
```

---

## ADMIN PAGE 7 — ADMIN USERS ( /admin/users )

```
Page heading → "Admin Access"

Table:
  # | Name | Email | Role | Last Login | Actions

Role levels:
  → Super Admin   (full access — CEO + CTO only)
  → Editor        (can manage projects, blog, services)
  → Viewer        (can only view enquiries, no edit)

Actions:
  → Edit role
  → Remove access

Add Admin Form:
  → Full Name
  → Email
  → Role (dropdown)
  → Password (auto-email invite or set manually)
```

---
---

# ⚡ BUILD PRIORITY ORDER

```
Week 1 — Core (Most Important)
  ✅ Home page
  ✅ Contact page + form
  ✅ Admin login page
  ✅ Admin enquiries page
  (This alone lets clients reach you and
   lets team manage leads)

Week 2 — Show Your Work
  ✅ Projects/Work page
  ✅ Project detail page
  ✅ Admin projects manager

Week 3 — Complete The Site
  ✅ Services page
  ✅ About page
  ✅ Admin team manager
  ✅ Admin services manager

Week 4 — Polish & Launch
  ✅ Mobile responsiveness
  ✅ SEO meta tags
  ✅ Deploy to Vercel
  ✅ Connect domain
  ✅ Blog (optional, can add later)
```

---

# 📋 THINGS TEAM NEEDS TO FILL IN

```
Before building:
  → Agency name
  → Domain name (.com or .in)
  → Agency email (hello@agencyname.in)
  → Team photos (professional or clean background)
  → Each person's LinkedIn URL
  → WhatsApp number for contact

After building:
  → Add all projects via admin panel
  → Upload project screenshots
  → Collect and add client testimonials
  → Write first 2-3 blog posts
```

---

# 🚀 AFTER WEBSITE IS LIVE — NEXT STEPS

```
1. Register on LinkedIn as company page
2. Non-tech friend starts outreach to local startups
3. Register MSME/Udyam (free, takes 30 mins online)
4. Open a business bank account (current account)
5. Create a simple service deck (PDF) to share with leads
6. Set pricing for each service (fixed packages)
7. Get first client → deliver well → collect testimonial
8. Register as LLP or Pvt Ltd when revenue starts
```
