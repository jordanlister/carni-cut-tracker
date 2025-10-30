import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format } from 'date-fns';
import { AppState, DailyChecklist, MealSection } from '@/types';

const getDefaultMeals = (): MealSection[] => [
  {
    id: 'meal1',
    title: 'MEAL 1 — 12:00 PM',
    items: [
      { id: 'm1-1', text: '4 eggs', completed: false },
      { id: 'm1-2', text: '2 turkey bacon strips or 3 oz sausage', completed: false },
      { id: 'm1-3', text: 'Black coffee (or splash of almond milk)', completed: false },
    ],
  },
  {
    id: 'meal2',
    title: 'MEAL 2 — 3-4 PM',
    items: [
      { id: 'm2-1', text: '8 oz grilled chicken breast, lean steak, or 93/7 ground beef', completed: false },
      { id: 'm2-2', text: '1 slice cheese or ½ avocado', completed: false },
      { id: 'm2-3', text: 'Optional: ½ cup white rice ONLY if you trained hard', completed: false },
    ],
  },
  {
    id: 'meal3',
    title: 'MEAL 3 — 7:00 PM',
    items: [
      { id: 'm3-1', text: '6 oz salmon, chicken thighs, or ground turkey', completed: false },
      { id: 'm3-2', text: '1 boiled egg or protein shake if still hungry', completed: false },
    ],
  },
  {
    id: 'snacks',
    title: 'SNACKS (Keep it Clean)',
    items: [
      { id: 's-1', text: 'Protein shake (40g, no sugar)', completed: false },
      { id: 's-2', text: '1 beef jerky stick', completed: false },
      { id: 's-3', text: '1 boiled egg', completed: false },
      { id: 's-4', text: '10 almonds or mini handful of nuts', completed: false },
    ],
  },
];

