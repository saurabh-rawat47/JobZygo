'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/lib/validation';
import { authAPI } from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToSignup: () => void;
}

export default function LoginForm({ onSuccess, onSwitchToSignup }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window !== 'undefined') {
      setMounted(true);
    }
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await authAPI.login(data);
      
      if (response.success) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        onSuccess();
      } else {
        setError(response.message);
      }
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      setError(err.response?.data?.message || 'Login failed. Please try again.');
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
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your JobZygo account
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

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
