'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/dashboard/records');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EFE5] p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#FFFDF8] rounded-xl shadow-sm border border-[#D7C7B9] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#F16F5C] to-[#7A4B6E] p-8 text-white">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
            <p className="text-white/80 text-center text-sm">Sign in to access your medical records</p>
          </div>

          {/* Demo Accounts Info */}
          <div className="px-8 pb-4">
            <div className="bg-[#E8C468]/10 border border-[#E8C468]/30 rounded-lg p-4">
              <p className="font-semibold text-[#3B5BA5] text-sm mb-2">Demo Accounts:</p>
              <div className="space-y-1 text-[#211D1E] text-xs">
                <p><strong>Midwife:</strong> midwife@ehr-demo.com / Midwife123!</p>
                <p><strong>Patient:</strong> patient1@ehr-demo.com / Patient123!</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 pb-8 space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-[#F16F5C]/10 border border-[#F16F5C]/30 text-[#F16F5C] px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[#211D1E]">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D7C7B9]" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F5EFE5] border border-[#D7C7B9] rounded-lg text-sm text-[#211D1E] placeholder-[#D7C7B9] focus:outline-none focus:ring-2 focus:ring-[#3B5BA5]/20 focus:border-[#3B5BA5] transition-colors duration-200"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-[#211D1E]">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D7C7B9]" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-[#F5EFE5] border border-[#D7C7B9] rounded-lg text-sm text-[#211D1E] placeholder-[#D7C7B9] focus:outline-none focus:ring-2 focus:ring-[#3B5BA5]/20 focus:border-[#3B5BA5] transition-colors duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D7C7B9] hover:text-[#211D1E] transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#3B5BA5] to-[#7A4B6E] text-white font-medium rounded-full text-sm hover:opacity-90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 border-t border-[#D7C7B9]">
              <p className="text-center text-xs text-[#D7C7B9]">
                Do n't have an account?{' '}
                <Link href="/auth/signup" className="text-[#3B5BA5] hover:text-[#7A4B6E] font-medium transition-colors duration-200">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
