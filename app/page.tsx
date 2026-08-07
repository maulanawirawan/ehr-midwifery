'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900">EHR Midwifery</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/auth/login')}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push('/auth/signup')}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md hover:opacity-90 transition-all duration-200"
            >
              Create Account
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-8 animate-fade-in">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight animate-slide-up">
            Electronic Health Records
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed animate-slide-up-delay">
            Secure and comprehensive maternity care management platform
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Login Card */}
          <div 
            onClick={() => router.push('/auth/login')}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer border border-slate-200 hover:border-blue-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            <div className="relative">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">Access Dashboard</h3>
              <p className="text-slate-600 mb-6">View patient records and clinical data</p>
              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                <span>Continue</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Create Account Card */}
          <div 
            onClick={() => router.push('/auth/signup')}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer border border-slate-200 hover:border-green-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            <div className="relative">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">New Registration</h3>
              <p className="text-slate-600 mb-6">Create account for maternity services</p>
              <div className="flex items-center text-green-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                <span>Get Started</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Demo Access Card */}
          <div 
            onClick={() => router.push('/auth/demo')}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer border border-slate-200 hover:border-purple-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            <div className="relative">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">Try Demo</h3>
              <p className="text-slate-600 mb-6">Explore features with sample data</p>
              <div className="flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                <span>Explore</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Complete Maternity Care Management</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: "📋", title: "Patient Records", desc: "Comprehensive electronic health records" },
              { icon: "🏥", title: "Clinical Data", desc: "Structured medical information storage" },
              { icon: "🔒", title: "Secure Access", desc: "Protected patient privacy and compliance" },
              { icon: "‍️⚕️", title: "Care Coordination", desc: "Streamlined provider collaboration tools" },
            ].map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h4 className="font-semibold text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
