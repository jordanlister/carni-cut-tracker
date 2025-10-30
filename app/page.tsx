'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import StatsSection from '@/components/StatsSection';
import Strategy from '@/components/Strategy';
import WeightTracker from '@/components/WeightTracker';
import MealPlan from '@/components/MealPlan';
import TrainingSchedule from '@/components/TrainingSchedule';
import DailyNotes from '@/components/DailyNotes';
import Timeline from '@/components/Timeline';
import HardRules from '@/components/HardRules';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import HistoryView from '@/components/HistoryView';

export default function Home() {
  const { checkMidnightReset } = useStore();
  const [activeTab, setActiveTab] = useState<'home' | 'history'>('home');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Set hydrated to true on mount to prevent hydration mismatch
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    // Check for midnight reset on mount
    checkMidnightReset();

    // Check every minute for midnight reset
    const interval = setInterval(() => {
      checkMidnightReset();
    }, 60000);

    return () => clearInterval(interval);
  }, [checkMidnightReset, isHydrated]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto bg-white pb-20">
        {activeTab === 'home' ? (
          <>
            <div className="p-6 md:p-8 bg-neutral-50 border-b border-neutral-200">
              <div className="max-w-6xl mx-auto">
                <StatsSection />
              </div>
            </div>

            <Strategy />
            <WeightTracker />
            <MealPlan />
            <TrainingSchedule />
            <DailyNotes />
            <Timeline />
            <HardRules />
            <Footer />
          </>
        ) : (
          <HistoryView />
        )}

        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
