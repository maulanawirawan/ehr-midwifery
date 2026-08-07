# 🎯 CARA BUAT DEMO ACCOUNTS - EHR Midwifery

Karena ada network restriction dengan Supabase, cara paling reliable adalah **create manual via Supabase Dashboard**.

---

## ⚡ QUICK STEPS (2 MENIT)

### Step 1: Buka Supabase Dashboard
https://supabase.com/dashboard/project/cxgjsrwehvbcvmgquvev/auth/users

### Step 2: Klik "Add User" → "Invite User" atau "Create User"

**Bikin 3 akun ini:**

#### 👩‍⚕️ Akun Midwife (Doctor)
- Email: `midwife@ehr-demo.com`
- Password: `Midwife123!`
- Role di metadata JSON: `"midwife"`

#### 👤 Akun Patient 1
- Email: `patient1@ehr-demo.com`
- Password: `Patient123!`
- Role di metadata JSON: `"patient"`

#### 👤 Akun Patient 2
- Email: `patient2@ehr-demo.com`
- Password: `Patient123!`
- Role di metadata JSON: `"patient"`

### Step 3: Edit Metadata Setiap User
Setelah bikin user, klik "Edit" pada setiap user → Tab "Raw JSON" → Set field `role`:

```json
{
  "full_name": "Dr. Sari Wulandari",
  "phone": "081234567890",
  "role": "midwife"
}
```

Atau untuk patient:
```json
{
  "full_name": "Ani Ratnasari",
  "phone": "081234567891",
  "role": "patient"
}
```

### Step 4: Test Login!
```bash
cd D:\panduan_bimbingan_saja\ehr-midwifery
npm run dev
```

Kunjungi http://localhost:3000/login dan login dengan salah satu demo account.

---

## 📋 FULL DETAILS

### Demo Account Credentials Summary

| Role | Email | Password | Full Name | Phone |
|------|-------|----------|-----------|-------|
| Midwife | midwife@ehr-demo.com | Midwife123! | Dr. Sari Wulandari | 081234567890 |
| Patient 1 | patient1@ehr-demo.com | Patient123! | Ani Ratnasari | 081234567891 |
| Patient 2 | patient2@ehr-demo.com | Patient123! | Budi Santoso | 081234567892 |

### Where to Find in Dashboard

1. **Auth Users:** https://supabase.com/dashboard/project/cxgjsrwehvbcvmgquvev/auth/users
2. **Edit User Metadata:** Click "Edit" on any user → Raw JSON tab
3. **Profiles Table:** https://supabase.com/dashboard/project/cxgjsrwehvbcvmgquvev/editor?table=profiles

### What This Creates

- ✅ Auth users dalam `auth.users` table
- ✅ Profiles records dalam `profiles` table (via trigger)
- ✅ Proper role-based access control setup
- ✅ Ready for testing with 1 midwife + 2 patients

---

## 🧪 TESTING WORKFLOW

1. **Login sebagai Midwife:**
   - Email: `midwife@ehr-demo.com`
   - Password: `Midwife123!`
   - Action: Create medical record for patient

2. **Login sebagai Patient 1:**
   - Email: `patient1@ehr-demo.com`
   - Password: `Patient123!`
   - Action: View own records only

3. **Try creating a medical record with all 8 sections**
   - Identitas Pasien
   - Keluhan Utama
   - Riwayat Kesehatan
   - Pemeriksaan Fisik
   - Pemeriksaan Penunjang
   - Diagnosis
   - Tindakan/Asuhan
   - Rujukan

---

## ❓ TROUBLESHOOTING

### "User already exists" error saat signup
→ Delete user dari dashboard Auth → Signup ulang

### Profile doesn't get created automatically
→ Manually insert into profiles table via SQL Editor:
```sql
INSERT INTO profiles (id, email, full_name, role, phone, created_at, updated_at)
VALUES ('[USER_UUID]', 'email@test.com', 'Full Name', 'role', 'phone', NOW(), NOW());
```

### Can't login after creating user
→ Make sure migration 00002_rls_policies.sql has been run first

---

*Demo accounts ini untuk testing ONLY. Jangan gunakan password sama di production!* 🔐
