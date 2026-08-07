'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Download, PlusCircle, Edit, Trash2, Mail, Phone, Calendar, Baby, HeartPulse } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  nik: string;
  phone: string;
  email: string;
  birthDate: string;
  address: string;
  bloodType: string;
  rhFactor: string;
  allergies: string[];
  role: 'patient' | 'midwife';
  status: 'active' | 'inactive' | 'pending';
}

// Mock patients data - BEREASA PASTI BEDA antara Patient dan Midwife!
const MOCK_PATIENTS: Patient[] = [
  // PATIENT DATA (PASIENTEN YANG DIAMATI BIDAN)
  {
    id: '1',
    name: 'Siti Nurhaliza',
    nik: '3201234567890123',
    phone: '081234567890',
    email: 'siti.nurhaliza@email.com',
    birthDate: '1985-03-15',
    address: 'Jl. Merdeka No. 123, Jakarta',
    bloodType: 'A',
    rhFactor: '+',
    allergies: ['Penicillin'],
    role: 'patient',
    status: 'active',
  },
  {
    id: '2',
    name: 'Rina Marlina',
    nik: '3201987654321098',
    phone: '081987654321',
    email: 'rina.marlina@email.com',
    birthDate: '1990-07-22',
    address: 'Jl. Sudirman No. 45, Bandung',
    bloodType: 'O',
    rhFactor: '-',
    allergies: [],
    role: 'patient',
    status: 'active',
  },
  {
    id: '3',
    name: 'Ani Susanti',
    nik: '3201111122223333',
    phone: '082345678901',
    email: 'ani.susanti@email.com',
    birthDate: '1988-11-10',
    address: 'Jl. Ahmad Yani No. 78, Surabaya',
    bloodType: 'B',
    rhFactor: '+',
    allergies: ['Latex'],
    role: 'patient',
    status: 'active',
  },
  
  // MIDWIFE DATA (BIDAN YANG MEMILIKI AKUN)
  {
    id: '4',
    name: 'Dr. Sari Wulandari',
    nik: 'NIP-198503152008012001',
    phone: '081234567890',
    email: 'dr.sari@medicare.id',
    birthDate: '1985-03-15',
    address: 'Klinik Sehat Selalu, Jl. Kesehatan No. 1, Jakarta',
    bloodType: 'O',
    rhFactor: '+',
    allergies: [],
    role: 'midwife',
    status: 'active',
  },
  {
    id: '5',
    name: 'Bidan Siti Aminah',
    nik: 'NIP-199007222015012002',
    phone: '081987654321',
    email: 'bidat.siti@medicare.id',
    birthDate: '1990-07-22',
    address: 'Puskesmas Mawar Indah, Bandung',
    bloodType: 'A',
    rhFactor: '-',
    allergies: ['Penicillin'],
    role: 'midwife',
    status: 'active',
  },
];

export default function PatientsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'patient' | 'midwife'>('all');
  
  const filteredPatients = MOCK_PATIENTS.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    const matchesRole = filterRole === 'all' || patient.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-300 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">Patient Management</h1>
            </div>
            
            <button 
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:text-blue-600 transition-colors border border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">All Patients & Providers</h2>
          <p className="text-slate-600">Manage and view all registered patients and healthcare providers</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
            <p className="text-sm text-slate-600 mb-2">Total Records</p>
            <p className="text-3xl font-bold text-slate-900">{MOCK_PATIENTS.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
            <p className="text-sm text-slate-600 mb-2">Patients</p>
            <p className="text-3xl font-bold text-pink-600">{MOCK_PATIENTS.filter(p => p.role === 'patient').length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
            <p className="text-sm text-slate-600 mb-2">Midwives</p>
            <p className="text-3xl font-bold text-blue-600">{MOCK_PATIENTS.filter(p => p.role === 'midwife').length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
            <p className="text-sm text-slate-600 mb-2">Active Status</p>
            <p className="text-3xl font-bold text-green-600">{MOCK_PATIENTS.filter(p => p.status === 'active').length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as any)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="patient">Patients Only</option>
              <option value="midwife">Midwives Only</option>
            </select>
            
            <button className="inline-flex items-center gap-2 px-4 py-3 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
              <Filter className="w-5 h-5" />
              Filter
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-3 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-300 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Name</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Role</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Email</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Phone</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Blood Type</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          patient.role === 'midwife' ? 'bg-blue-100' : 'bg-pink-100'
                        }`}>
                          {patient.role === 'midwife' ? (
                            <HeartPulse className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Baby className="w-5 h-5 text-pink-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{patient.name}</p>
                          <p className="text-xs text-slate-500">{patient.nik}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        patient.role === 'midwife' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-pink-100 text-pink-700'
                      }`}>
                        {patient.role === 'midwife' ? '👩‍⚕️ Midwife' : '👤 Patient'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <a href={`mailto:${patient.email}`} className="text-slate-600 hover:text-blue-600 text-sm">
                        {patient.email}
                      </a>
                    </td>
                    <td className="py-4 px-6">
                      <a href={`tel:${patient.phone}`} className="text-slate-600 hover:text-blue-600 text-sm">
                        {patient.phone}
                      </a>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-red-600">{patient.bloodType}{patient.rhFactor}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        patient.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPatients.length === 0 && (
            <div className="p-12 text-center">
              <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No records found</h3>
              <p className="text-slate-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
