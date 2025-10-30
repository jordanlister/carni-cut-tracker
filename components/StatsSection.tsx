'use client';

import { useStore } from '@/lib/store';
import { TrendingDown, Target, Calendar, Flame } from 'lucide-react';

export default function StatsSection() {
  const { weightEntries, startWeight, goalWeight, currentDay } = useStore();
  const currentWeight = weightEntries[weightEntries.length - 1]?.weight || startWeight;
  const lostWeight = (startWeight - currentWeight).toFixed(1);
  const toGoal = Math.max(0, currentWeight - goalWeight).toFixed(1);

  const stats = [
    {
      label: 'Current',
      value: currentWeight.toFixed(1),
      icon: TrendingDown,
      color: 'text-blue-600',
    },
    {
      label: 'Lost',
      value: lostWeight,
      icon: Flame,
      color: 'text-red-600',
    },
    {
      label: 'To Goal',
      value: toGoal,
      icon: Target,
      color: 'text-green-600',
    },
    {
      label: 'Day',
      value: currentDay,
      icon: Calendar,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white p-6 border-2 border-black hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                {stat.label}
              </div>
              <Icon className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
            </div>
            <div className="text-4xl font-black text-black">{stat.value}</div>
          </div>
        );
      })}
    </div>
  );
}
