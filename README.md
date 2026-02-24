
# ExitPlanner

A calm, offline, privacy-first app for professionals preparing a thoughtful exit from their job.

## Overview

ExitPlanner helps professionals prepare for career transitions including resignation, layoff risk, negotiated exits, and career breaks. The app provides structured guidance, checklists, and planning tools—all stored locally on your device with complete privacy.

## Core Features

### 1. Exit Path Selection
Choose from four exit scenarios:
- **Resignation**: Planning to resign on your own terms
- **Layoff Risk**: Preparing for potential layoff
- **Negotiated Exit**: Discussing mutual separation terms
- **Career Break**: Taking time away from work

### 2. Guided Preparation
For each path, the app provides:
- Step-by-step preparation checklist
- Common mistakes to avoid
- Key considerations before talking to HR or management
- Category-organized tasks (Documents, Financial, References, Timing, Preparation)

### 3. Progress Tracking
- Visual progress indicator showing completion percentage
- Category-based checklist organization
- Persistent local storage of all progress

### 4. Personal Notes
- Private note-taking space for thoughts, questions, and reminders
- Automatically saved to device storage

### 5. PDF Export
- Generate a clean, professional PDF of your exit plan
- Includes selected path, checklist status, and personal notes
- Share via system share sheet

## Technical Architecture

### Technology Stack
- **Framework**: React Native + Expo 54 (managed workflow)
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Storage**: AsyncStorage (local, offline-first)
- **PDF Generation**: expo-print
- **Sharing**: expo-sharing

### Project Structure
```
app/
  (tabs)/
    (home)/
      index.tsx          # Home screen - path selection
      index.ios.tsx      # iOS-specific home screen
    plan.tsx             # Plan screen - checklist & export
    plan.ios.tsx         # iOS-specific plan screen
    _layout.tsx          # Tab navigation layout
    _layout.ios.tsx      # iOS-specific tab layout
components/
  PathCard.tsx           # Exit path selection card
  ChecklistSection.tsx   # Grouped checklist items
  DisclaimerBanner.tsx   # Legal disclaimer component
  FloatingTabBar.tsx     # Custom tab bar
data/
  checklistData.ts       # Default checklists for each path
hooks/
  useExitPlan.ts         # Main data management hook
types/
  ExitPlan.ts            # TypeScript interfaces
styles/
  commonStyles.ts        # Color palette & typography
```

### Data Model
```typescript
interface ExitPlanData {
  selectedPath: 'resignation' | 'layoff' | 'negotiated' | 'career-break' | null;
  checklist: ChecklistItem[];
  notes: string;
  lastUpdated: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  path: ExitPath;
}
```

### Color Palette (Calm & Professional)
- Background: `#F8F7F5` (Soft warm white)
- Text: `#2C2C2C` (Deep charcoal)
- Primary: `#7A9B8E` (Muted sage green - calm, growth)
- Secondary: `#B8A99A` (Warm taupe)
- Accent: `#C89F91` (Soft terracotta)
- Card: `#FFFFFF` (White with subtle shadow)

## Privacy & Security

### What We DON'T Do
- ❌ No user registration or login
- ❌ No cloud sync or data transmission
- ❌ No analytics or tracking
- ❌ No ads
- ❌ No in-app purchases
- ❌ No subscriptions
- ❌ No backend servers
- ❌ No data collection of any kind

### What We DO
- ✅ All data stored locally on your device
- ✅ Complete offline functionality
- ✅ No internet connection required
- ✅ Data never leaves your device (except when you export PDF)
- ✅ You control your data completely

## Legal Disclaimers

### Important Notice
This app provides **informational guidance only**. It does NOT constitute:
- Legal advice
- Financial advice
- Professional counseling
- Medical advice
- Employment law guidance

### Recommendations
Users should consider consulting qualified professionals for:
- Employment lawyers for contract review and severance negotiation
- Financial advisors for financial planning
- Career counselors for career transition guidance
- Mental health professionals for emotional support

### Liability
The app creators assume no liability for decisions made based on app content. Users are responsible for their own career decisions and should seek professional advice appropriate to their specific situation.

## App Store Description

### Title
ExitPlanner - Career Transition Guide

### Subtitle
Private, offline exit planning for professionals

### Description
**Plan Your Career Exit with Confidence**

ExitPlanner is a calm, private space for professionals preparing to leave their job—whether through resignation, layoff, negotiated exit, or career break.

**What You Get:**
• Four guided exit paths tailored to your situation
• Comprehensive preparation checklists
• Common mistakes to avoid
• Key considerations before talking to HR
• Personal notes space
• Export your plan as a professional PDF

**Complete Privacy:**
• No registration or login required
• All data stored locally on your device
• Works completely offline
• No cloud sync, no tracking, no ads
• Your data never leaves your device

**Who It's For:**
• Professionals planning resignation
• Employees preparing for potential layoffs
• Workers considering negotiated exits
• Anyone planning a career break

**What It's NOT:**
This app provides informational guidance only. It does not provide legal, financial, or professional advice. Consider consulting qualified professionals for your specific situation.

**One-Time Purchase:**
€99 - No subscriptions, no in-app purchases, no hidden costs. Buy once, use forever.

**Calm, Professional Design:**
Clean interface with thoughtful spacing and calming colors. No urgency, no pressure—just clear guidance when you need it.

Take control of your career transition with ExitPlanner.

### Keywords
career transition, resignation, layoff preparation, exit planning, career break, job change, professional development, career planning, severance, employment transition

### Category
Productivity / Business

### Age Rating
4+ (No objectionable content)

## Accessibility

- High contrast text for readability
- Clear, simple language throughout
- Logical navigation structure
- Touch targets sized appropriately
- Support for system font scaling
- VoiceOver/TalkBack compatible

## Future Considerations (Not in MVP)

Potential features for future versions:
- Multiple exit plans (compare scenarios)
- Timeline planning with dates
- Document attachment storage
- Customizable checklist items
- Export to other formats (Word, Markdown)
- Reminder notifications for tasks
- Dark mode support

## Development

### Prerequisites
- Node.js 18+
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation
```bash
npm install
```

### Running
```bash
npm run ios     # iOS simulator
npm run android # Android emulator
npm run web     # Web browser
```

### Building
```bash
# iOS
eas build --platform ios

# Android
eas build --platform android
```

## License

Proprietary - All rights reserved

## Support

For support inquiries, contact: [Your support email]

---

**Remember**: This app is a tool for preparation and organization. It does not replace professional advice. Always consult qualified professionals for legal, financial, and career guidance specific to your situation.
