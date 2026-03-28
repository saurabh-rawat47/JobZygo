'use client';

import { useState, useEffect } from 'react';
import { jobsAPI } from '@/lib/api';
import { JobPost, User } from '@/types';
import JobSearch from '@/components/jobs/JobSearch';
import JobCard from '@/components/jobs/JobCard';
import Button from '@/components/ui/Button';
import { Plus, Filter } from 'lucide-react';

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const allJobs = await jobsAPI.getAllJobs();
      setJobs(allJobs);
      setFilteredJobs(allJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (searchText: string) => {
    setSearchTerm(searchText);

    if (!searchText.trim()) {
      setFilteredJobs(jobs);
      return;
    }

    try {
      const searchResults = await jobsAPI.searchJobs(searchText);
      setFilteredJobs(searchResults);
    } catch (error) {
      console.error('Error searching jobs:', error);
      // Fallback to client-side search
      const filtered = jobs.filter(job =>
        job.profile.toLowerCase().includes(searchText.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
        job.location.toLowerCase().includes(searchText.toLowerCase()) ||
        (job.techs || []).some(tech => tech.toLowerCase().includes(searchText.toLowerCase()))
      );
      setFilteredJobs(filtered);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredJobs(jobs);
  };

  const handleApplyJob = (_jobId: string) => {
    // TODO: Implement job application logic
    alert('Application feature coming soon!');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Job Opportunities
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Explore <span className="text-blue-600 font-bold">{filteredJobs.length}</span> high-quality positions tailored for you.
          </p>
        </div>
        {user?.userType === 'employer' && (
          <Button
            onClick={() => window.location.href = '/dashboard/create-job'}
            className="shadow-lg shadow-blue-100"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Post New Job
          </Button>
        )}
      </div>

      {/* Search Section */}
      <section>
        <JobSearch
          onSearch={handleSearch}
          onClear={handleClearSearch}
          isLoading={false}
        />
      </section>

      {/* Results Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Filter className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {searchTerm ? `Results for "${searchTerm}"` : 'Active Listings'}
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
            {filteredJobs.length} Positions
          </span>
        </div>

        <div className="p-8">
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredJobs.map((job, index) => (
                <JobCard
                  key={job.id || `job-${index}`}
                  job={job}
                  onApply={user?.userType === 'jobseeker' ? handleApplyJob : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6">
                <Filter className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No matching jobs found</h3>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                {searchTerm
                  ? `We couldn't find any positions matching "${searchTerm}". Try adjusting your keywords.`
                  : 'Check back later! No jobs are currently available in the system.'
                }
              </p>
              {searchTerm && (
                <Button
                  onClick={handleClearSearch}
                  variant="outline"
                  size="lg"
                  className="rounded-xl border-slate-200"
                >
                  Clear all filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>

  );
}


