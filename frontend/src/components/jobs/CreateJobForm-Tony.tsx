'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobPostSchema, JobPostFormData } from '@/lib/validation';
import { jobsAPI } from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { X, Plus } from 'lucide-react';

interface CreateJobFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CreateJobForm({ onSuccess, onCancel }: CreateJobFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [techInput, setTechInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<JobPostFormData>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      techs: [],
    },
  });

  const currentTechs = watch('techs') || [];

  const jobTypeOptions = [
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Internship', label: 'Internship' },
  ];

  const addTech = () => {
    if (techInput.trim() && !currentTechs.includes(techInput.trim())) {
      setValue('techs', [...currentTechs, techInput.trim()]);
      setTechInput('');
    }
  };

  const removeTech = (index: number) => {
    const newTechs = currentTechs.filter((_, i) => i !== index);
    setValue('techs', newTechs);
  };

  const onSubmit = async (data: JobPostFormData) => {
    setIsLoading(true);
    setError('');

    try {
      await jobsAPI.createJob(data);
      onSuccess();
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      setError(err.response?.data?.message || 'Failed to create job post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create Job Post</h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Job Profile"
          placeholder="e.g., Senior React Developer"
          error={errors.profile?.message}
          {...register('profile')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Company Name"
            placeholder="Enter company name"
            error={errors.companyName?.message}
            {...register('companyName')}
          />

          <Input
            label="Location"
            placeholder="e.g., New York, NY"
            error={errors.location?.message}
            {...register('location')}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Job Type"
            options={jobTypeOptions}
            error={errors.jobType?.message}
            {...register('jobType')}
          />

          <Input
            label="Experience (Years)"
            type="number"
            min="0"
            placeholder="0"
            error={errors.exp?.message}
            {...register('exp', { valueAsNumber: true })}
          />

          <Input
            label="Salary (USD)"
            type="number"
            min="0"
            placeholder="50000"
            error={errors.salary?.message}
            {...register('salary', { valueAsNumber: true })}
          />
        </div>

        <Textarea
          label="Job Description"
          placeholder="Describe the role, responsibilities, and requirements..."
          rows={4}
          error={errors.desc?.message}
          {...register('desc')}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Technologies
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add technology (e.g., React, Node.js)"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
            />
            <Button
              type="button"
              onClick={addTech}
              disabled={!techInput.trim()}
              size="sm"
            >
              <Plus size={16} />
            </Button>
          </div>
          {errors.techs?.message && (
            <p className="text-sm text-red-600">{errors.techs.message}</p>
          )}
          <div className="flex flex-wrap gap-2">
            {currentTechs.map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTech(index)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            className="flex-1"
            isLoading={isLoading}
          >
            Create Job Post
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}



