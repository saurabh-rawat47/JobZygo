'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, Briefcase, Home, Plus } from 'lucide-react';
import { authAPI } from '@/lib/api';
import Button from '@/components/ui/Button';
import { User as UserType } from '@/types';

interface HeaderProps {
  user?: UserType | null;
}

export default function Header({ user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    authAPI.logout();
    router.push('/');
  };

  const handleCreateJob = () => {
    router.push('/dashboard/create-job');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center space-x-2 text-xl font-bold text-blue-600"
            >
              <Briefcase className="w-8 h-8" />
              <span>JobZygo</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => router.push('/dashboard/jobs')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Jobs
            </button>
            {user?.userType === 'employer' && (
              <Button
                onClick={handleCreateJob}
                size="sm"
                className="flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Post Job
              </Button>
            )}
          </nav>

          {/* User Menu */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 p-2 rounded-md"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <span className="hidden md:block text-sm font-medium">
                  {user.username}
                </span>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    <div className="font-medium">{user.username}</div>
                    <div className="text-gray-500">{user.email}</div>
                    <div className="text-xs text-gray-400 capitalize">
                      {user.userType}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}



