-- EHR Midwifery - Demo Accounts Setup Instructions
-- IMPORTANT: Due to Supabase security restrictions, auth.users table cannot be 
-- directly modified via SQL. Users must be created through the Signup flow.
-- 
-- HOW TO CREATE DEMO ACCOUNTS MANUALLY:
-- 1. Go to http://localhost:3000/signup
-- 2. Create account with these credentials:
--    Email: midwife@ehr-demo.com
--    Password: Midwife123!
-- 3. After signup, go to Supabase Dashboard -> Auth -> Users
-- 4. Edit the user to add role='midwife' in raw_user_meta_data JSON
-- 
-- Repeat for patient accounts with role='patient'

-- Alternatively, you can use Supabase CLI to seed data:
-- npx supabase db push

-- This file is intentionally empty of INSERT statements due to Supabase limitations.
-- Please create demo users manually via signup flow as described above.
