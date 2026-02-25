
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { useExitPlan } from '@/hooks/useExitPlan';
import { ChecklistSection } from '@/components/ChecklistSection';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, typography, spacing, commonStyles } from '@/styles/commonStyles';
import { pathDescriptions } from '@/data/checklistData';

export default function PlanScreen() {
  const { data, loading, toggleChecklistItem, updateNotes, getProgress } = useExitPlan();
  const [notes, setNotes] = useState(data.notes);

  const selectedPath = data.selectedPath;
  const progressValue = getProgress();

  const handleNotesChange = (text: string) => {
    setNotes(text);
  };

  const handleNotesBlur = () => {
    console.log('User updated notes');
    updateNotes(notes);
  };

  const groupedChecklist = data.checklist.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof data.checklist>);

  if (!selectedPath) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Your Plan',
            headerShown: true,
            headerStyle: { backgroundColor: colors.background },
            headerTitleStyle: { ...typography.h2, color: colors.text },
          }}
        />
        <View style={[commonStyles.container, styles.emptyContainer]}>
          <IconSymbol
            ios_icon_name="doc.text"
            android_material_icon_name="description"
            size={64}
            color={colors.textSecondary}
          />
          <Text style={styles.emptyTitle}>No Exit Path Selected</Text>
          <Text style={styles.emptySubtitle}>
            Go to the Home tab to select your exit path and start planning
          </Text>
        </View>
      </>
    );
  }

  const pathInfo = pathDescriptions[selectedPath];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Your Plan',
          headerShown: true,
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { ...typography.h2, color: colors.text },
        }}
      />
      <ScrollView style={commonStyles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Exit Plan</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Common Mistakes to Avoid</Text>
          {pathInfo.mistakes.map((mistake, index) => (
            <React.Fragment key={index}>
              <View style={styles.infoItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.infoText}>{mistake}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Key Considerations</Text>
          {pathInfo.considerations.map((consideration, index) => (
            <React.Fragment key={index}>
              <View style={styles.infoItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.infoText}>{consideration}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preparation Checklist</Text>
          {Object.entries(groupedChecklist).map(([category, items]) => (
            <React.Fragment key={category}>
              <ChecklistSection
                category={category}
                items={items}
                onToggle={toggleChecklistItem}
              />
            </React.Fragment>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Notes</Text>
          <Text style={styles.sectionSubtitle}>
            Use this space for your thoughts, questions, or reminders
          </Text>
          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={handleNotesChange}
            onBlur={handleNotesBlur}
            placeholder="Add your notes here..."
            placeholderTextColor={colors.textSecondary}
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: 120,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  bullet: {
    ...typography.body,
    color: colors.primary,
    marginRight: spacing.sm,
    fontWeight: '600',
  },
  infoText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  notesInput: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    ...typography.body,
    color: colors.text,
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
