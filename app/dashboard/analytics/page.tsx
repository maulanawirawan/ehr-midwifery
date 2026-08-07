'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, TrendingUp, Users, Calendar, Download, ArrowLeft } from 'lucide-react';

export default function AnalyticsPage() {
  const router = useRouter();

  // Mock analytics data
  const analyticsData = {
    totalVisits: 245,
    newPatients: 68,
    avgConsultationTime: '25 min',
    patientSatisfaction: '94%',
    thisMonth: { visits: 42, appointments: 28, newPatients: 15 },
    lastMonth: { visits: 38, appointments: 24, newPatients: 12 },
    trends: [
      { month: 'Jan', visits: 35, newPatients: 8 },
      { month: 'Feb', visits: 38, newPatients: 10 },
      { month: 'Mar', visits: 42, newPatients: 12 },
      { month: 'Apr', visits: 45, newPatients: 14 },
      { month: 'May', visits: 48, newPatients: 15 },
      { month: 'Jun', visits: 52, newPatients: 17 },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-300 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.push('/dashboard')}
              className="inline-flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-900">Healthcare Analytics</h1>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:text-blue-600 transition-colors border border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 font-medium">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Analytics & Insights</h2>
          <p className="text-slate-600">Track your practice performance and patient engagement metrics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-5 h-5 opacity-60" />
            </div>
            <p className="text-blue-100 text-sm mb-1">Total Visits</p>
            <p className="text-3xl font-bold">{analyticsData.totalVisits}</p>
            <p className="text-blue-100 text-xs mt-2">+12% from last month</p>
          </div>

          <div className="bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-5 h-5 opacity-60" />
            </div>
            <p className="text-pink-100 text-sm mb-1">New Patients</p>
            <p className="text-3xl font-bold">{analyticsData.newPatients}</p>
            <p className="text-pink-100 text-xs mt-2">+18% from last month</p>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-5 h-5 opacity-60" />
            </div>
            <p className="text-green-100 text-sm mb-1">Avg Consultation</p>
            <p className="text-3xl font-bold">{analyticsData.avgConsultationTime}</p>
            <p className="text-green-100 text-xs mt-2">-3 min faster</p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-violet-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-5 h-5 opacity-60" />
            </div>
            <p className="text-purple-100 text-sm mb-1">Satisfaction</p>
            <p className="text-3xl font-bold">{analyticsData.patientSatisfaction}</p>
            <p className="text-purple-100 text-xs mt-2">Based on surveys</p>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
            <h3 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Month-over-Month Comparison
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">This Month</span>
                  <span className="text-sm font-bold text-blue-700">Jun 2024</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Total Visits:</span>
                    <span className="font-semibold text-slate-900">{analyticsData.thisMonth.visits}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Appointments:</span>
                    <span className="font-semibold text-slate-900">{analyticsData.thisMonth.appointments}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">New Patients:</span>
                    <span className="font-semibold text-slate-900">{analyticsData.thisMonth.newPatients}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Last Month</span>
                  <span className="text-sm font-bold text-slate-700">May 2024</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Total Visits:</span>
                    <span className="font-semibold text-slate-900">{analyticsData.lastMonth.visits}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Appointments:</span>
                    <span className="font-semibold text-slate-900">{analyticsData.lastMonth.appointments}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">New Patients:</span>
                    <span className="font-semibold text-slate-900">{analyticsData.lastMonth.newPatients}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Trends Chart Placeholder */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
            <h3 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Monthly Trends
            </h3>

            <div className="space-y-4">
              {analyticsData.trends.map((trend, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium text-slate-700">{trend.month}</div>
                  
                  <div className="flex-1 flex gap-2">
                    <div className="flex items-end" style={{ height: '80px' }}>
                      <div 
                        className="w-8 bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-colors"
                        style={{ height: `${(trend.visits / 60) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-end" style={{ height: '80px' }}>
                      <div 
                        className="w-8 bg-pink-400 rounded-t-lg hover:bg-pink-500 transition-colors"
                        style={{ height: `${(trend.newPatients / 20) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="w-16 text-right">
                    <div className="text-xs text-slate-600">
                      Visits: <span className="font-semibold text-slate-900">{trend.visits}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm text-slate-600">Total Visits</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-pink-400 rounded"></div>
                <span className="text-sm text-slate-600">New Patients</span>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Demographics */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-300 p-6">
          <h3 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Patient Demographics
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <p className="text-4xl font-bold text-purple-600 mb-2">65%</p>
              <p className="text-sm text-slate-600">Female Patients</p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <p className="text-4xl font-bold text-blue-600 mb-2">35%</p>
              <p className="text-sm text-slate-600">Male Patients</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-xl">
              <p className="text-4xl font-bold text-green-600 mb-2">8.5</p>
              <p className="text-sm text-slate-600">Avg Age</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
