'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupFormData } from '@/lib/validation';
import { authAPI } from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, XCircle } from 'lucide-react';

interface SignupFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupForm({ onSuccess, onSwitchToLogin }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const watchedPassword = watch('password', '');
  const watchedEmail = watch('email', '');

  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window !== 'undefined') {
      setMounted(true);
    }
  }, []);

  const userTypeOptions = [
    { value: 'jobseeker', label: 'Job Seeker' },
    { value: 'employer', label: 'Employer' },
  ];

  // Password validation checks
  const passwordChecks = {
    length: watchedPassword.length >= 8,
    uppercase: /[A-Z]/.test(watchedPassword),
    lowercase: /[a-z]/.test(watchedPassword),
    number: /\d/.test(watchedPassword),
  };

  // Email validation check
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail);

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const { confirmPassword, ...signupData } = data;
      const response = await authAPI.signup(signupData);
      
      if (response.success) {
        if (typeof window !== 'undefined' && response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        onSuccess();
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return <div className="w-full max-w-md mx-auto">Loading...</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join JobZygo and find your dream job
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            error={errors.username?.message}
            {...register('username')}
          />

          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              error={errors.email?.message}
              {...register('email')}
            />
            {watchedEmail && (
              <div className="mt-1 flex items-center">
                {isValidEmail ? (
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-xs ${isValidEmail ? 'text-green-600' : 'text-red-600'}`}>
                  {isValidEmail ? 'Valid email format' : 'Please enter a valid email'}
                </span>
              </div>
            )}
          </div>

          <Select
            label="User Type"
            options={userTypeOptions}
            error={errors.userType?.message}
            {...register('userType')}
          />

          <div>
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register('password')}
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {/* Password validation indicators */}
            {watchedPassword && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center">
                  {passwordChecks.length ? (
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-3 h-3 text-red-500 mr-2" />
                  )}
                  <span className={`text-xs ${passwordChecks.length ? 'text-green-600' : 'text-red-600'}`}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordChecks.uppercase ? (
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-3 h-3 text-red-500 mr-2" />
                  )}
                  <span className={`text-xs ${passwordChecks.uppercase ? 'text-green-600' : 'text-red-600'}`}>
                    One uppercase letter
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordChecks.lowercase ? (
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-3 h-3 text-red-500 mr-2" />
                  )}
                  <span className={`text-xs ${passwordChecks.lowercase ? 'text-green-600' : 'text-red-600'}`}>
                    One lowercase letter
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordChecks.number ? (
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-3 h-3 text-red-500 mr-2" />
                  )}
                  <span className={`text-xs ${passwordChecks.number ? 'text-green-600' : 'text-red-600'}`}>
                    One number
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
