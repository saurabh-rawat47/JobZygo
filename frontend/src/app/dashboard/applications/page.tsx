'use client';

import { useState, useEffect } from 'react';
import { Briefcase, Clock, CheckCircle, XCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import Button from '@/components/ui/Button';

export default function ApplicationsPage() {
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

  const mockApplications = [
    {
      id: '1',
      jobTitle: 'Senior React Developer',
      company: 'TechFlow Systems',
      status: 'pending',
      date: 'March 24, 2026',
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      id: '2',
      jobTitle: 'Frontend Engineer',
      company: 'Nexus Digital',
      status: 'interview',
      date: 'March 20, 2026',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              My Applications
            </h1>
            <p className="text-slate-500 font-medium mt-1">Track and manage your career journey.</p>
          </div>
        </div>
        <Button onClick={() => router.push('/dashboard/jobs')}>
          Browse More Jobs
        </Button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex space-x-6">
            <button className="text-sm font-bold text-blue-600 border-b-2 border-blue-600 pb-1">All Applications</button>
            <button className="text-sm font-bold text-slate-400 hover:text-slate-600 pb-1 transition-colors">Active</button>
            <button className="text-sm font-bold text-slate-400 hover:text-slate-600 pb-1 transition-colors">Completed</button>
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
            {mockApplications.length} Total
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {mockApplications.length > 0 ? (
            mockApplications.map((app) => (
              <div key={app.id} className="p-8 hover:bg-slate-50/50 transition-colors group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start space-x-5">
                    <div className={`p-4 rounded-2xl ${app.bgColor} ${app.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{app.jobTitle}</h3>
                      <p className="text-slate-500 font-medium">{app.company}</p>
                      <div className="flex items-center mt-3 text-xs font-semibold text-slate-400 space-x-4">
                        <span className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1.5" />
                          Applied on {app.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-6">
                    <div className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold ${app.bgColor} ${app.color}`}>
                      <app.icon className="w-4 h-4 mr-2" />
                      <span className="capitalize">{app.status}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No applications found</h3>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                You haven't applied to any jobs yet. Start exploring opportunities to see your applications here!
              </p>
              <Button onClick={() => router.push('/dashboard/jobs')}>
                Go to Jobs
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Tip Card */}
      <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-bold">Keep growing!</h4>
            <p className="text-indigo-100 font-medium">Profile improvements can increase your application success rate by up to 40%.</p>
          </div>
          <Button variant="outline" className="bg-white border-white text-indigo-600 hover:bg-indigo-50 font-bold px-8">
            Update Resume
          </Button>
        </div>
      </div>
    </div>
  );
}
