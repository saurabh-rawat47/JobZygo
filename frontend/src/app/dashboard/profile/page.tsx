'use client';

import { useState, useEffect } from 'react';
import { User as UserIcon, Mail, Calendar, Shield, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import Button from '@/components/ui/Button';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      router.push('/');
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </button>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          My Profile
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <div className="px-6 pb-8">
              <div className="relative -mt-16 mb-4">
                <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-lg mx-auto">
                  <div className="w-full h-full rounded-2xl bg-slate-100 flex items-center justify-center">
                    <UserIcon className="w-16 h-16 text-slate-400" />
                  </div>
                </div>
              </div>
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold text-slate-900">{user.username}</h2>
                <p className="text-slate-500 font-medium capitalize">{user.userType}</p>
              </div>
              <div className="mt-8 space-y-4">
                <Button className="w-full shadow-md shadow-blue-100">
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full" onClick={() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('token');
                  router.push('/');
                }}>
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <div className="flex items-center text-slate-400 mb-1">
                  <UserIcon className="w-4 h-4 mr-2" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</span>
                </div>
                <p className="text-slate-900 font-semibold">{user.username}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-slate-400 mb-1">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</span>
                </div>
                <p className="text-slate-900 font-semibold">{user.email}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-slate-400 mb-1">
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Account Type</span>
                </div>
                <p className="text-slate-900 font-semibold capitalize">{user.userType}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-slate-400 mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Joined Date</span>
                </div>
                <p className="text-slate-900 font-semibold">March 2026</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full mr-3"></span>
              Account Statistics
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-slate-900">0</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
                  {user.userType === 'employer' ? 'Job Posts' : 'Applications'}
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-slate-900">0</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Interviews</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-slate-900">0</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Offers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
