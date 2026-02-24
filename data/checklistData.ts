
import { ChecklistItem, ExitPath } from '@/types/ExitPlan';

export const defaultChecklists: Record<ExitPath, ChecklistItem[]> = {
  resignation: [
    // Documents
    { id: 'res-doc-1', text: 'Review employment contract for notice period', completed: false, category: 'Documents', path: 'resignation' },
    { id: 'res-doc-2', text: 'Check non-compete and confidentiality clauses', completed: false, category: 'Documents', path: 'resignation' },
    { id: 'res-doc-3', text: 'Gather performance reviews and achievements', completed: false, category: 'Documents', path: 'resignation' },
    { id: 'res-doc-4', text: 'Document current projects and responsibilities', completed: false, category: 'Documents', path: 'resignation' },
    
    // Financial
    { id: 'res-fin-1', text: 'Review unused vacation days policy', completed: false, category: 'Financial', path: 'resignation' },
    { id: 'res-fin-2', text: 'Check retirement account vesting schedule', completed: false, category: 'Financial', path: 'resignation' },
    { id: 'res-fin-3', text: 'Review stock options and equity', completed: false, category: 'Financial', path: 'resignation' },
    { id: 'res-fin-4', text: 'Understand health insurance continuation options', completed: false, category: 'Financial', path: 'resignation' },
    
    // References
    { id: 'res-ref-1', text: 'Identify potential references', completed: false, category: 'References', path: 'resignation' },
    { id: 'res-ref-2', text: 'Request LinkedIn recommendations', completed: false, category: 'References', path: 'resignation' },
    { id: 'res-ref-3', text: 'Save contact information of key colleagues', completed: false, category: 'References', path: 'resignation' },
    
    // Timing
    { id: 'res-tim-1', text: 'Consider project deadlines and team impact', completed: false, category: 'Timing', path: 'resignation' },
    { id: 'res-tim-2', text: 'Plan resignation conversation timing', completed: false, category: 'Timing', path: 'resignation' },
    { id: 'res-tim-3', text: 'Prepare transition plan outline', completed: false, category: 'Timing', path: 'resignation' },
    
    // Preparation
    { id: 'res-prep-1', text: 'Draft resignation letter', completed: false, category: 'Preparation', path: 'resignation' },
    { id: 'res-prep-2', text: 'Prepare talking points for resignation meeting', completed: false, category: 'Preparation', path: 'resignation' },
    { id: 'res-prep-3', text: 'Back up personal files from work devices', completed: false, category: 'Preparation', path: 'resignation' },
  ],
  
  layoff: [
    // Documents
    { id: 'lay-doc-1', text: 'Review employment contract for severance terms', completed: false, category: 'Documents', path: 'layoff' },
    { id: 'lay-doc-2', text: 'Document all work achievements and contributions', completed: false, category: 'Documents', path: 'layoff' },
    { id: 'lay-doc-3', text: 'Save copies of performance reviews', completed: false, category: 'Documents', path: 'layoff' },
    { id: 'lay-doc-4', text: 'Keep records of company communications', completed: false, category: 'Documents', path: 'layoff' },
    
    // Financial
    { id: 'lay-fin-1', text: 'Research unemployment benefits eligibility', completed: false, category: 'Financial', path: 'layoff' },
    { id: 'lay-fin-2', text: 'Review severance package components', completed: false, category: 'Financial', path: 'layoff' },
    { id: 'lay-fin-3', text: 'Check retirement account options', completed: false, category: 'Financial', path: 'layoff' },
    { id: 'lay-fin-4', text: 'Understand health insurance options (COBRA)', completed: false, category: 'Financial', path: 'layoff' },
    { id: 'lay-fin-5', text: 'Review emergency fund status', completed: false, category: 'Financial', path: 'layoff' },
    
    // References
    { id: 'lay-ref-1', text: 'Secure references before departure', completed: false, category: 'References', path: 'layoff' },
    { id: 'lay-ref-2', text: 'Request LinkedIn recommendations now', completed: false, category: 'References', path: 'layoff' },
    { id: 'lay-ref-3', text: 'Save contact information of colleagues', completed: false, category: 'References', path: 'layoff' },
    
    // Preparation
    { id: 'lay-prep-1', text: 'Update resume and LinkedIn profile', completed: false, category: 'Preparation', path: 'layoff' },
    { id: 'lay-prep-2', text: 'Back up personal files from work devices', completed: false, category: 'Preparation', path: 'layoff' },
    { id: 'lay-prep-3', text: 'Prepare questions about severance terms', completed: false, category: 'Preparation', path: 'layoff' },
    { id: 'lay-prep-4', text: 'Consider consulting employment lawyer', completed: false, category: 'Preparation', path: 'layoff' },
  ],
  
  negotiated: [
    // Documents
    { id: 'neg-doc-1', text: 'Review employment contract thoroughly', completed: false, category: 'Documents', path: 'negotiated' },
    { id: 'neg-doc-2', text: 'Document performance and contributions', completed: false, category: 'Documents', path: 'negotiated' },
    { id: 'neg-doc-3', text: 'Gather evidence supporting your position', completed: false, category: 'Documents', path: 'negotiated' },
    
    // Financial
    { id: 'neg-fin-1', text: 'Research typical severance packages', completed: false, category: 'Financial', path: 'negotiated' },
    { id: 'neg-fin-2', text: 'Calculate minimum acceptable terms', completed: false, category: 'Financial', path: 'negotiated' },
    { id: 'neg-fin-3', text: 'Review all benefits and equity', completed: false, category: 'Financial', path: 'negotiated' },
    { id: 'neg-fin-4', text: 'Understand health insurance continuation', completed: false, category: 'Financial', path: 'negotiated' },
    
    // References
    { id: 'neg-ref-1', text: 'Secure references discreetly', completed: false, category: 'References', path: 'negotiated' },
    { id: 'neg-ref-2', text: 'Save contact information of key colleagues', completed: false, category: 'References', path: 'negotiated' },
    
    // Preparation
    { id: 'neg-prep-1', text: 'Prepare negotiation talking points', completed: false, category: 'Preparation', path: 'negotiated' },
    { id: 'neg-prep-2', text: 'Consider consulting employment lawyer', completed: false, category: 'Preparation', path: 'negotiated' },
    { id: 'neg-prep-3', text: 'Draft ideal exit agreement terms', completed: false, category: 'Preparation', path: 'negotiated' },
    { id: 'neg-prep-4', text: 'Prepare alternative scenarios', completed: false, category: 'Preparation', path: 'negotiated' },
    { id: 'neg-prep-5', text: 'Back up personal files from work devices', completed: false, category: 'Preparation', path: 'negotiated' },
    
    // Timing
    { id: 'neg-tim-1', text: 'Identify optimal timing for conversation', completed: false, category: 'Timing', path: 'negotiated' },
    { id: 'neg-tim-2', text: 'Plan transition timeline', completed: false, category: 'Timing', path: 'negotiated' },
  ],
  
  'career-break': [
    // Documents
    { id: 'brk-doc-1', text: 'Review employment contract for leave policies', completed: false, category: 'Documents', path: 'career-break' },
    { id: 'brk-doc-2', text: 'Document current projects and status', completed: false, category: 'Documents', path: 'career-break' },
    { id: 'brk-doc-3', text: 'Gather performance reviews', completed: false, category: 'Documents', path: 'career-break' },
    
    // Financial
    { id: 'brk-fin-1', text: 'Calculate financial runway needed', completed: false, category: 'Financial', path: 'career-break' },
    { id: 'brk-fin-2', text: 'Review health insurance options', completed: false, category: 'Financial', path: 'career-break' },
    { id: 'brk-fin-3', text: 'Check retirement account implications', completed: false, category: 'Financial', path: 'career-break' },
    { id: 'brk-fin-4', text: 'Review unused vacation days', completed: false, category: 'Financial', path: 'career-break' },
    { id: 'brk-fin-5', text: 'Plan budget for break period', completed: false, category: 'Financial', path: 'career-break' },
    
    // References
    { id: 'brk-ref-1', text: 'Maintain professional relationships', completed: false, category: 'References', path: 'career-break' },
    { id: 'brk-ref-2', text: 'Request LinkedIn recommendations', completed: false, category: 'References', path: 'career-break' },
    
    // Preparation
    { id: 'brk-prep-1', text: 'Prepare conversation with manager', completed: false, category: 'Preparation', path: 'career-break' },
    { id: 'brk-prep-2', text: 'Draft transition plan', completed: false, category: 'Preparation', path: 'career-break' },
    { id: 'brk-prep-3', text: 'Plan activities for break period', completed: false, category: 'Preparation', path: 'career-break' },
    { id: 'brk-prep-4', text: 'Back up personal files from work devices', completed: false, category: 'Preparation', path: 'career-break' },
    
    // Timing
    { id: 'brk-tim-1', text: 'Consider project deadlines', completed: false, category: 'Timing', path: 'career-break' },
    { id: 'brk-tim-2', text: 'Plan break duration', completed: false, category: 'Timing', path: 'career-break' },
    { id: 'brk-tim-3', text: 'Identify optimal start date', completed: false, category: 'Timing', path: 'career-break' },
  ],
};

