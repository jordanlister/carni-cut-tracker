'use client';

import { TrendingDown } from 'lucide-react';

export default function Timeline() {
  const milestones = [
    {
      week: 'WEEK 1',
      weight: '182-184 lbs',
      note: 'Drops quick — water & sodium loss',
    },
    {
      week: 'WEEK 2',
      weight: '176-178 lbs',
      note: 'You\'ll see change — midsection tightens',
    },
    {
      week: 'WEEK 3-4',
      weight: '168-172 lbs',
      note: 'You\'re in the zone — visible abs, lighter face',
    },
    {
      week: 'WEEK 5-6',
      weight: '162-166 lbs',
      note: 'GOAL RANGE — Lean, defined, energy balanced',
    },
  ];

  return (
    <div className="bg-black text-white p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <TrendingDown className="w-8 h-8" />
          <h2 className="text-3xl md:text-4xl font-black text-center">EXPECTED PROGRESS</h2>
        </div>

        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-6 items-center bg-neutral-900 p-6 hover:bg-neutral-800 transition-all group"
            >
              <div className="bg-white text-black px-8 py-4 font-black text-xl min-w-[140px] text-center group-hover:scale-105 transition-transform">
                {milestone.week}
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="text-2xl md:text-3xl font-black mb-2">{milestone.weight}</div>
                <div className="text-neutral-400">{milestone.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
