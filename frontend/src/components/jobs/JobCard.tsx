import { JobPost } from '@/types';
import { MapPin, Building, Clock, Briefcase } from 'lucide-react';

interface JobCardProps {
  job: JobPost;
  onApply?: (jobId: string) => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const formatExperience = (exp: number) => {
    if (exp === 0) return 'Entry Level';
    if (exp === 1) return '1 year';
    return `${exp} years`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/60 hover:-translate-y-1 group overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-5">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              {job.profile}
            </h3>
            <div className="flex items-center text-slate-600 mb-2">
              <div className="p-1.5 bg-slate-50 rounded-md mr-2">
                <Building className="w-4 h-4 text-slate-500" />
              </div>
              <span className="text-sm font-medium">{job.companyName}</span>
            </div>
            <div className="flex items-center text-slate-500">
              <div className="p-1.5 bg-slate-50 rounded-md mr-2">
                <MapPin className="w-4 h-4 text-slate-400" />
              </div>
              <span className="text-sm">{job.location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-600">
              {formatSalary(job.salary)}
            </div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">per year</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100/50">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            {job.jobType}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100/50">
            <Briefcase className="w-3.5 h-3.5 mr-1.5" />
            {formatExperience(job.exp)}
          </span>
        </div>

        <p className="text-slate-600 text-sm mb-5 line-clamp-2 leading-relaxed h-10">
          {job.desc}
        </p>

        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {(job.techs || []).map((tech, index) => (
              <span
                key={`${job.id}-tech-${tech}-${index}`}
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 border border-slate-100 hover:bg-white hover:shadow-sm transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {onApply && (
          <button
            onClick={() => onApply(job.id!)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 font-bold shadow-md shadow-blue-200 flex items-center justify-center space-x-2"
          >
            <span>Apply Now</span>
          </button>
        )}
      </div>
    </div>
  );
}


