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
        const { lastResetDate } = get();

        if (lastResetDate !== today) {
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
    }),
    {
      name: 'carni-cut-storage',
    }
  )
);
