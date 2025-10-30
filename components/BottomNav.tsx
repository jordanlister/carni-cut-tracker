'use client';

import { Home, Calendar } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'history';
  onTabChange: (tab: 'home' | 'history') => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t-4 border-white z-50">
      <div className="max-w-7xl mx-auto grid grid-cols-2">
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center py-4 transition-all ${
            activeTab === 'home' ? 'bg-white text-black' : 'text-white hover:bg-neutral-900'
          }`}
        >
          <Home className="w-6 h-6 mb-1" />
          <span className="text-sm font-bold">TODAY</span>
        </button>
        <button
          onClick={() => onTabChange('history')}
          className={`flex flex-col items-center justify-center py-4 transition-all ${
            activeTab === 'history' ? 'bg-white text-black' : 'text-white hover:bg-neutral-900'
          }`}
        >
          <Calendar className="w-6 h-6 mb-1" />
          <span className="text-sm font-bold">HISTORY</span>
        </button>
      </div>
    </div>
  );
}
