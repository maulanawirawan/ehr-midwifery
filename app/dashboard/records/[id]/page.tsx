'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Printer, Download, FileText, Calendar, MapPin, Phone, Mail, Baby, Activity, Shield } from 'lucide-react';

interface PatientRecord {
  id: string;
  patientFullName: string;
  patientBirthDate: string;
  patientNik: string;
  patientPhone: string;
  patientAddress: string;
  patientEmail?: string;
  patientBloodType: string;
  patientRhFactor: string;
  patientAllergies?: string[];
  chiefComplaint: string;
  complaintDuration: string;
  complaintLocation: string;
  diagnosisSummary: string;
  treatmentPlan: string;
  created_at: string;
  vitalSigns?: {
    bloodPressure?: string;
    heartRate?: string;
    temperature?: string;
    respiratoryRate?: string;
    weight?: string;
    height?: string;
  };
  examinationNotes?: string;
  medicationPlan?: string;
  followUpDate?: string;
}

export default function RecordDetailPage() {
  const params = useParams();
  const router = useRouter();
  const recordId = params?.id as string;

  const [record, setRecord] = useState<PatientRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (recordId) {
      fetchRecordDetails(recordId);
    }
  }, [recordId]);

  // Mock data untuk demo - ini bisa diganti dengan real API call
  const mockRecords: Record<string, PatientRecord> = {
    '1': {
      id: '1',
      patientFullName: 'Siti Nurhaliza',
      patientBirthDate: '1985-03-15',
      patientNik: '3201234567890123',
      patientPhone: '081234567890',
      patientEmail: 'siti.nurhaliza@email.com',
      patientAddress: 'Jl. Merdeka No. 123, Jakarta',
      patientBloodType: 'A',
      patientRhFactor: '+',
      patientAllergies: ['Penicillin'],
      chiefComplaint: 'Nyeri perut bagian bawah',
      complaintDuration: '3 hari',
      complaintLocation: 'Hypogastrium',
      diagnosisSummary: 'Kehamilan 12 minggu dengan riwayat nyeri ringan',
      treatmentPlan: 'Observasi ketat, pemberian multivitamin, folat daily, follow-up 2 minggu lagi',
      created_at: new Date().toISOString(),
      vitalSigns: {
        bloodPressure: '110/70 mmHg',
        heartRate: '78 bpm',
        temperature: '36.8°C',
        respiratoryRate: '16 rpm',
        weight: '58 kg',
        height: '160 cm',
      },
      examinationNotes: 'Palpasi abdomen lunak, tidak ada nyeri tekan. USG menunjukkan fetus tunggal dalam presentasi kepala. Detak jantung janin terdengar baik 140 bpm.',
      medicationPlan: 'Multivitamin prenatal 1 tablet/hari, Asam Folat 400mcg/hari',
      followUpDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    '2': {
      id: '2',
      patientFullName: 'Rina Marlina',
      patientBirthDate: '1990-07-22',
      patientNik: '3201987654321098',
      patientPhone: '081987654321',
      patientEmail: 'rina.marlina@email.com',
      patientAddress: 'Jl. Sudirman No. 45, Bandung',
      patientBloodType: 'O',
      patientRhFactor: '-',
      patientAllergies: [],
      chiefComplaint: 'Pusing dan mual',
      complaintDuration: '1 minggu',
      complaintLocation: 'Kepala (general)',
      diagnosisSummary: 'Kehamilan 8 minggu dengan morning sickness berat',
      treatmentPlan: 'Antiemetik sesuai kebutuhan, dietary modification kecil tapi sering, konsultasi gizi',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      vitalSigns: {
        bloodPressure: '100/65 mmHg',
        heartRate: '82 bpm',
        temperature: '36.5°C',
        respiratoryRate: '18 rpm',
        weight: '52 kg',
        height: '158 cm',
      },
      examinationNotes: 'Pasien terlihat lemas, terdapat dehidrasi ringan. USG trimester I normal, gestational sac terlihat jelas.',
      medicationPlan: 'Vitamin B6 10mg 3x1/hari sebelum makan, Gantanol 125mg jika perlu',
      followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    '3': {
      id: '3',
      patientFullName: 'Ani Susanti',
      patientBirthDate: '1988-11-10',
      patientNik: '3201111122223333',
      patientPhone: '082345678901',
      patientEmail: 'ani.susanti@email.com',
      patientAddress: 'Jl. Ahmad Yani No. 78, Surabaya',
      patientBloodType: 'B',
      patientRhFactor: '+',
      patientAllergies: ['Latex'],
      chiefComplaint: 'Perdarahan vagina ringan',
      complaintDuration: '2 hari',
      complaintLocation: 'Vagina',
      diagnosisSummary: 'Kehamilan 6 minggu threatened abortion',
      treatmentPlan: 'Bed rest total, observation ketat, ultrasonography follow-up 1 minggu, hemoglobin monitoring',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      vitalSigns: {
        bloodPressure: '120/80 mmHg',
        heartRate: '88 bpm',
        temperature: '37.0°C',
        respiratoryRate: '16 rpm',
        weight: '60 kg',
        height: '162 cm',
      },
      examinationNotes: 'Inspekulo vagina: sedikit perdarahan aktif dari ostium uteri internal. USG transvaginal: gestational sac 6mm, tidak terdeteksi yolk sac atau embryo.',
      medicationPlan: 'Progesteron support (Duphaston 10mg 2x1/hari), Iron supplementation',
      followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    '4': {
      id: '4',
      patientFullName: 'Dewi Lestari',
      patientBirthDate: '1992-05-05',
      patientNik: '3201444455556666',
      patientPhone: '083456789012',
      patientEmail: 'dwi.lestari@email.com',
      patientAddress: 'Jl. Thamrin No. 99, Medan',
      patientBloodType: 'AB',
      patientRhFactor: '+',
      patientAllergies: ['Seafood'],
      chiefComplaint: 'Kontraksi teratur',
      complaintDuration: '6 jam',
      complaintLocation: 'Abdomen',
      diagnosisSummary: 'Persalinan aktif trimester III',
      treatmentPlan: 'Monitoring partus, preparedness persalinan vaginal, analgesia epidural available, konseling persalinan natural',
      created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
      vitalSigns: {
        bloodPressure: '130/85 mmHg',
        heartRate: '92 bpm',
        temperature: '37.2°C',
        respiratoryRate: '20 rpm',
        weight: '72 kg',
        height: '165 cm',
      },
      examinationNotes: 'Vaginal exam: dilatasi 5cm, effacement 70%, station 0, membran ruptured spontanea. Kontraksi setiap 3 menit durasi 45 detik.',
      medicationPlan: 'Epidural analgesia requested, IV fluids maintenance',
      followUpDate: new Date().toISOString(),
    },
    '5': {
      id: '5',
      patientFullName: 'Fitri Handayani',
      patientBirthDate: '1987-09-18',
      patientNik: '3201777788889999',
      patientPhone: '084567890123',
      patientEmail: 'fitri.handayani@email.com',
      patientAddress: 'Jl. Asia Afrika No. 32, Bali',
      patientBloodType: 'A',
      patientRhFactor: '-',
      patientAllergies: ['Ibuprofen'],
      chiefComplaint: 'Check-up kehamilan rutin',
      complaintDuration: '-',
      complaintLocation: '-',
      diagnosisSummary: 'Kehamilan sehat 28 minggu, fetal position vertex normal',
      treatmentPlan: 'Continuing prenatal care schedule, nutritional counseling, birth plan discussion,胎教 education',
      created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
      vitalSigns: {
        bloodPressure: '115/75 mmHg',
        heartRate: '76 bpm',
        temperature: '36.6°C',
        respiratoryRate: '16 rpm',
        weight: '65 kg',
        height: '163 cm',
      },
      examinationNotes: 'Fundal height 28cm, fetal heart rate 140 bpm regular. CTG reassuring. Ultrasound 28 minggu: fetal growth appropriate for gestational age.',
      medicationPlan: 'Iron-folate supplement, Calcium 1000mg/day, Vitamin D',
      followUpDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
  };

  const fetchRecordDetails = async (id: string) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`/api/records/${id}`);
      if (response.ok) {
        const data = await response.json();
        setRecord(data);
      } else {
        const mockData = mockRecords[id];
        if (mockData) {
          setRecord(mockData);
        } else {
          setError('Record not found');
        }
      }
    } catch (error) {
      console.error('Error fetching record:', error);
      const mockData = mockRecords[recordId];
      if (mockData) {
        setRecord(mockData);
      } else {
        setError('Failed to load record');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading patient record...</p>
        </div>
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center border border-slate-200">
          <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Record Not Found</h2>
          <p className="text-slate-700 mb-6">{error || 'The requested patient record does not exist.'}</p>
          <button 
            onClick={() => router.push('/dashboard/records')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Records
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 print:bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-300 sticky top-0 z-40 shadow-sm print:hidden">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.push('/dashboard/records')}
              className="inline-flex items-center gap-2 text-slate-700 hover:text-blue-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Records List</span>
            </button>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:text-blue-700 transition-colors border border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 font-medium"
              >
                <Printer className="w-4 h-4" />
                Print Record
              </button>
              <button 
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:text-blue-700 transition-colors border border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 font-medium"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 print:p-0">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white mb-8 print:bg-white print:text-black print:shadow-none print:border print:border-slate-300">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Baby className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{record.patientFullName}</h1>
                <div className="flex flex-wrap gap-4 text-sm opacity-90">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    ID: {record.patientNik}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    record.diagnosisSummary.includes('Kehamilan') 
                      ? 'bg-green-100 text-green-900' 
                      : 'bg-blue-100 text-blue-900'
                  }`}>
                    {record.diagnosisSummary.includes('Persalinan') ? 'Active Labor' : 'Pregnancy'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right text-sm opacity-90">
              <p>Record Created</p>
              <p className="font-semibold mt-1">{formatDate(record.created_at)}</p>
            </div>
          </div>
        </div>

        {/* Patient Information Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Contact Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-slate-500 mt-0.5" />
                <span className="font-medium text-slate-900">{record.patientPhone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 mt-0.5" />
                <span className="line-clamp-2 text-slate-900">{record.patientAddress}</span>
              </div>
              {record.patientEmail && (
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-slate-500 mt-0.5" />
                  <span className="text-slate-900">{record.patientEmail}</span>
                </div>
              )}
            </div>
          </div>

          {/* Vital Signs */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-600" />
              Vital Signs
            </h3>
            {record.vitalSigns ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-700">Blood Pressure:</span>
                  <span className="font-bold text-slate-900">{record.vitalSigns.bloodPressure}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-700">Heart Rate:</span>
                  <span className="font-bold text-slate-900">{record.vitalSigns.heartRate}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-700">Temperature:</span>
                  <span className="font-bold text-slate-900">{record.vitalSigns.temperature}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-700">Respiratory:</span>
                  <span className="font-bold text-slate-900">{record.vitalSigns.respiratoryRate}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-700">Weight:</span>
                  <span className="font-bold text-slate-900">{record.vitalSigns.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Height:</span>
                  <span className="font-bold text-slate-900">{record.vitalSigns.height}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-700">No vital signs recorded</p>
            )}
          </div>

          {/* Blood Type & Allergies */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              Medical Info
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-slate-700">Blood Type:</span>
                <span className="ml-2 font-bold text-xl text-red-600">{record.patientBloodType}{record.patientRhFactor}</span>
              </div>
              <div>
                <span className="text-slate-700">Birth Date:</span>
                <span className="ml-2 text-slate-900 font-medium">{new Date(record.patientBirthDate).toLocaleDateString('id-ID')}</span>
              </div>
              {record.patientAllergies && record.patientAllergies.length > 0 && (
                <div>
                  <span className="text-slate-700">Allergies:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {record.patientAllergies.map((allergy, i) => (
                      <span key={i} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-lg font-medium">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Clinical Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Chief Complaint */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-600" />
              Chief Complaint
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-slate-700">Complaint:</span>
                <p className="font-medium text-slate-900 mt-1">{record.chiefComplaint}</p>
              </div>
              <div>
                <span className="text-slate-700">Duration:</span>
                <span className="ml-2 text-slate-900 font-medium">{record.complaintDuration}</span>
              </div>
              <div>
                <span className="text-slate-700">Location:</span>
                <span className="ml-2 text-slate-900 font-medium">{record.complaintLocation}</span>
              </div>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Baby className="w-5 h-5 text-pink-600" />
              Diagnosis
            </h3>
            <div>
              <p className="text-slate-900 leading-relaxed font-medium">{record.diagnosisSummary}</p>
            </div>
          </div>
        </div>

        {/* Treatment Plan */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6 mb-8">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Treatment Plan
          </h3>
          <div className="text-slate-900 leading-relaxed font-medium">{record.treatmentPlan}</div>
          
          {record.medicationPlan && (
            <>
              <h4 className="font-semibold text-slate-900 mt-6 mb-3">Medication Plan</h4>
              <p className="text-slate-900">{record.medicationPlan}</p>
            </>
          )}
          
          {record.examinationNotes && (
            <>
              <h4 className="font-semibold text-slate-900 mt-6 mb-3">Examination Notes</h4>
              <p className="text-slate-900">{record.examinationNotes}</p>
            </>
          )}
          
          {record.followUpDate && (
            <div className="mt-6 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-700">Follow-up Appointment:</p>
              <p className="text-lg font-bold text-blue-600 mt-1">{formatDate(record.followUpDate)}</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-300 p-6 print:hidden">
        <div className="container mx-auto text-center text-sm text-slate-700">
          <p>EHR Midwifery System © 2024 | Printed on {new Date().toLocaleDateString('id-ID')}</p>
        </div>
      </footer>
    </div>
  );
}
