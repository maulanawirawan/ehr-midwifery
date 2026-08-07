# EHR Midwifery - Medical Records System

A comprehensive electronic health record (EHR) system designed specifically for midwifery and maternal healthcare in Indonesia. Built with Next.js 15, Supabase, and Tailwind CSS.

## 🎯 Features

### Authentication & Security
- Email/password login and registration
- Google OAuth support (configurable)
- Role-based access control (Midwife, Patient, Admin)
- Row Level Security (RLS) for data isolation
- Protected routes with middleware

### Medical Records Management
Complete medical records form with **8 sections**:

1. **Identitas Pasien** - Patient demographics (name, NIK, phone, address, blood type, Rh factor, allergies)
2. **Keluhan Utama** - Chief complaint with duration and location
3. **Riwayat Kesehatan** - Past/family medical history and current medications
4. **Pemeriksaan Fisik** - Physical findings and vital signs
5. **Pemeriksaan Penunjang** - Lab tests and radiology reports
6. **Diagnosis** - Diagnosis summary and ICD-10 codes
7. **Tindakan/Asuhan** - Treatments, prescribed medications, follow-up instructions
8. **Rujukan** - Referral information if needed

### Dashboard Features
- Responsive medical records list view
- Search functionality by patient name or diagnosis
- CRUD operations for medical records
- Real-time database updates
- Mobile-friendly design

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.5.22 | React framework with App Router |
| Supabase | Latest | PostgreSQL database & authentication |
| Tailwind CSS | Latest | Styling |
| Zod | Latest | Schema validation |
| Lucide React | Latest | Vector icons (no emojis) |
| Vercel | - | Deployment platform |

## 📁 Project Structure

```
ehr-midwifery/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages wrapper
│   │   ├── login/               # Login page
│   │   └── signup/              # Registration page
│   ├── (dashboard)/              # Protected routes wrapper
│   │   ├── records/             # Medical records page
│   │   └── layout.tsx           # Dashboard shell
│   ├── api/                      # API Routes
│   │   ├── auth/                # Auth endpoints
│   │   └── records/             # Records CRUD
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home redirect
├── components/
│   └── Header.tsx               # Navigation header
├── lib/
│   ├── supabase/                # Supabase clients
│   └── validation/              # Zod schemas
├── supabase/
│   └── migrations/              # Database schema
├── middleware.ts                  # Route protection
└── .env.local                     # Environment variables
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager
- Supabase account

### Installation

1. **Clone the repository**
```bash
cd D:\panduan_bimbingan_saja\ehr-midwifery
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
SESSION_MAX_AGE=604800
```

4. **Set up Supabase database**
Run migrations in order via Supabase SQL Editor:
- `supabase/migrations/00001_initial_schema.sql`
- `supabase/migrations/00002_rls_policies.sql`
- `supabase/migrations/00003_demo_accounts.sql`

5. **Start development server**
```bash
npm run dev
```
Access at http://localhost:3000

## 👥 Demo Accounts

Use these accounts for testing:

| Role | Email | Password |
|------|-------|----------|
| Midwife | midwife@ehr-demo.com | Midwife123! |
| Patient | patient1@ehr-demo.com | Patient123! |
| Patient | patient2@ehr-demo.com | Patient123! |

## 🔒 Security

- Row Level Security policies ensure patients only see their own records
- Midwives can view all records but cannot delete without authorization
- All passwords are hashed using bcrypt
- Session tokens secured with HTTP-only cookies
- Input validation with Zod schemas

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/signup` | User registration |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/records` | List medical records |
| POST | `/api/records` | Create new record |
| GET | `/api/records/[id]` | Get single record |
| PATCH | `/api/records/[id]` | Update record |
| DELETE | `/api/records/[id]` | Delete record |

## 🌐 Deployment

See [`DEPLOYMENT.md`](DEPLOYMENT.md) for complete deployment instructions covering:
- Supabase project setup
- Database migrations
- Vercel deployment configuration
- Environment variable setup
- Post-deployment verification

## 📄 License

This project is built for internal use as per client requirements.

---

Built with ❤️ for Indonesian maternal healthcare providers.
