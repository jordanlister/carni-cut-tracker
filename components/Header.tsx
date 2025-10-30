'use client';

import { useStore } from '@/lib/store';

export default function Header() {
  const { startWeight, goalWeight, weightEntries } = useStore();
  const currentWeight = weightEntries[weightEntries.length - 1]?.weight || startWeight;
  const totalLoss = startWeight - goalWeight;
  const currentLoss = startWeight - currentWeight;
  const percentage = Math.min((currentLoss / totalLoss) * 100, 100);

  return (
    <div className="bg-black text-white p-8 md:p-12 border-b-4 border-white">
      <h1 className="text-4xl md:text-6xl font-black mb-3 tracking-tight">
        {startWeight} → {goalWeight} LBS
      </h1>
      <p className="text-lg md:text-xl opacity-80 font-light mb-6">
        6-Week Carni-Cut Protocol | High-Protein, Low-Carb
      </p>
      <div className="bg-neutral-800 h-3 rounded-full overflow-hidden">
        <div
          className="bg-white h-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 10 && (
            <span className="text-xs font-bold text-black">{percentage.toFixed(0)}%</span>
          )}
        </div>
      </div>
    </div>
  );
}
