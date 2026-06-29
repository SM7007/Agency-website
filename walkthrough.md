# DevCraft Studio — Full Project Overview

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | SQLite (file-based, no server needed) |
| ORM | Prisma 5 |
| Icons | Lucide React |
| Fonts | Outfit + Inter (Google Fonts) |

---

## Project Folder Structure

```
Agency_website/
├── backend/                   ← All database logic lives here
│   ├── schema.prisma          ← Database models/tables
│   ├── db.ts                  ← Prisma client connection
│   ├── seed.ts                ← Script to load initial data
│   └── dev.db                 ← SQLite database file (auto-created)
│
├── src/
│   ├── middleware.ts          ← Authentication Route Guard middleware
│   ├── app/
│   │   ├── layout.tsx         ← Root layout (Navbar + Footer)
│   │   ├── page.tsx           ← Home page
│   │   ├── about/             ← About page
│   │   ├── contact/           ← Contact page
│   │   ├── services/          ← Services page
│   │   ├── work/              ← Portfolio/Work page
│   │   │
│   │   ├── admin/             ← Admin panel (all protected under /admin)
│   │   │   ├── layout.tsx     ← Admin layout (sidebar wrapper, hides on login)
│   │   │   ├── page.tsx       ← Dashboard
│   │   │   ├── login/         ← Admin Login Page UI
│   │   │   ├── enquiries/     ← Enquiries management
│   │   │   ├── services/      ← Services management
│   │   │   ├── projects/      ← Projects management
│   │   │   └── team/          ← Team management
│   │   │
│   │   └── api/               ← REST API endpoints
│   │       ├── admin/
│   │       │   ├── login/     ← API for Admin Session creation
│   │       │   └── logout/    ← API for Admin Session termination
│   │       ├── enquiries/
│   │       ├── services/
│   │       ├── projects/
│   │       └── team-members/
│   │
│   ├── components/            ← Shared UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── TeamCard.tsx
│   │   └── CTABanner.tsx
│   │
│   └── lib/
│       ├── data.ts            ← Static testimonials data only
│       ├── auth.ts            ← Server auth utilities (password hashing)
│       └── jwt.ts             ← Edge-compatible session token utilities
```

---

## Database Models (`backend/schema.prisma`)

### `Service`
| Field | Type | Description |
|---|---|---|
| `id` | String (PK) | Unique slug, e.g. `web-development` |
| `icon` | String | Lucide icon name (e.g. `Globe`) |
| `title` | String | Service title |
| `shortDesc` | String | Short description |
| `whoFor` | String | Target audience |
| `included` | String | JSON array of included items |
| `result` | String? | Expected outcome (optional) |
| `techStack` | String? | JSON array of technologies (optional) |
| `cta` | String | CTA button text |

### `Project`
| Field | Type | Description |
|---|---|---|
| `slug` | String (PK) | Unique URL slug, e.g. `nature-fresh-food` |
| `name` | String | Project name |
| `category` | String | Web / Mobile / AI & Automation / Internal Tool |
| `industry` | String | e.g. Healthcare, Retail, SaaS |
| `stack` | String | JSON array of technologies |
| `shortDesc` | String | One-line description |
| `problem` | String | The client's problem |
| `built` | String | JSON array of what was built |
| `result` | String | The outcome |
| `featured` | Boolean | Show on homepage? |
| `visible` | Boolean | Show on /work page? |

### `TeamMember`
| Field | Type | Description |
|---|---|---|
| `id` | String (PK, UUID) | Auto-generated |
| `name` | String | Full name |
| `role` | String | Job title |
| `bio` | String | Short bio |
| `linkedin` | String | LinkedIn URL |
| `initial` | String | Avatar letter (e.g. `K`) |
| `color` | String | Tailwind gradient classes |

### `Enquiry`
| Field | Type | Description |
|---|---|---|
| `id` | Int (PK) | Auto-increment |
| `name` | String | Sender's name |
| `email` | String | Email address |
| `phone` | String | Phone number |
| `service` | String | Service enquired about |
| `budget` | String? | Budget range (optional) |
| `message` | String | Project description |
| `status` | String | `New` / `Contacted` / `In Progress` / `Closed` |

---

## Public Pages

| Route | File | Data Source | Description |
|---|---|---|---|
| `/` | `src/app/page.tsx` | SQLite (Services, Projects, Team) | Homepage with hero, featured projects, team, testimonials |
| `/services` | `src/app/services/page.tsx` | SQLite (Services) | Full list of all services with details |
| `/work` | `src/app/work/page.tsx` | SQLite (visible Projects) | Portfolio with category filter tabs |
| `/about` | `src/app/about/page.tsx` | SQLite (Team Members) | About page with team grid |
| `/contact` | `src/app/contact/page.tsx` | POSTs to `/api/enquiries` | Contact form — saves to DB on submit |

> **Note**: Global `Navbar` and `Footer` are hidden automatically on all `/admin/*` routes.

---

