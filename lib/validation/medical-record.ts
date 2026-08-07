import { z } from 'zod'

// Section 1: Identitas Pasien
const section1Schema = z.object({
  patientFullName: z.string().min(2, 'Full name is required'),
  patientBirthDate: z.string().date(),
  patientNik: z.string().optional().nullable(),
  patientPhone: z.string().optional().nullable(),
  patientAddress: z.string().min(5, 'Address is required'),
  patientBloodType: z.string().optional().nullable(),
  patientRhFactor: z.string().optional().nullable(),
  patientAllergies: z.array(z.string()).optional().nullable(),
})

// Section 2: Keluhan Utama
const section2Schema = z.object({
  chiefComplaint: z.string().min(5, 'Chief complaint must be at least 5 characters'),
  complaintDuration: z.string().optional().nullable(),
  complaintLocation: z.string().optional().nullable(),
})

// Section 3: Riwayat Kesehatan
const section3Schema = z.object({
  pastMedicalHistory: z.string().optional().nullable(),
  familyMedicalHistory: z.string().optional().nullable(),
  medications: z.array(z.string()).optional().nullable(),
})

// Section 4: Pemeriksaan Fisik - use JSON string for flexibility
const section4Schema = z.object({
  physicalFindings: z.string().optional().nullable(),
  vitalSigns: z.string().optional().nullable(), // Will store as JSON string
})

// Section 5: Pemeriksaan Penunjang - use JSON string for flexibility
const section5Schema = z.object({
  labTests: z.string().optional().nullable(), // Will store as JSON string
  radiologyReports: z.string().optional().nullable(),
})

// Section 6: Diagnosis
const section6Schema = z.object({
  diagnosisSummary: z.string().min(5, 'Diagnosis summary is required'),
  icd10Code: z.string().optional().nullable(),
})

// Section 7: Tindakan/Asuhan
const section7Schema = z.object({
  treatments: z.array(z.string()).optional().nullable(),
  medicationsPrescribed: z.array(z.string()).optional().nullable(),
  followUpInstructions: z.string().optional().nullable(),
  followUpDate: z.string().date().optional().nullable(),
})

// Section 8: Rujukan
const section8Schema = z.object({
  isReferralNeeded: z.boolean().default(false),
  referralFacility: z.string().optional().nullable(),
  referralReason: z.string().optional().nullable(),
})

// Combined schema
export const medicalRecordSchema = z.object({
  id: z.string().optional(),
  section1: section1Schema,
  section2: section2Schema,
  section3: section3Schema,
  section4: section4Schema,
  section5: section5Schema,
  section6: section6Schema,
  section7: section7Schema,
  section8: section8Schema,
})

export type MedicalRecordData = z.infer<typeof medicalRecordSchema>

export type Section1Data = z.infer<typeof section1Schema>
export type Section2Data = z.infer<typeof section2Schema>
export type Section3Data = z.infer<typeof section3Schema>
export type Section4Data = z.infer<typeof section4Schema>
export type Section5Data = z.infer<typeof section5Schema>
export type Section6Data = z.infer<typeof section6Schema>
export type Section7Data = z.infer<typeof section7Schema>
export type Section8Data = z.infer<typeof section8Schema>
