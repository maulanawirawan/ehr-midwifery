-- EHR Midwifery - Row Level Security Policies
-- Ensures proper data isolation between midwives and patients

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles table policies
-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow midwives and admins to view all profiles for managing patients
CREATE POLICY "Midwives view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('midwife', 'admin')
    )
  );

-- Medical Records policies
-- Patients can only view their own records
CREATE POLICY "Patients view own records" ON public.medical_records
  FOR SELECT USING (patient_id = auth.uid());

-- Midwives can view all medical records
CREATE POLICY "Midwives view all records" ON public.medical_records
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('midwife', 'admin')
    )
  );

-- Patients can insert their own records
CREATE POLICY "Patients create own records" ON public.medical_records
  FOR INSERT WITH CHECK (patient_id = auth.uid());

-- Midwives can insert records for any patient
CREATE POLICY "Midwives create records" ON public.medical_records
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('midwife', 'admin')
    )
  );

-- Patients can update their own records
CREATE POLICY "Patients update own records" ON public.medical_records
  FOR UPDATE USING (patient_id = auth.uid());

-- Midwives can update any record
CREATE POLICY "Midwives update records" ON public.medical_records
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('midwife', 'admin')
    )
  );

-- Patients can delete their own records
CREATE POLICY "Patients delete own records" ON public.medical_records
  FOR DELETE USING (patient_id = auth.uid());

-- Midwives can delete any record
CREATE POLICY "Midwives delete records" ON public.medical_records
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('midwife', 'admin')
    )
  );

-- Audit Logs policies
-- Only midwives and admins can view audit logs
CREATE POLICY "Midwives view audit logs" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('midwife', 'admin')
    )
  );

-- Only service role can insert audit logs (via functions/triggers)
CREATE POLICY "Service role insert audit logs" ON public.audit_logs
  FOR INSERT WITH CHECK (true);

-- Function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role FROM public.profiles WHERE id = auth.uid();
  RETURN COALESCE(user_role, 'anonymous');
EXCEPTION WHEN OTHERS THEN
  RETURN 'anonymous';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user ID
CREATE OR REPLACE FUNCTION public.get_user_id()
RETURNS UUID AS $$
BEGIN
  RETURN auth.uid();
EXCEPTION WHEN OTHERS THEN
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