const createDefaultDailyChecklist = (): DailyChecklist => ({
  date: format(new Date(), 'yyyy-MM-dd'),
  meals: getDefaultMeals(),
  morningWorkout: false,
  eveningWorkout: false,
  waterIntake: 0,
  calorieEntries: [],
  notes: '',
});

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      weightEntries: [{ id: '1', date: format(new Date(), 'yyyy-MM-dd'), weight: 188, note: 'Starting weight' }],
      startWeight: 188,
      goalWeight: 165,
      currentDay: 1,
      startDate: format(new Date(), 'yyyy-MM-dd'),
      todayChecklist: createDefaultDailyChecklist(),
      lastResetDate: format(new Date(), 'yyyy-MM-dd'),
      dayHistory: [],

      // Actions
      addWeightEntry: (weight: number, note?: string) => {
        const newEntry = {
          id: Date.now().toString(),
          date: format(new Date(), 'yyyy-MM-dd'),
          weight,
          note,
        };
        set((state) => ({
          weightEntries: [...state.weightEntries, newEntry],
          currentDay: state.currentDay + 1,
        }));
      },

      updateCurrentDay: () => {
        set((state) => ({
          currentDay: state.currentDay + 1,
        }));
      },

      toggleMealItem: (mealId: string, itemId: string) => {
        set((state) => {
          if (!state.todayChecklist) return state;

          const updatedMeals = state.todayChecklist.meals.map((meal) => {
            if (meal.id === mealId) {
              return {
                ...meal,
                items: meal.items.map((item) =>
                  item.id === itemId ? { ...item, completed: !item.completed } : item
                ),
              };
            }
            return meal;
          });

          return {
            todayChecklist: {
              ...state.todayChecklist,
              meals: updatedMeals,
            },
          };
        });
      },

      toggleWorkout: (type: 'morning' | 'evening') => {
        set((state) => {
          if (!state.todayChecklist) return state;

          return {
            todayChecklist: {
              ...state.todayChecklist,
              [type === 'morning' ? 'morningWorkout' : 'eveningWorkout']:
                !state.todayChecklist[type === 'morning' ? 'morningWorkout' : 'eveningWorkout'],
            },
          };
        });
      },

      updateWaterIntake: (amount: number) => {
        set((state) => {
          if (!state.todayChecklist) return state;

          return {
            todayChecklist: {
              ...state.todayChecklist,
              waterIntake: Math.max(0, state.todayChecklist.waterIntake + amount),
            },
          };
        });
      },

      addCalorieEntry: (amount: number, note?: string) => {
        set((state) => {
          if (!state.todayChecklist) return state;

          const newEntry = {
            id: Date.now().toString(),
            time: format(new Date(), 'HH:mm'),
            amount,
            note,
          };

          return {
            todayChecklist: {
              ...state.todayChecklist,
              calorieEntries: [...state.todayChecklist.calorieEntries, newEntry],
            },
          };
        });
      },

      deleteCalorieEntry: (id: string) => {
        set((state) => {
          if (!state.todayChecklist) return state;

          return {
            todayChecklist: {
              ...state.todayChecklist,
              calorieEntries: state.todayChecklist.calorieEntries.filter((entry) => entry.id !== id),
            },
          };
        });
      },

      updateDailyNote: (note: string) => {
        set((state) => {
          if (!state.todayChecklist) return state;

          return {
            todayChecklist: {
              ...state.todayChecklist,
              notes: note,
            },
          };
        });
      },

      resetDailyChecklist: () => {
        set({
          todayChecklist: createDefaultDailyChecklist(),
          lastResetDate: format(new Date(), 'yyyy-MM-dd'),
        });
      },

      checkMidnightReset: () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const state = get();

        if (state.lastResetDate !== today) {
          // Save yesterday's data to history
          if (state.todayChecklist) {
            const yesterdayWeight = state.weightEntries.find(
              (entry) => entry.date === state.lastResetDate
            );

            const historyEntry = {
              ...state.todayChecklist,
              weightEntry: yesterdayWeight,
            };

            set({
              dayHistory: [...state.dayHistory, historyEntry],
            });
          }

          // Reset for new day
          get().resetDailyChecklist();
        }
      },

      resetAllProgress: () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        set({
          weightEntries: [{ id: '1', date: today, weight: 188, note: 'Starting weight' }],
          startWeight: 188,
          goalWeight: 165,
          currentDay: 1,
          startDate: today,
          todayChecklist: createDefaultDailyChecklist(),
          lastResetDate: today,
        });
      },

      exportToCSV: () => {
        const state = get();
        const rows = [
          ['Carni-Cut Protocol - Progress Report'],
          [''],
          ['Weight Progress'],
          ['Date', 'Weight (lbs)', 'Notes'],
          ...state.weightEntries.map((entry) => [
            entry.date,
            entry.weight.toString(),
            entry.note || '',
          ]),
          [''],
          ['Summary'],
          ['Starting Weight', state.startWeight.toString()],
          ['Current Weight', (state.weightEntries[state.weightEntries.length - 1]?.weight || state.startWeight).toString()],
          ['Goal Weight', state.goalWeight.toString()],
          ['Current Day', state.currentDay.toString()],
        ];

        const csvContent = rows.map((row) => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `carni-cut-progress-${format(new Date(), 'yyyy-MM-dd')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },

      exportToPDF: () => {
        const state = get();
        const currentWeight = state.weightEntries[state.weightEntries.length - 1]?.weight || state.startWeight;
        const totalLoss = state.startWeight - currentWeight;

        // Create a printable HTML page
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Carni-Cut Progress Report</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
                h1 { text-align: center; border-bottom: 3px solid #000; padding-bottom: 10px; }
                h2 { margin-top: 30px; border-bottom: 2px solid #000; padding-bottom: 5px; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #000; padding: 10px; text-align: left; }
                th { background: #000; color: #fff; }
                .summary { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
                .stat-box { border: 2px solid #000; padding: 20px; text-align: center; }
                .stat-label { font-size: 0.9em; color: #666; margin-bottom: 5px; }
                .stat-value { font-size: 2em; font-weight: bold; }
                @media print { body { padding: 20px; } }
              </style>
            </head>
            <body>
              <h1>CARNI-CUT PROTOCOL</h1>
              <h2>Progress Report - ${format(new Date(), 'MMMM dd, yyyy')}</h2>

              <div class="summary">
                <div class="stat-box">
                  <div class="stat-label">Starting Weight</div>
                  <div class="stat-value">${state.startWeight} lbs</div>
                </div>
                <div class="stat-box">
                  <div class="stat-label">Current Weight</div>
                  <div class="stat-value">${currentWeight} lbs</div>
                </div>
                <div class="stat-box">
                  <div class="stat-label">Total Loss</div>
                  <div class="stat-value">${totalLoss.toFixed(1)} lbs</div>
                </div>
                <div class="stat-box">
                  <div class="stat-label">Days Completed</div>
                  <div class="stat-value">${state.currentDay}</div>
                </div>
              </div>

              <h2>Weight History</h2>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Weight (lbs)</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  ${state.weightEntries.map((entry) => `
                    <tr>
                      <td>${format(new Date(entry.date), 'MMM dd, yyyy')}</td>
                      <td><strong>${entry.weight}</strong></td>
                      <td>${entry.note || '-'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>

              <p style="margin-top: 40px; text-align: center; color: #666;">
                Generated by Carni-Cut Tracker | ${format(new Date(), 'MMMM dd, yyyy HH:mm')}
              </p>
            </body>
          </html>
        `);

        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
        }, 250);
      },
    }),
    {
      name: 'carni-cut-storage',
    }
  )
);
