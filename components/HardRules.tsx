'use client';

import { ShieldAlert } from 'lucide-react';

export default function HardRules() {
  const rules = [
    'No eating after 8 PM',
    'No sauces, creamers, sugar, or "just a bite" cheats',
    'No skipping sleep — that kills fat loss faster than junk food',
    'No rest days without movement (even 20 min walk minimum)',
  ];

  return (
    <div className="bg-black text-white p-6 md:p-8 border-t-4 border-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <ShieldAlert className="w-8 h-8" />
          <h2 className="text-3xl md:text-4xl font-black text-center">HARD RULES</h2>
        </div>

        <div className="space-y-4">
          {rules.map((rule, index) => (
            <div
              key={index}
              className="p-6 bg-neutral-900 border-l-4 border-white text-lg hover:bg-neutral-800 transition-all"
            >
              <div className="flex gap-4">
                <span className="text-2xl font-black text-neutral-500">{index + 1}</span>
                <span className="flex-1">{rule}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
