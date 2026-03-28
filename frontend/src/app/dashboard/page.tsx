'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Search, Plus, TrendingUp, Users, Building } from 'lucide-react';
import { jobsAPI } from '@/lib/api';
import { JobPost, User } from '@/types';
import Button from '@/components/ui/Button';
import JobCard from '@/components/jobs/JobCard';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [recentJobs, setRecentJobs] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const fetchRecentJobs = async () => {
      try {
        const jobs = await jobsAPI.getAllJobs();
        setRecentJobs(jobs.slice(0, 6)); // Show only 6 recent jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentJobs();
  }, []);

  const handleApplyJob = (_jobId: string) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    // TODO: Implement job application logic
    alert('Application feature coming soon!');
  };

  const stats = [
    {
      title: 'Total Jobs',
      value: recentJobs.length,
      icon: Briefcase,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Companies',
      value: new Set(recentJobs.map(job => job.companyName)).size,
      icon: Building,
      color: 'bg-green-500',
    },
    {
      title: 'Job Seekers',
      value: '500+',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Success Rate',
      value: '95%',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-50 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-50 rounded-full opacity-50 blur-3xl"></div>

        <div className="relative p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, <span className="text-blue-600">{user?.username}</span>!
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl font-medium">
              {user?.userType === 'employer'
                ? 'Your marketplace for finding top-tier talent is ready for you.'
                : 'Your dream career is just a few clicks away. Explore new opportunities.'
              }
            </p>
          </div>
          {user?.userType === 'employer' && (
            <Button
              onClick={() => router.push('/dashboard/create-job')}
              size="lg"
              className="shadow-lg shadow-blue-100 whitespace-nowrap"
            >
              <Plus className="w-5 h-5 mr-2" />
              Post a Position
            </Button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={`stat-${index}`} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-slate-100 group">
            <div className="flex items-center">
              <div className={`p-3 rounded-2xl ${stat.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="ml-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.title}</p>
                <p className="text-2xl font-extrabold text-slate-900 mt-0.5">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            onClick={() => router.push('/dashboard/jobs')}
            className="h-20 flex flex-col items-center justify-center space-y-1.5 text-blue-600 border-blue-100 hover:border-blue-200 hover:bg-blue-50 rounded-xl"
            variant="outline"
          >
            <Search className="w-6 h-6" />
            <span className="font-bold">Browse Jobs</span>
          </Button>

          {user?.userType === 'employer' ? (
            <Button
              onClick={() => router.push('/dashboard/create-job')}
              className="h-20 flex flex-col items-center justify-center space-y-1.5 rounded-xl shadow-md shadow-blue-100"
            >
              <Plus className="w-6 h-6" />
              <span className="font-bold">Post New Job</span>
            </Button>
          ) : (
            <Button
              onClick={() => router.push('/dashboard/applications')}
              className="h-20 flex flex-col items-center justify-center space-y-1.5 text-indigo-600 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50 rounded-xl"
              variant="outline"
            >
              <TrendingUp className="w-6 h-6" />
              <span className="font-bold">My Applications</span>
            </Button>
          )}

          <Button
            onClick={() => router.push('/dashboard/profile')}
            className="h-20 flex flex-col items-center justify-center space-y-1.5 text-slate-600 border-slate-100 hover:border-slate-200 hover:bg-slate-50 rounded-xl"
            variant="outline"
          >
            <Users className="w-6 h-6" />
            <span className="font-bold">View Profile</span>
          </Button>
        </div>
      </div>


      {/* Recent Jobs */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Job Opportunities</h2>
          <Button
            onClick={() => router.push('/dashboard/jobs')}
            variant="outline"
            size="sm"
          >
            View All
          </Button>
        </div>

        {recentJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentJobs.map((job, index) => (
              <JobCard
                key={job.id || `recent-job-${index}`}
                job={job}
                onApply={user?.userType === 'jobseeker' ? handleApplyJob : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No jobs available at the moment.</p>
            {user?.userType === 'employer' && (
              <Button
                onClick={() => router.push('/dashboard/create-job')}
                className="mt-4"
              >
                Post Your First Job
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


