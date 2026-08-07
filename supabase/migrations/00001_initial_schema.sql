-- EHR Midwifery Database Schema
-- Creates all tables for patient medical records, users, and roles

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table - extends auth.users with additional profile data
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  role TEXT CHECK (role IN ('midwife', 'patient', 'admin')),
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX profiles_email_idx ON public.profiles(email);

-- Create index on role for filtering
CREATE INDEX profiles_role_idx ON public.profiles(role);

-- Medical Records main table
CREATE TABLE public.medical_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  midwife_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  
  -- Section 1: Identitas Pasien
  patient_full_name TEXT NOT NULL,
  patient_birth_date DATE NOT NULL,
  patient_nik TEXT,
  patient_phone TEXT,
  patient_address TEXT,
  patient_blood_type TEXT CHECK (patient_blood_type IN ('A', 'B', 'AB', 'O', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown')),
  patient_rh_factor TEXT CHECK (patient_rh_factor IN ('Positive', 'Negative', 'Unknown')),
  patient_allergies TEXT[],
  
  -- Section 2: Keluhan Utama
  chief_complaint TEXT NOT NULL,
  complaint_duration INTERVAL,
  complaint_location TEXT,
  
  -- Section 3: Riwayat Kesehatan
  past_medical_history TEXT,
  family_medical_history TEXT,
  medications TEXT[],
  
  -- Section 4: Pemeriksaan Fisik
  physical_findings JSONB,
  vital_signs JSONB,
  
  -- Section 5: Pemeriksaan Penunjang
  lab_tests JSONB,
  radiology_reports TEXT,
  
  -- Section 6: Diagnosis
  diagnosis_summary TEXT,
  icd_10_code TEXT,
  
  -- Section 7: Tindakan/Asuhan
  treatments TEXT[],
  medications_prescribed TEXT[],
  follow_up_instructions TEXT,
  follow_up_date DATE,
  
  -- Section 8: Rujukan
  is_referral_needed BOOLEAN DEFAULT FALSE,
  referral_facility TEXT,
  referral_reason TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX medical_records_patient_id_idx ON public.medical_records(patient_id);
CREATE INDEX medical_records_midwife_id_idx ON public.medical_records(midwife_id);
CREATE INDEX medical_records_created_at_idx ON public.medical_records(created_at DESC);

-- Audit Log table for tracking changes
CREATE TABLE public.audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for audit logs
CREATE INDEX audit_logs_user_id_idx ON public.audit_logs(user_id);
CREATE INDEX audit_logs_table_name_idx ON public.audit_logs(table_name);
CREATE INDEX audit_logs_created_at_idx ON public.audit_logs(created_at DESC);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Unknown'),
    'patient'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to profiles and medical_records
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS set_medical_records_updated_at ON public.medical_records;
CREATE TRIGGER set_medical_records_updated_at
  BEFORE UPDATE ON public.medical_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
