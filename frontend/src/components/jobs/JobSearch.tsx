'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface JobSearchProps {
  onSearch: (searchTerm: string) => void;
  onClear: () => void;
  isLoading?: boolean;
}

export default function JobSearch({ onSearch, onClear, isLoading }: JobSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 md:p-3 mb-8 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-300">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative flex items-center">
          <div className="absolute left-4 text-slate-400">
            <Search className="w-5 h-5 pointer-events-none" />
          </div>
          <Input
            type="text"
            placeholder="Search roles, companies, or tech stacks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 bg-slate-50 border-none focus:bg-white transition-all rounded-xl font-medium"
          />
        </div>
        <div className="flex gap-2">
          {searchTerm && (
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              className="h-14 px-6 rounded-xl border-slate-200 font-bold"
            >
              Clear
            </Button>
          )}
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!searchTerm.trim()}
            className="h-14 px-8 rounded-xl font-bold shadow-md shadow-blue-100 flex-1 md:flex-none"
          >
            Search Now
          </Button>
        </div>
      </form>
    </div>

  );
}



