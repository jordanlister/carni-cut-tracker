'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Dumbbell, Sunrise, Sunset, Droplets, Coffee, Plus, Trash2 } from 'lucide-react';

export default function TrainingSchedule() {
  const { todayChecklist, toggleWorkout, updateWaterIntake, addCalorieEntry, deleteCalorieEntry } = useStore();
  const [calorieAmount, setCalorieAmount] = useState('');
  const [calorieNote, setCalorieNote] = useState('');

  if (!todayChecklist) return null;

  // Ensure calorieEntries exists to prevent hydration errors
  const calorieEntries = todayChecklist.calorieEntries || [];

  const workoutDays = [
    { day: 'MON', title: 'Full-body HIIT or 30-min brisk walk' },
    { day: 'TUE', title: 'Gym: Upper body push/pull', subtitle: 'OR 20-min HIIT circuit' },
    { day: 'WED', title: '30-45 min cardio', subtitle: 'Walk, jog, or bike' },
    { day: 'THU', title: 'Gym: Lower body', subtitle: 'Squats, lunges, leg press' },
    { day: 'FRI', title: 'Core + HIIT burn day', subtitle: 'Abs 3x/week' },
    { day: 'SAT', title: 'Active recovery', subtitle: 'Long walk, stretch, mobility' },
    { day: 'SUN', title: 'Rest day', subtitle: 'Minimum 20 min walk still required' },
  ];

  const waterGoal = 128; // 1 gallon in oz
  const waterPercentage = (todayChecklist.waterIntake / waterGoal) * 100;

  return (
    <div className="bg-neutral-50 p-6 md:p-8 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Dumbbell className="w-6 h-6" />
          <div>
            <h2 className="text-2xl md:text-3xl font-black">TRAINING STRUCTURE</h2>
            <p className="text-neutral-600 mt-1">6 days/week — you move every day for fast fat loss</p>
          </div>
        </div>

        {/* Daily Workout Tracking */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div
            onClick={() => toggleWorkout('morning')}
            className={`p-6 border-2 cursor-pointer transition-all ${
              todayChecklist.morningWorkout
                ? 'bg-black text-white border-black'
                : 'bg-white border-neutral-300 hover:border-black'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Sunrise className="w-6 h-6" />
                <h3 className="text-lg font-bold">MORNING FASTED BURN</h3>
              </div>
              <div
                className={`w-6 h-6 border-2 flex items-center justify-center ${
                  todayChecklist.morningWorkout ? 'border-white bg-white' : 'border-black'
                }`}
              >
                {todayChecklist.morningWorkout && <div className="w-3 h-3 bg-black" />}
              </div>
            </div>
            <p className={todayChecklist.morningWorkout ? 'text-neutral-300' : 'text-neutral-600'}>
              15-20 min circuit: Squats → Pushups → Burpees → Mountain climbers
            </p>
          </div>

          <div
            onClick={() => toggleWorkout('evening')}
            className={`p-6 border-2 cursor-pointer transition-all ${
              todayChecklist.eveningWorkout
                ? 'bg-black text-white border-black'
                : 'bg-white border-neutral-300 hover:border-black'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Sunset className="w-6 h-6" />
                <h3 className="text-lg font-bold">EVENING SESSION</h3>
              </div>
              <div
                className={`w-6 h-6 border-2 flex items-center justify-center ${
                  todayChecklist.eveningWorkout ? 'border-white bg-white' : 'border-black'
                }`}
              >
                {todayChecklist.eveningWorkout && <div className="w-3 h-3 bg-black" />}
              </div>
            </div>
            <p className={todayChecklist.eveningWorkout ? 'text-neutral-300' : 'text-neutral-600'}>
              30-60 min session based on today's schedule
            </p>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="bg-white border-2 border-black p-6 mb-8">
          <h3 className="text-lg font-bold mb-4">WEEKLY SCHEDULE</h3>
          <div className="space-y-3">
            {workoutDays.map((workout) => (
              <div key={workout.day} className="flex gap-4 items-start p-4 bg-neutral-50 border-l-4 border-black">
                <div className="font-black text-lg min-w-[60px]">{workout.day}</div>
                <div>
                  <div className="font-bold">{workout.title}</div>
                  {workout.subtitle && <div className="text-sm text-neutral-600 mt-1">{workout.subtitle}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Water & Calorie Tracking */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-black p-6">
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold">WATER INTAKE</h3>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold">{todayChecklist.waterIntake} oz</span>
                <span className="text-neutral-500">{waterGoal} oz goal</span>
              </div>
              <div className="bg-neutral-200 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${Math.min(waterPercentage, 100)}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => updateWaterIntake(8)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
              >
                +8 oz
              </button>
              <button
                onClick={() => updateWaterIntake(16)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
              >
                +16 oz
              </button>
              <button
                onClick={() => updateWaterIntake(-8)}
                className="px-4 py-2 bg-neutral-300 text-black font-bold hover:bg-neutral-400 transition-colors"
              >
                -8
              </button>
            </div>
          </div>

          <div className="bg-white border-2 border-black p-6">
            <div className="flex items-center gap-3 mb-4">
              <Coffee className="w-6 h-6 text-orange-600" />
              <h3 className="text-lg font-bold">CALORIE TRACKER</h3>
            </div>

            {/* Total Calories */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold">
                  {calorieEntries.reduce((sum, entry) => sum + entry.amount, 0)} cal
                </span>
                <span className="text-neutral-500">Target: 1,500-1,700 cal</span>
              </div>
              <div className="bg-neutral-200 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    calorieEntries.reduce((sum, entry) => sum + entry.amount, 0) > 1700 ? 'bg-red-600' :
                    calorieEntries.reduce((sum, entry) => sum + entry.amount, 0) >= 1500 ? 'bg-green-600' :
                    'bg-orange-600'
                  }`}
                  style={{ width: `${Math.min((calorieEntries.reduce((sum, entry) => sum + entry.amount, 0) / 1700) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Add Calorie Entry */}
            <div className="mb-4 space-y-2">
              <input
                type="number"
                value={calorieAmount}
                onChange={(e) => setCalorieAmount(e.target.value)}
                placeholder="Calories"
                className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black text-center font-bold"
              />
              <input
                type="text"
                value={calorieNote}
                onChange={(e) => setCalorieNote(e.target.value)}
                placeholder="What did you eat? (optional)"
                className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                onClick={() => {
                  const amount = parseInt(calorieAmount);
                  if (amount && amount > 0) {
                    addCalorieEntry(amount, calorieNote || undefined);
                    setCalorieAmount('');
                    setCalorieNote('');
                  }
                }}
                className="w-full px-4 py-2 bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors flex items-center gap-2 justify-center"
              >
                <Plus className="w-5 h-5" />
                ADD CALORIES
              </button>
            </div>

            {/* Calorie Entries List */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {calorieEntries.length === 0 ? (
                <p className="text-sm text-neutral-500 text-center py-4">No calories logged yet today</p>
              ) : (
                calorieEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200">
                    <div className="flex-1">
                      <div className="font-bold">{entry.amount} cal</div>
                      {entry.note && <div className="text-sm text-neutral-600">{entry.note}</div>}
                      <div className="text-xs text-neutral-400">{entry.time}</div>
                    </div>
                    <button
                      onClick={() => deleteCalorieEntry(entry.id)}
                      className="p-2 hover:bg-red-100 text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Daily Reminders */}
        <div className="bg-white border-2 border-black p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <Coffee className="w-6 h-6" />
            <h3 className="text-lg font-bold">DAILY REMINDERS</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-black rounded-full mt-1.5" />
              <div>1 gallon water/day minimum</div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-black rounded-full mt-1.5" />
              <div>Add electrolytes (LMNT or pink salt + lemon)</div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-black rounded-full mt-1.5" />
              <div>1-2 cups black coffee max per day (early only)</div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-black rounded-full mt-1.5" />
              <div>No alcohol, soda, or sugar</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
