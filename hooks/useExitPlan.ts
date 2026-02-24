
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExitPlanData, ExitPath, ChecklistItem } from '@/types/ExitPlan';
import { defaultChecklists } from '@/data/checklistData';

const STORAGE_KEY = '@exitplanner_data';

const initialData: ExitPlanData = {
  selectedPath: null,
  checklist: [],
  notes: '',
  lastUpdated: new Date().toISOString(),
};

export function useExitPlan() {
  const [data, setData] = useState<ExitPlanData>(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      console.log('Loading exit plan data from storage');
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setData(parsed);
        console.log('Exit plan data loaded:', parsed.selectedPath);
      }
    } catch (error) {
      console.error('Error loading exit plan data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (newData: ExitPlanData) => {
    try {
      console.log('Saving exit plan data:', newData.selectedPath);
      const updated = { ...newData, lastUpdated: new Date().toISOString() };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setData(updated);
    } catch (error) {
      console.error('Error saving exit plan data:', error);
    }
  };

  const selectPath = async (path: ExitPath) => {
    console.log('User selected exit path:', path);
    const newChecklist = defaultChecklists[path];
    await saveData({
      ...data,
      selectedPath: path,
      checklist: newChecklist,
    });
  };

  const toggleChecklistItem = async (itemId: string) => {
    console.log('User toggled checklist item:', itemId);
    const updatedChecklist = data.checklist.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    await saveData({ ...data, checklist: updatedChecklist });
  };

  const updateNotes = async (notes: string) => {
    console.log('User updated notes');
    await saveData({ ...data, notes });
  };

  const resetPlan = async () => {
    console.log('User reset exit plan');
    await saveData(initialData);
  };

  const getProgress = () => {
    if (data.checklist.length === 0) return 0;
    const completed = data.checklist.filter(item => item.completed).length;
    return Math.round((completed / data.checklist.length) * 100);
  };

  return {
    data,
    loading,
    selectPath,
    toggleChecklistItem,
    updateNotes,
    resetPlan,
    getProgress,
  };
}
