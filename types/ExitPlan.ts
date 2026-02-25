
export type ExitPath = 'resignation' | 'layoff' | 'negotiated' | 'career-break';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  path: ExitPath;
}

export interface ExitPlanData {
  selectedPath: ExitPath | null;
  checklist: ChecklistItem[];
  lastUpdated: string;
}

export interface PathInfo {
  id: ExitPath;
  title: string;
  description: string;
  icon: string;
  color: string;
}
