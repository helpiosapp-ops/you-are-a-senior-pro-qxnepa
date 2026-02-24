
# ExitPlanner - Architecture Documentation

## Overview

ExitPlanner is a React Native + Expo 54 app built with TypeScript, designed as a completely offline, privacy-first career transition planning tool.

## Technology Stack

- **Framework**: React Native 0.81.4
- **Platform**: Expo 54 (managed workflow)
- **Language**: TypeScript 5.9.3
- **Navigation**: expo-router 6.0.0
- **Storage**: @react-native-async-storage/async-storage 3.0.1
- **PDF Generation**: expo-print 15.0.8
- **Sharing**: expo-sharing 14.0.8
- **Animations**: react-native-reanimated 4.1.0
- **Gestures**: react-native-gesture-handler 2.24.0

## Project Structure

```
exitplanner/
├── app/                          # Expo Router pages
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── (home)/              # Home tab group
│   │   │   ├── _layout.tsx      # Home layout
│   │   │   ├── index.tsx        # Home screen (Android/Web)
│   │   │   └── index.ios.tsx    # Home screen (iOS)
│   │   ├── _layout.tsx          # Tab layout (Android/Web)
│   │   ├── _layout.ios.tsx      # Tab layout (iOS)
│   │   ├── plan.tsx             # Plan screen (Android/Web)
│   │   └── plan.ios.tsx         # Plan screen (iOS)
│   ├── _layout.tsx              # Root layout
│   └── +not-found.tsx           # 404 page
├── components/                   # Reusable components
│   ├── ChecklistSection.tsx     # Checklist category display
│   ├── DisclaimerBanner.tsx     # Legal disclaimer banner
│   ├── FloatingTabBar.tsx       # Custom tab bar
│   ├── IconSymbol.tsx           # Cross-platform icons
│   ├── IconSymbol.ios.tsx       # iOS-specific icons
│   └── PathCard.tsx             # Exit path selection card
├── hooks/                        # Custom React hooks
│   └── useExitPlan.ts           # Core data management hook
├── types/                        # TypeScript type definitions
│   └── ExitPlan.ts              # Exit plan data types
├── data/                         # Static data
│   └── checklistData.ts         # Checklist items & descriptions
├── styles/                       # Styling
│   └── commonStyles.ts          # Shared styles & theme
├── constants/                    # App constants
│   └── Colors.ts                # Color palette
├── assets/                       # Static assets
│   ├── fonts/                   # Custom fonts
│   └── images/                  # Images & icons
├── app.json                      # Expo configuration
├── eas.json                      # EAS Build configuration
├── package.json                  # Dependencies
└── tsconfig.json                # TypeScript configuration
```

## Core Architecture Patterns

### 1. Offline-First Design

All data is stored locally using AsyncStorage. No network requests are made.

```typescript
// hooks/useExitPlan.ts
const STORAGE_KEY = '@exitplanner_data';

// Load data on mount
useEffect(() => {
  const loadData = async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      setData(JSON.parse(stored));
    }
  };
  loadData();
}, []);

// Save data on every change
const saveData = async (newData: ExitPlanData) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  setData(newData);
};
```

### 2. Custom Hook for State Management

The `useExitPlan` hook encapsulates all data logic:

```typescript
export function useExitPlan() {
  return {
    data,              // Current exit plan data
    loading,           // Loading state
    selectPath,        // Select exit path
    toggleChecklistItem, // Toggle checklist item
    updateNotes,       // Update personal notes
    resetPlan,         // Reset entire plan
    getProgress,       // Calculate progress percentage
  };
}
```

### 3. Platform-Specific Components

iOS and Android have different UI patterns:

```
index.tsx       // Android/Web version
index.ios.tsx   // iOS-specific version
```

iOS version uses native styling and spacing, while Android/Web uses Material Design patterns.

### 4. Type-Safe Data Model

```typescript
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
  notes: string;
  lastUpdated: string;
}
```

### 5. Component Composition

Components are small, focused, and reusable:

- **PathCard**: Displays exit path option
- **ChecklistSection**: Groups checklist items by category
- **DisclaimerBanner**: Shows legal disclaimer
- **FloatingTabBar**: Custom animated tab bar

## Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
useExitPlan Hook Method
    ↓
Update State
    ↓
Save to AsyncStorage
    ↓
