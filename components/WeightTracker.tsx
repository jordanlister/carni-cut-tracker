'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { format } from 'date-fns';
import { Scale, TrendingDown } from 'lucide-react';

export default function WeightTracker() {
  const { weightEntries, addWeightEntry, startWeight, goalWeight } = useStore();
  const [newWeight, setNewWeight] = useState('');
  const [note, setNote] = useState('');

  const handleAddWeight = () => {
    const weight = parseFloat(newWeight);
    if (weight && weight > 0) {
      addWeightEntry(weight, note);
      setNewWeight('');
      setNote('');
    }
  };

  const chartData = weightEntries.map((entry) => ({
    date: format(new Date(entry.date), 'MM/dd'),
    weight: entry.weight,
    fullDate: entry.date,
  }));

  return (
    <div className="bg-neutral-50 p-6 md:p-8 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6" />
            <h2 className="text-2xl md:text-3xl font-black">WEIGHT TRACKER</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="number"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              placeholder="Enter weight (lbs)"
              step="0.1"
              className="flex-1 px-4 py-3 text-lg font-bold border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add note (optional)"
              className="flex-1 px-4 py-3 text-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              onClick={handleAddWeight}
              className="px-8 py-3 bg-black text-white font-bold hover:bg-neutral-800 transition-colors flex items-center gap-2 justify-center"
            >
              <TrendingDown className="w-5 h-5" />
              UPDATE
            </button>
          </div>
        </div>

        {/* Weight Chart */}
        <div className="bg-white p-6 border-2 border-black">
          <h3 className="text-lg font-bold mb-4">PROGRESS CHART</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: '#666' }}
                stroke="#666"
              />
              <YAxis
                domain={[goalWeight - 5, startWeight + 5]}
                tick={{ fontSize: 12, fill: '#666' }}
                stroke="#666"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#000',
                  border: 'none',
                  borderRadius: '0',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              />
              <ReferenceLine y={goalWeight} stroke="#22c55e" strokeDasharray="3 3" label="Goal" />
              <ReferenceLine y={startWeight} stroke="#ef4444" strokeDasharray="3 3" label="Start" />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#000"
                strokeWidth={3}
                dot={{ fill: '#000', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Entries */}
        <div className="mt-6 bg-white border-2 border-black p-4">
          <h3 className="text-lg font-bold mb-3">RECENT ENTRIES</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {[...weightEntries].reverse().map((entry) => (
              <div key={entry.id} className="flex justify-between items-center py-2 border-b border-neutral-200 last:border-0">
                <div>
                  <div className="font-bold">{entry.weight} lbs</div>
                  {entry.note && <div className="text-sm text-neutral-600">{entry.note}</div>}
                </div>
                <div className="text-sm text-neutral-500">{format(new Date(entry.date), 'MMM dd, yyyy')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
