'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { RotateCcw, AlertTriangle, Download, FileText } from 'lucide-react';

export default function Footer() {
  const { resetAllProgress, exportToCSV, exportToPDF } = useStore();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    resetAllProgress();
    setShowConfirm(false);
  };

  return (
    <div className="bg-neutral-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Export Buttons */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-center">EXPORT YOUR PROGRESS</h3>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={exportToCSV}
              className="px-6 py-3 bg-green-600 text-white font-bold hover:bg-green-700 transition-all flex items-center gap-2 justify-center"
            >
              <Download className="w-5 h-5" />
              DOWNLOAD CSV
            </button>
            <button
              onClick={exportToPDF}
              className="px-6 py-3 bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all flex items-center gap-2 justify-center"
            >
              <FileText className="w-5 h-5" />
              PRINT/SAVE PDF
            </button>
          </div>
          <p className="text-sm text-neutral-600 mt-3 text-center">
            Export all your weight data, progress, and notes
          </p>
        </div>

        {/* Reset Section */}
        <div className="text-center border-t-2 border-neutral-200 pt-8">
        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="px-8 py-4 bg-white text-black border-2 border-black font-bold hover:bg-black hover:text-white transition-all flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            RESET ALL PROGRESS
          </button>
        ) : (
          <div className="bg-white border-2 border-red-600 p-6 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-4 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-black text-lg">ARE YOU SURE?</h3>
            </div>
            <p className="text-sm mb-6 text-neutral-600">
              This will delete all your progress including weight entries, meal tracking, and notes. This cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-red-600 text-white font-bold hover:bg-red-700 transition-all"
              >
                YES, RESET
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-3 bg-neutral-200 text-black font-bold hover:bg-neutral-300 transition-all"
              >
                CANCEL
              </button>
            </div>
          </div>
        )}
        </div>

        <div className="mt-8 text-sm text-neutral-500 text-center">
          <p>Carni-Cut Protocol © 2024 | Track your progress, achieve your goals</p>
        </div>
      </div>
    </div>
  );
}