export const pathDescriptions: Record<ExitPath, { mistakes: string[], considerations: string[] }> = {
  resignation: {
    mistakes: [
      'Resigning without reviewing your contract first',
      'Not securing references before announcing',
      'Burning bridges with emotional resignation',
      'Forgetting to back up personal work samples',
      'Not understanding your benefits timeline',
    ],
    considerations: [
      'Notice period requirements in your contract',
      'Impact on team and project timelines',
      'Timing relative to bonus or vesting schedules',
      'Health insurance gap coverage',
      'Professional reputation and references',
    ],
  },
  layoff: {
    mistakes: [
      'Not documenting your achievements beforehand',
      'Accepting first severance offer without review',
      'Forgetting to secure references early',
      'Not understanding unemployment eligibility',
      'Losing access to important work contacts',
    ],
    considerations: [
      'Severance package negotiation possibilities',
      'Unemployment benefits eligibility and timing',
      'Health insurance continuation options',
      'Retirement account rollover decisions',
      'Legal review of severance agreement',
    ],
  },
  negotiated: {
    mistakes: [
      'Starting negotiation without legal consultation',
      'Not having clear minimum acceptable terms',
      'Revealing your position too early',
      'Accepting verbal agreements without documentation',
      'Not considering all benefits in negotiation',
    ],
    considerations: [
      'Typical severance packages in your industry',
      'Your leverage and company situation',
      'Tax implications of different payment structures',
      'Non-compete and confidentiality terms',
      'Reference and recommendation agreements',
    ],
  },
  'career-break': {
    mistakes: [
      'Not having sufficient financial runway',
      'Leaving without clear plan or goals',
      'Not maintaining professional network',
      'Forgetting about health insurance coverage',
      'Not documenting achievements before leaving',
    ],
    considerations: [
      'Financial sustainability of break duration',
      'Health insurance coverage options',
      'Impact on career trajectory and resume',
      'Activities and goals for break period',
      'Return-to-work planning and timing',
    ],
  },
};
