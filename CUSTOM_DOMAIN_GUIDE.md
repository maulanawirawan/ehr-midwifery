# 🌐 CUSTOM DOMAIN SETUP - EHR MIDWIFERY

## 🔴 MASALAH SAAT INI
URL saat ini: `ehr-midwifery-dmpnk68h7-maulanawirawans-projects.vercel.app`  
Ada nama user (`maulanawirawans`) di URL, tidak clean seperti `ngambis.vercel.app`

---

## ✅ SOLUSI 1: CUSTOM DOMAIN (RECOMMENDED)

### Option A: Gunakan Custom Domain Sendiri (BEST)
Beli domain profesional dan hubungkan ke Vercel:

```
contoh: ehr-midwifery.com atau medicalrecords.id
```

**Cara Setup:**

1. **Beli Domain** di penyedia domain:
   - Namecheap (~$5/tahun)
   - Google Domains (~$12/tahun)
   - Idcloudhost (~Rp 75k/tahun)

2. **Hubungkan ke Vercel:**
   ```
   Dashboard Vercel → Settings → Domains
   Tambahkan: ehr-midwifery.com
   Ikuti instruksi DNS setup
   ```

3. **DNS Configuration** (di domain provider):
   ```
   Type: CNAME
   Name: www (atau @)
   Value: cname.vercel-dns.com
   TTL: Automatic
   ```

4. **Tunggu 24-48 jam** untuk DNS propagation

### Option B: Free Vercel Subdomain (NO USERNAME)

Gunakan free subdomain Vercel tanpa nama user:

```bash
# Rename project di Vercel Dashboard
# https://vercel.com/dashboard/projects/ehr-midwifery/settings/general

Project Name: "ehr-midwifery"
Framework Preset: Next.js
Build Command: next build
Output Directory: .next

Setelah rename, URL baru akan jadi:
https://ehr-midwifery.vercel.app  ← NO USERNAME!
```

**Steps:**
1. Buka https://vercel.com/dashboard
2. Klik project `ehr-midwifery`
3. Settings → General → Project Name
4. Rename dari `maulanawirawans-projects/ehr-midwifery` menjadi `ehr-midwifery`
5. Push commit baru dengan command:
   ```bash
   git commit -m "rename: update project name"
   git push origin main
   ```
6. Vercel auto-deploy dengan URL baru tanpa username

---

## ✅ SOLUSI 2: SHORT SUBDOMAIN (QUICK FIX)

Jika ingin solusi cepat tanpa domain purchase:

**Opsi 1 - Ganti Project Name via Vercel CLI:**
```bash
cd D:\panduan_bimbingan_saja\ehr-midwifery
vercel alias clear https://ehr-midwifery-dmpnk68h7-maulanawirawans-projects.vercel.app
vercel alias set https://ehr-midwifery.vercel.app
```

**Opsi 2 - Create New Alias Directly:**
```bash
vercel --prod
# Vercel akan ask "Do you want to create a new alias?"
# Answer "yes" and enter custom alias name
```

---

## 🎯 RECOMMENDATION

**Untuk Tugas Kuliah (Professional Look):**
- **Option terbaik:** Beli domain `.id` (Indonesia) ~Rp 75k/tahun
- Domain: `ehr-midwifery-kb1.kbid.or.id` atau `medicalrecords.student.id`
- Lebih professional & memorable

**Untuk Demo Sederhana:**
- Use `ehr-midwifery.vercel.app` (remove username via rename)
- Quick & free, cukup untuk demo

---

## 📋 COMPARISON

| Option | Cost | Professional | Difficulty | Time |
|--------|------|--------------|------------|------|
| Custom Domain (.com/.id) | Rp 75k-200k/tahun | ⭐⭐⭐⭐⭐ | Medium | 1-2 days |
| Vercel Renamed Subdomain | FREE | ⭐⭐⭐ | Easy | 5 mins |
| Original Username URL | FREE | ⭐⭐ | None | Done |

---

## 🚀 QUICK START GUIDE

**Pilih opsi yang sesuai:**

### Opsi Cepat (Free, No Commit Needed):
1. Buka https://vercel.com/dashboard
2. Klik project Ehr Midwifery
3. Go to Settings → Projects
4. Change Project Name from "maulanawirawans-projects/ehr-midwifery" to "ehr-midwifery"
5. Click "Save"
6. Wait for deployment with new name
7. Test: `https://ehr-midwifery.vercel.app/login` ✅

### Opsi Professional (Paid Domain):
1. Buy domain at Namecheap/IdCloudHost
2. Configure CNAME in Vercel Dashboard
3. Wait 24-48 hours for DNS
4. Result: `https://ehr-midwifery.com` or `https://ehr-midwifery.id` ✅

---

*Choose based on your needs & budget!* 💰
