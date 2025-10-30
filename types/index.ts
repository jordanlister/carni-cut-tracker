export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  note?: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface MealSection {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface WorkoutDay {
  day: string;
  title: string;
  description?: string;
  completed: boolean;
}

export interface DailyChecklist {
  date: string;
  meals: MealSection[];
  morningWorkout: boolean;
  eveningWorkout: boolean;
  waterIntake: number; // in oz
  caloriesConsumed: number;
  notes: string;
}

export interface AppState {
  // Weight tracking
  weightEntries: WeightEntry[];
  startWeight: number;
  goalWeight: number;
  currentDay: number;
  startDate: string;

  // Daily tracking
  todayChecklist: DailyChecklist | null;
  lastResetDate: string;

  // Actions
  addWeightEntry: (weight: number, note?: string) => void;
  updateCurrentDay: () => void;
  toggleMealItem: (mealId: string, itemId: string) => void;
  toggleWorkout: (type: 'morning' | 'evening') => void;
  updateWaterIntake: (amount: number) => void;
  updateCalories: (calories: number) => void;
  updateDailyNote: (note: string) => void;
  resetDailyChecklist: () => void;
  resetAllProgress: () => void;
  checkMidnightReset: () => void;
  exportToCSV: () => void;
  exportToPDF: () => void;
}