## Admin Panel Pages

All admin pages live under `/admin` and share the `AdminSidebar` layout.

| Route | File | Operations |
|---|---|---|
| `/admin` | `src/app/admin/page.tsx` | **Read** — Live stats (total enquiries, new this week, project count, team count) + recent enquiries table |
| `/admin/enquiries` | `src/app/admin/enquiries/page.tsx` | **Read, Update Status, Delete** — Filter by status, search, view full message in modal, update status inline |
| `/admin/services` | `src/app/admin/services/page.tsx` | **Create, Read, Update, Delete** — Modal form to add/edit services |
| `/admin/projects` | `src/app/admin/projects/page.tsx` | **Create, Read, Update, Delete, Toggle Visibility** — Modal form, mark as featured, show/hide on public page |
| `/admin/team` | `src/app/admin/team/page.tsx` | **Create, Read, Update, Delete** — Modal form, avatar color picker, LinkedIn link |

---

## Backend API Routes

### Enquiries

| Method | Route | Operation | Used By |
|---|---|---|---|
| `GET` | `/api/enquiries` | Fetch all enquiries (newest first) | Admin Enquiries page |
| `POST` | `/api/enquiries` | Create a new enquiry | Contact form (`/contact`) |
| `PUT` | `/api/enquiries/[id]` | Update enquiry status | Admin modal status dropdown |
| `DELETE` | `/api/enquiries/[id]` | Delete an enquiry | Admin delete button |

### Services

| Method | Route | Operation | Used By |
|---|---|---|---|
| `GET` | `/api/services` | Fetch all services | Admin Services page |
| `POST` | `/api/services` | Create a new service | Admin create modal |
| `PUT` | `/api/services/[id]` | Update a service | Admin edit modal |
| `DELETE` | `/api/services/[id]` | Delete a service | Admin delete button |

### Projects

| Method | Route | Operation | Used By |
|---|---|---|---|
| `GET` | `/api/projects` | Fetch all projects | Admin Projects page |
| `POST` | `/api/projects` | Create a new project | Admin create modal |
| `PUT` | `/api/projects/[slug]` | Update project (incl. visibility/featured) | Admin edit + visibility toggle |
| `DELETE` | `/api/projects/[slug]` | Delete a project | Admin delete button |

### Team Members

| Method | Route | Operation | Used By |
|---|---|---|---|
| `GET` | `/api/team-members` | Fetch all team members | Admin Team page |
| `POST` | `/api/team-members` | Create a team member | Admin create modal |
| `PUT` | `/api/team-members/[id]` | Update a team member | Admin edit modal |
| `DELETE` | `/api/team-members/[id]` | Delete a team member | Admin delete button |

---

## Data Flow Diagram

```
Public Visitor
    │
    ├──► GET /            ─────► Prisma reads Services + Projects + Team from SQLite
    ├──► GET /services    ─────► Prisma reads Services from SQLite
    ├──► GET /work        ─────► Prisma reads visible Projects from SQLite
    ├──► GET /about       ─────► Prisma reads TeamMembers from SQLite
    └──► POST /contact    ─────► POST /api/enquiries ──► Prisma inserts Enquiry in SQLite

Admin User
    │
    ├──► /admin           ─────► Prisma COUNT queries for live stats
    ├──► /admin/enquiries ─────► GET /api/enquiries
    │                              PUT /api/enquiries/[id]   (status update)
    │                              DELETE /api/enquiries/[id]
    │
    ├──► /admin/services  ─────► GET /api/services
    │                              POST /api/services         (create)
    │                              PUT /api/services/[id]    (edit)
    │                              DELETE /api/services/[id]
    │
    ├──► /admin/projects  ─────► GET /api/projects
    │                              POST /api/projects         (create)
    │                              PUT /api/projects/[slug]  (edit + visibility)
    │                              DELETE /api/projects/[slug]
    │
    └──► /admin/team      ─────► GET /api/team-members
                                   POST /api/team-members     (create)
                                   PUT /api/team-members/[id] (edit)
                                   DELETE /api/team-members/[id]
```

---

## Key Design Decisions

| Decision | Reason |
|---|---|
| **SQLite** instead of PostgreSQL | Zero-config, file-based — runs locally without any DB server |
| **Separate `backend/` folder** | Keeps all database logic cleanly separated from the Next.js `src/` frontend |
| **Server Components for public pages** | Pages like `/services`, `/about`, `/work` fetch directly from DB server-side — fast load, SEO-friendly |
| **Client Components for admin CRUD** | Admin pages need interactivity (modals, form state) — loaded client-side |
| **JSON strings in SQLite** | Prisma + SQLite doesn't support native arrays; arrays are stored as `JSON.stringify()` strings and parsed on read |
| **AdminSidebar in layout.tsx** | Prevents sidebar duplication across every admin page — DRY pattern |
| **Navbar/Footer hidden on /admin** | Clean admin UI — detected via `usePathname()` in Navbar and Footer components |
