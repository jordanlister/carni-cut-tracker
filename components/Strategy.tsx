'use client';

import { Target, Calendar, Beef, Wheat, Droplet, Moon } from 'lucide-react';

export default function Strategy() {
  const strategies = [
    { icon: Calendar, label: 'Timeline', value: '6 Weeks', color: 'text-purple-600' },
    { icon: Target, label: 'Calories', value: '1,500-1,700/day', color: 'text-red-600' },
    { icon: Beef, label: 'Protein', value: '180-200g/day', color: 'text-orange-600' },
    { icon: Wheat, label: 'Carbs', value: '<60g/day', color: 'text-yellow-600' },
    { icon: Droplet, label: 'Hydration', value: '1 gal/day min', color: 'text-blue-600' },
    { icon: Moon, label: 'Sleep', value: '7+ hours', color: 'text-indigo-600' },
  ];

  return (
    <div className="bg-white p-6 md:p-8 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-black mb-2">STRATEGY SNAPSHOT</h2>
          <p className="text-neutral-600">No-BS protocol designed to strip fat, retain muscle, hit 165 in 6 weeks</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {strategies.map((strategy) => {
            const Icon = strategy.icon;
            return (
              <div
                key={strategy.label}
                className="bg-neutral-50 p-4 border-l-4 border-black hover:shadow-lg transition-all group"
              >
                <Icon className={`w-6 h-6 ${strategy.color} mb-3 group-hover:scale-110 transition-transform`} />
                <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  {strategy.label}
                </div>
                <div className="text-lg font-black">{strategy.value}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
