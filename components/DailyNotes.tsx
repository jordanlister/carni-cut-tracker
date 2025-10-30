'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { BookOpen, Save } from 'lucide-react';

export default function DailyNotes() {
  const { todayChecklist, updateDailyNote } = useStore();
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (todayChecklist) {
      setNote(todayChecklist.notes);
    }
  }, [todayChecklist]);

  const handleSave = () => {
    updateDailyNote(note);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!todayChecklist) return null;

  return (
    <div className="bg-neutral-50 p-6 md:p-8 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6" />
          <h2 className="text-2xl md:text-3xl font-black">DAILY JOURNAL</h2>
        </div>

        <div className="bg-white border-2 border-black p-6">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="How are you feeling today? Any challenges? Victories? Write it down..."
            className="w-full h-32 p-4 border-2 border-neutral-300 focus:border-black focus:outline-none resize-none"
          />

          <button
            onClick={handleSave}
            className={`mt-4 px-6 py-3 font-bold flex items-center gap-2 transition-all ${
              saved
                ? 'bg-green-600 text-white'
                : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            <Save className="w-5 h-5" />
            {saved ? 'SAVED!' : 'SAVE NOTE'}
          </button>
        </div>
      </div>
    </div>
  );
}
