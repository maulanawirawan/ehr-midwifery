# EHR Midwifery - Deployment Guide

## Overview
This document provides step-by-step instructions for deploying the EHR Midwifery application to production using Vercel and Supabase.

## Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **GitHub Repository** (optional, recommended for CI/CD)

---

## Step 1: Set Up Supabase Database

### 1.1 Create a New Project
1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Name**: EHR Midwifery
   - **Database Password**: Strong password (save this!)
   - **Region**: Singapore or Jakarta (closest to Indonesia)
4. Click "Create new project"

### 1.2 Run Migrations
1. Navigate to **SQL Editor** in the Supabase dashboard
2. Copy and paste the contents of each migration file in order:

   **First run `00001_initial_schema.sql`:**
   ```bash
   cat supabase/migrations/00001_initial_schema.sql | pbcopy
   ```
   
   **Then run `00002_rls_policies.sql`:**
   ```bash
   cat supabase/migrations/00002_rls_policies.sql | pbcopy
   ```

3. Click "Run" to execute both migrations

### 1.3 Add Demo Accounts
Run the demo accounts SQL:
```bash
cat supabase/migrations/00003_demo_accounts.sql | pbcopy
```

Click "Run" to insert demo users.

### 1.4 Get Database Credentials
1. Go to **Settings > API** in Supabase
2. Copy these values:
   - **Project URL**: e.g., `https://xxxxx.supabase.co`
   - **anon public key**: e.g., `eyJhbG...`

### 1.5 Update .env.local
In your local project, update `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
SESSION_MAX_AGE=604800
```

⚠️ **IMPORTANT**: Never commit `.env.local` to version control!

---

## Step 2: Deploy to Vercel

### 2.1 Push to GitHub
```bash
cd D:\panduan_bimbingan_saja\ehr-midwifery
git init
git add .
git commit -m "Initial EHR Midwifery setup"
git branch -M main
git remote add origin https://github.com/yourusername/ehr-midwifery.git
git push -u origin main
```

### 2.2 Create Vercel Project
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `/`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 2.3 Set Environment Variables
In Vercel Dashboard > Settings > Environment Variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |

Click "Save" after adding all variables.

### 2.4 Deploy
1. Click "Deploy"
2. Wait for the deployment to complete (~2-5 minutes)

---

## Step 3: Verify Deployment

### 3.1 Test Login with Demo Accounts

**Midwife Account:**
- Email: `midwife@ehr-demo.com`
- Password: `Midwife123!`

**Patient Account:**
- Email: `patient1@ehr-demo.com`
- Password: `Patient123!`

### 3.2 Test Medical Records
1. Create a new medical record with all 8 sections
2. View existing records
3. Edit and delete records (verify RLS policies work correctly)

---

## Step 4: Security Recommendations

### 4.1 Change Demo Passwords
After initial deployment, consider disabling demo accounts or changing their passwords:

```sql
-- In Supabase SQL Editor
UPDATE auth.users 
SET encrypted_password = crypt('NewSecurePassword!', gen_salt('bf'))
WHERE email IN ('midwife@ehr-demo.com', 'patient1@ehr-demo.com');
```

### 4.2 Enable Authentication Providers
To enable Google OAuth or other providers:

1. Go to **Authentication > Providers** in Supabase
2. Enable desired providers and configure OAuth credentials
3. Update frontend components if needed

### 4.3 Monitor Logs
Set up monitoring in Vercel and Supabase:
- Check error logs regularly
- Monitor database performance
- Review authentication attempts

---

## Development Workflow

### Local Development
```bash
cd D:\panduan_bimbingan_saja\ehr-midwifery
npm run dev
# Access at http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

### Linting & Type Checking
```bash
npm run lint
```

---

## Project Structure

```
ehr-midwifery/
├── app/
│   ├── (auth)/              # Authenticated routes wrapper
│   │   ├── login/          # Login page
│   │   └── signup/         # Registration page
│   ├── (dashboard)/         # Protected dashboard routes
│   │   ├── records/        # Medical records management
│   │   └── layout.tsx      # Dashboard shell
│   ├── api/
│   │   ├── auth/           # Auth API endpoints
│   │   └── records/        # Medical records API
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Redirects to login
├── components/
│   └── Header.tsx          # Navigation header
├── lib/
│   ├── supabase/
│   │   ├── client.ts       # Browser Supabase client
│   │   └── server.ts       # Server Supabase client
│   └── validation/         # Zod schemas
├── supabase/
│   └── migrations/         # Database migrations
├── .env.local              # Environment variables (not committed)
├── middleware.ts           # Route protection middleware
├── next.config.ts          # Next.js configuration
└── package.json            # Dependencies
```

---

## Troubleshooting

### Issue: Can't access protected routes
- Verify you're logged in
- Check middleware is working correctly
- Ensure environment variables are set in Vercel

### Issue: Database queries failing
- Verify RLS policies are enabled
- Check database connection string
- Ensure tables were created via migrations

### Issue: Build errors
- Run `npm install` fresh
- Clear `.next` folder
- Check TypeScript compilation

---

## Support

For issues or questions:
- Check [Supabase Documentation](https://supabase.com/docs)
- Review [Next.js Documentation](https://nextjs.org/docs)
- Check Vercel [Deployment Docs](https://vercel.com/docs)

---

## Credits

Built with:
- **Next.js 15** - React framework
- **Supabase** - PostgreSQL database & auth
- **Tailwind CSS** - Styling
- **Zod** - Schema validation
- **Lucide React** - Vector icons
