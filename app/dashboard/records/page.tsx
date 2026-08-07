'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { PlusCircle, Search, Filter, Download, FileText, Hospital } from 'lucide-react';

interface RecordData {
  id?: string;
  patientFullName?: string;
  patientBirthDate?: string;
  patientNik?: string;
  patientPhone?: string;
  patientAddress?: string;
  patientBloodType?: string;
  patientRhFactor?: string;
  patientAllergies?: string[];
  chiefComplaint?: string;
  complaintDuration?: string;
  complaintLocation?: string;
  diagnosisSummary?: string;
  treatmentPlan?: string;
  created_at?: string;
}

export default function RecordsPage() {
  const [records, setRecords] = useState<RecordData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data untuk demo
  const mockRecords: RecordData[] = [
    {
      id: '1',
      patientFullName: 'Siti Nurhaliza',
      patientBirthDate: '1985-03-15',
      patientNik: '3201234567890123',
      patientPhone: '081234567890',
      patientAddress: 'Jl. Merdeka No. 123, Jakarta',
      patientBloodType: 'A',
      patientRhFactor: '+',
      patientAllergies: ['Penicillin'],
      chiefComplaint: 'Nyeri perut bagian bawah',
      complaintDuration: '3 hari',
      complaintLocation: 'Hypogastrium',
      diagnosisSummary: 'Kehamilan 12 minggu dengan riwayat nyeri ringan',
      treatmentPlan: 'Observasi ketat, pemberian multivitamin, follow-up 2 minggu lagi',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      patientFullName: 'Rina Marlina',
      patientBirthDate: '1990-07-22',
      patientNik: '3201987654321098',
      patientPhone: '081987654321',
      patientAddress: 'Jl. Sudirman No. 45, Bandung',
      patientBloodType: 'O',
      patientRhFactor: '-',
      patientAllergies: [],
      chiefComplaint: 'Pusing dan mual',
      complaintDuration: '1 minggu',
      complaintLocation: 'Kepala (general)',
      diagnosisSummary: 'Kehamilan 8 minggu dengan morning sickness berat',
      treatmentPlan: 'Antiemetik, dietary modification, konsultasi gizi',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: '3',
      patientFullName: 'Ani Susanti',
      patientBirthDate: '1988-11-10',
      patientNik: '3201111122223333',
      patientPhone: '082345678901',
      patientAddress: 'Jl. Ahmad Yani No. 78, Surabaya',
      patientBloodType: 'B',
      patientRhFactor: '+',
      patientAllergies: ['Latex'],
      chiefComplaint: 'Perdarahan vagina ringan',
      complaintDuration: '2 hari',
      complaintLocation: 'Vagina',
      diagnosisSummary: 'Kehamilan 6 minggu threatened abortion',
      treatmentPlan: 'Bed rest, observation, ultrasonography follow-up 1 minggu',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
    {
      id: '4',
      patientFullName: 'Dewi Lestari',
      patientBirthDate: '1992-05-05',
      patientNik: '3201444455556666',
      patientPhone: '083456789012',
      patientAddress: 'Jl. Thamrin No. 99, Medan',
      patientBloodType: 'AB',
      patientRhFactor: '+',
      patientAllergies: ['Seafood'],
      chiefComplaint: 'Kontraksi teratur',
      complaintDuration: '6 jam',
      complaintLocation: 'Abdomen',
      diagnosisSummary: 'Persalinan aktif trimester III',
      treatmentPlan: 'Monitoring partus, persiapan persalinan, konseling persalinan natural',
      created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    },
    {
      id: '5',
      patientFullName: 'Fitri Handayani',
      patientBirthDate: '1987-09-18',
      patientNik: '3201777788889999',
      patientPhone: '084567890123',
      patientAddress: 'Jl. Asia Afrika No. 32, Bali',
      patientBloodType: 'A',
      patientRhFactor: '-',
      patientAllergies: ['Ibuprofen'],
      chiefComplaint: 'Check-up kehamilan rutin',
      complaintDuration: '-',
      complaintLocation: '-',
      diagnosisSummary: 'Kehamilan sehat 28 minggu, fetal position normal',
      treatmentPlan: 'Continuing prenatal care, nutritional counseling, birth plan discussion',
      created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
    },
  ];

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/records');
      if (!response.ok) throw new Error('Failed to fetch records');
      const data = await response.json();
      
      // Jika API kosong, gunakan mock data
      setRecords(data.length > 0 ? data : mockRecords);
    } catch (error) {
      console.error('Error fetching records:', error);
      // Gunakan mock data jika API error
      setRecords(mockRecords);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRecords = records.filter(record =>
    record.patientFullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosisSummary?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">EHR Midwifery</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.print()}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Data
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Hospital className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Dr. Sari (Midwife)</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Medical Records</h2>
              <p className="text-slate-600">Manage and view maternity patient health records</p>
            </div>
            
            <button 
              onClick={() => window.location.href = '/auth/signup'}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <PlusCircle className="w-5 h-5" />
              New Patient
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search patients by name or diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-3 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                <Filter className="w-5 h-5" />
                Filter
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-3 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Records Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-2/3 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-200 rounded"></div>
                  <div className="h-3 bg-slate-200 rounded"></div>
                  <div className="h-3 bg-slate-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No records found</h3>
            <p className="text-slate-600 mb-6">{searchTerm ? 'Try different search terms' : 'Start by adding a new patient record'}</p>
            <button 
              onClick={() => window.location.href = '/auth/signup'}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <PlusCircle className="w-5 h-5" />
              Add New Patient
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map((record) => (
              <div 
                key={record.id} 
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors">
                      <Hospital className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{record.patientFullName || 'Unknown Patient'}</h3>
                      <p className="text-sm text-slate-600">ID: {record.patientNik || 'N/A'}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    record.diagnosisSummary?.includes('Kehamilan') 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    Pregnancy
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Chief Complaint</p>
                    <p className="text-sm text-slate-900 line-clamp-2">{record.chiefComplaint || 'Not recorded'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Diagnosis</p>
                    <p className="text-sm text-slate-900 line-clamp-3">{record.diagnosisSummary || 'Not recorded'}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    {new Date(record.created_at || Date.now()).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View Details →</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
