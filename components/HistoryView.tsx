'use client';

import { useStore } from '@/lib/store';
import { format } from 'date-fns';
import { Calendar, TrendingDown, Utensils, Dumbbell, Droplets, Coffee } from 'lucide-react';

export default function HistoryView() {
  const { dayHistory, todayChecklist } = useStore();

  // Combine today with history (today is not in history yet)
  const allDays = todayChecklist
    ? [...dayHistory, { ...todayChecklist, weightEntry: undefined }]
    : dayHistory;

  if (allDays.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 p-6 pb-24 flex items-center justify-center">
        <div className="text-center">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
          <h2 className="text-2xl font-black mb-2">NO HISTORY YET</h2>
          <p className="text-neutral-600">Start tracking your progress and it will appear here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      <div className="bg-black text-white p-6 border-b-4 border-white sticky top-0 z-10">
        <h1 className="text-3xl font-black flex items-center gap-3">
          <Calendar className="w-8 h-8" />
          PROGRESS HISTORY
        </h1>
        <p className="text-neutral-400 mt-2">{allDays.length} days tracked</p>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {[...allDays].reverse().map((day, index) => {
          // Ensure properties exist to prevent hydration errors
          const calorieEntries = day.calorieEntries || [];
          const meals = day.meals || [];
          const totalCalories = calorieEntries.reduce((sum, entry) => sum + entry.amount, 0);
          const isToday = index === 0;

          return (
            <div
              key={day.date}
              className={`bg-white border-2 ${isToday ? 'border-orange-600' : 'border-black'} p-6 hover:shadow-lg transition-all`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-neutral-200">
                <div>
                  <h3 className="text-xl font-black">
                    {isToday ? 'TODAY' : format(new Date(day.date), 'EEEE')}
                  </h3>
                  <p className="text-neutral-600">{format(new Date(day.date), 'MMM dd, yyyy')}</p>
                </div>
                {day.weightEntry && (
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-5 h-5" />
                      <span className="text-2xl font-black">{day.weightEntry.weight} lbs</span>
                    </div>
                    {day.weightEntry.note && (
                      <p className="text-sm text-neutral-600">{day.weightEntry.note}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-neutral-50 border border-neutral-200">
                  <Coffee className="w-5 h-5 mx-auto mb-1 text-orange-600" />
                  <div className="text-lg font-bold">{totalCalories}</div>
                  <div className="text-xs text-neutral-600">Calories</div>
                </div>
                <div className="text-center p-3 bg-neutral-50 border border-neutral-200">
                  <Droplets className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <div className="text-lg font-bold">{day.waterIntake}</div>
                  <div className="text-xs text-neutral-600">oz Water</div>
                </div>
                <div className="text-center p-3 bg-neutral-50 border border-neutral-200">
                  <Utensils className="w-5 h-5 mx-auto mb-1 text-green-600" />
                  <div className="text-lg font-bold">
                    {meals.reduce((sum, meal) => sum + (meal.items?.filter(i => i.completed).length || 0), 0)}
                  </div>
                  <div className="text-xs text-neutral-600">Meals</div>
                </div>
                <div className="text-center p-3 bg-neutral-50 border border-neutral-200">
                  <Dumbbell className="w-5 h-5 mx-auto mb-1 text-red-600" />
                  <div className="text-lg font-bold">
                    {(day.morningWorkout ? 1 : 0) + (day.eveningWorkout ? 1 : 0)}
                  </div>
                  <div className="text-xs text-neutral-600">Workouts</div>
                </div>
              </div>

              {/* Calorie Entries */}
              {calorieEntries.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-bold text-sm mb-2">CALORIE LOG</h4>
                  <div className="space-y-1">
                    {calorieEntries.map((entry) => (
                      <div key={entry.id} className="flex justify-between items-center text-sm p-2 bg-neutral-50">
                        <div>
                          <span className="font-bold">{entry.amount} cal</span>
                          {entry.note && <span className="text-neutral-600 ml-2">- {entry.note}</span>}
                        </div>
                        <span className="text-xs text-neutral-400">{entry.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {day.notes && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <h4 className="font-bold text-sm mb-2">DAILY NOTES</h4>
                  <p className="text-neutral-700">{day.notes}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
