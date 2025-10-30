'use client';

import { useStore } from '@/lib/store';
import { Utensils, Check } from 'lucide-react';

export default function MealPlan() {
  const { todayChecklist, toggleMealItem } = useStore();

  if (!todayChecklist) return null;

  return (
    <div className="bg-white p-6 md:p-8 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Utensils className="w-6 h-6" />
          <div>
            <h2 className="text-2xl md:text-3xl font-black">CARNI-CUT EATING PLAN</h2>
            <p className="text-neutral-600 mt-1">Eating Window: 12 PM - 8 PM (fast before noon)</p>
          </div>
        </div>

        <div className="space-y-6">
          {todayChecklist.meals.map((meal) => {
            const completedItems = meal.items.filter((item) => item.completed).length;
            const totalItems = meal.items.length;
            const completionPercentage = (completedItems / totalItems) * 100;

            return (
              <div key={meal.id} className="bg-neutral-50 border-l-4 border-black">
                <div className="p-4 bg-white border-b border-neutral-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black">{meal.title}</h3>
                    <span className="text-sm font-semibold text-neutral-500">
                      {completedItems}/{totalItems}
                    </span>
                  </div>
                  <div className="mt-2 bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-black h-full transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  {meal.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleMealItem(meal.id, item.id)}
                      className={`flex items-start gap-4 p-4 bg-white border border-neutral-200 cursor-pointer hover:border-black transition-all group ${
                        item.completed ? 'opacity-50' : ''
                      }`}
                    >
                      <div
                        className={`w-6 h-6 flex-shrink-0 border-2 border-black flex items-center justify-center transition-all ${
                          item.completed ? 'bg-black' : 'bg-white group-hover:bg-neutral-100'
                        }`}
                      >
                        {item.completed && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <div className={`flex-1 ${item.completed ? 'line-through' : ''}`}>
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