Re-render UI
```

## Key Features Implementation

### 1. Exit Path Selection

```typescript
// User selects path
const handleSelectPath = (path: ExitPath) => {
  selectPath(path); // Loads corresponding checklist
};

// Hook updates data
const selectPath = async (path: ExitPath) => {
  const newChecklist = defaultChecklists[path];
  await saveData({
    ...data,
    selectedPath: path,
    checklist: newChecklist,
  });
};
```

### 2. Checklist Progress Tracking

```typescript
const getProgress = () => {
  if (data.checklist.length === 0) return 0;
  const completed = data.checklist.filter(item => item.completed).length;
  return Math.round((completed / data.checklist.length) * 100);
};
```

### 3. PDF Export

```typescript
const handleExportPDF = async () => {
  // Generate HTML from data
  const html = generateHTML(data);
  
  // Create PDF
  const { uri } = await Print.printToFileAsync({ html });
  
  // Share via system share sheet
  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle: 'Export Exit Plan',
  });
};
```

### 4. Personal Notes

```typescript
// Controlled input
<TextInput
  value={notes}
  onChangeText={setNotes}
  onBlur={() => updateNotes(notes)} // Save on blur
/>
```

## Styling Architecture

### Theme System

```typescript
// styles/commonStyles.ts
export const colors = {
  background: '#F8F7F5',
  text: '#2C2C2C',
  primary: '#7A9B8E',
  card: '#FFFFFF',
  // ... more colors
};

export const typography = {
  h1: { fontSize: 32, fontWeight: '700' },
  h2: { fontSize: 24, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  // ... more styles
};

export const spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32
};
```

### Component Styles

Each component has its own StyleSheet:

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
  },
});
```

## Navigation Architecture

### Expo Router File-Based Routing

```
app/
├── (tabs)/           → Tab navigator
│   ├── (home)/      → Home tab
│   │   └── index    → /
│   └── plan         → /plan
└── +not-found       → 404 page
```

### Custom Tab Bar

FloatingTabBar provides:
- Animated tab indicator
- Smooth transitions
- Platform-specific styling
- Blur effect background

## Performance Optimizations

1. **Memoization**: Progress calculations memoized
2. **Lazy Loading**: Components load on demand
3. **Efficient Re-renders**: State updates are batched
4. **AsyncStorage**: Fast local storage
5. **No Network**: Zero network latency

## Error Handling

```typescript
try {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
} catch (error) {
  console.error('Error saving data:', error);
  // Graceful fallback - data stays in memory
}
```

## Privacy & Security

### No Data Collection
- No analytics
- No tracking
- No user accounts
- No cloud sync
- No external API calls

### Local Storage Only
```typescript
// All data stored locally
AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));

// No network requests
// No fetch() calls
// No API endpoints
```

## Testing Strategy

### Manual Testing
- Test all exit paths
- Test checklist toggling
- Test notes saving
- Test PDF export
- Test app restart (data persistence)
- Test light/dark mode
- Test on iOS and Android

### Edge Cases
- No path selected
- Empty checklist
- Long notes
- All items completed
- App restart

## Build & Deployment

### Development
```bash
npm run dev        # Start Expo dev server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
```

### Production
```bash
eas build --platform ios --profile production
eas build --platform android --profile production
```

### Submission
```bash
eas submit --platform ios --profile production
eas submit --platform android --profile production
```

## Future Enhancements

### Potential Features
- [ ] More exit path scenarios
- [ ] Custom checklist items
- [ ] Timeline planning
- [ ] Document templates
- [ ] Reminder notifications
- [ ] Export to other formats (Word, etc.)
- [ ] Multiple plans support
- [ ] Backup/restore functionality

### Technical Improvements
- [ ] Unit tests
- [ ] E2E tests
- [ ] Performance monitoring
- [ ] Crash reporting (privacy-preserving)
- [ ] Accessibility improvements
- [ ] Internationalization (i18n)

## Maintenance

### Regular Updates
- Keep dependencies updated
- Test on new iOS/Android versions
- Fix any reported bugs
- Improve based on user feedback

### Monitoring
- App Store reviews
- Support email
- Crash reports (if implemented)
- User feedback

---

**Architecture Philosophy**: Simple, focused, privacy-first, offline-capable, and maintainable.
