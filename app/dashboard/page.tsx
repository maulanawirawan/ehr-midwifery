'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Users, Activity, Calendar, PlusCircle, ArrowRight, Baby, Shield } from 'lucide-react';

interface User {
  fullName?: string;
  role?: string;
}

interface MidwifeStats {
  totalPatients: number;
  activePregnancies: number;
  upcomingAppointments: number;
  recentRecords: number;
  todayVisits: number;
  weeklyGrowth: string;
}

interface PatientStats {
  myPregnancies: number;
  upComingCheckups: number;
  lastVisit: string;
  healthScore: string;
  medicationRefills: number;
  notifications: number;
}

// Mock statistics
const getStatistics = (role: string): MidwifeStats | PatientStats => {
  if (role === 'midwife') {
    return {
      totalPatients: 15,
      activePregnancies: 8,
      upcomingAppointments: 3,
      recentRecords: 5,
      todayVisits: 4,
      weeklyGrowth: '+12%',
    };
  } else {
    return {
      myPregnancies: 1,
      upComingCheckups: 2,
      lastVisit: '3 months ago',
      healthScore: '85%',
      medicationRefills: 1,
      notifications: 3,
    };
  }
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<MidwifeStats | PatientStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage or check auth
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setStats(getStatistics(userData.role));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const isMidwife = user?.role === 'midwife';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-300 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">EHR Midwifery</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/dashboard/records')}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Records
              </button>
              <button 
                onClick={() => router.push('/dashboard/patients')}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Patients
              </button>
              <button 
                onClick={() => router.push('/dashboard/analytics')}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Analytics
              </button>
              
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  {isMidwife ? (
                    <Shield className="w-4 h-4 text-white" />
                  ) : (
                    <Baby className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {user?.fullName || 'Guest'} ({isMidwife ? 'Midwife' : 'Patient'})
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {isMidwife ? `Welcome back, Dr. ${user?.fullName}` : 'Welcome back!'}
          </h2>
          <p className="text-slate-600">
            {isMidwife 
              ? 'Manage your maternity patients and view clinical records' 
              : 'Track your pregnancy journey and upcoming appointments'}
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isMidwife && stats && (
            <>
              {/* Total Patients */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                  <span className="text-2xl font-bold text-slate-900">{stats.totalPatients}</span>
                </div>
                <p className="text-sm text-slate-600">Total Patients</p>
              </div>

              {/* Active Pregnancies */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Baby className="w-8 h-8 text-pink-600" />
                  <span className="text-2xl font-bold text-slate-900">{stats.activePregnancies}</span>
                </div>
                <p className="text-sm text-slate-600">Active Pregnancies</p>
              </div>

              {/* Today Visits */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                  <span className="text-2xl font-bold text-slate-900">{stats.todayVisits}</span>
                </div>
                <p className="text-sm text-slate-600">Today's Visits</p>
              </div>

              {/* Weekly Growth */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-8 h-8 text-purple-600" />
                  <span className="text-2xl font-bold text-slate-900">{stats.weeklyGrowth}</span>
                </div>
                <p className="text-sm text-slate-600">Weekly Growth</p>
              </div>
            </>
          )}

          {!isMidwife && stats && (
            <>
              {/* My Pregnancies */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Baby className="w-8 h-8 text-pink-600" />
                  <span className="text-2xl font-bold text-slate-900">{stats.myPregnancies}</span>
                </div>
                <p className="text-sm text-slate-600">My Pregnancies</p>
              </div>

              {/* Upcoming Checkups */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                  <span className="text-2xl font-bold text-slate-900">{stats.upComingCheckups}</span>
                </div>
                <p className="text-sm text-slate-600">Upcoming Checkups</p>
              </div>

              {/* Health Score */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-8 h-8 text-blue-600" />
                  <span className="text-2xl font-bold text-slate-900">{stats.healthScore}</span>
                </div>
                <p className="text-sm text-slate-600">Health Score</p>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
                <div className="flex items-center justify-between mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="text-2xl font-bold text-slate-900">{stats.notifications}</span>
                </div>
                <p className="text-sm text-slate-600">Notifications</p>
              </div>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {isMidwife ? (
            <>
              <button 
                onClick={() => router.push('/dashboard/records/new')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 p-6 text-left"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <PlusCircle className="w-10 h-10 text-white mb-3" />
                    <h3 className="text-xl font-semibold text-white mb-2">New Medical Record</h3>
                    <p className="text-blue-100 text-sm">Create new patient medical record</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-white mt-4 opacity-70" />
                </div>
              </button>

              <button 
                onClick={() => router.push('/dashboard/patients')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 p-6 text-left"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <Users className="w-10 h-10 text-white mb-3" />
                    <h3 className="text-xl font-semibold text-white mb-2">Patient Management</h3>
                    <p className="text-green-100 text-sm">View and manage all patients</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-white mt-4 opacity-70" />
                </div>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => router.push('/dashboard/records')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 p-6 text-left"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <FileText className="w-10 h-10 text-white mb-3" />
                    <h3 className="text-xl font-semibold text-white mb-2">My Medical Records</h3>
                    <p className="text-blue-100 text-sm">View your healthcare history</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-white mt-4 opacity-70" />
                </div>
              </button>

              <button 
                onClick={() => router.push('/dashboard/analytics')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 p-6 text-left"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <Activity className="w-10 h-10 text-white mb-3" />
                    <h3 className="text-xl font-semibold text-white mb-2">Health Analytics</h3>
                    <p className="text-purple-100 text-sm">Track your health progress</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-white mt-4 opacity-70" />
                </div>
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
