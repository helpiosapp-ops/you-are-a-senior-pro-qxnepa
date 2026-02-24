
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { useExitPlan } from '@/hooks/useExitPlan';
import { PathCard } from '@/components/PathCard';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { colors, typography, spacing, commonStyles } from '@/styles/commonStyles';
import { ExitPath } from '@/types/ExitPlan';

const paths = [
  {
    id: 'resignation' as ExitPath,
    title: 'Resignation',
    description: 'Planning to resign on your own terms',
    icon: 'person',
  },
  {
    id: 'layoff' as ExitPath,
    title: 'Layoff Risk',
    description: 'Preparing for potential layoff',
    icon: 'warning',
  },
  {
    id: 'negotiated' as ExitPath,
    title: 'Negotiated Exit',
    description: 'Discussing mutual separation terms',
    icon: 'handshake',
  },
  {
    id: 'career-break' as ExitPath,
    title: 'Career Break',
    description: 'Taking time away from work',
    icon: 'schedule',
  },
];

export default function HomeScreen() {
  const { data, loading, selectPath, getProgress } = useExitPlan();

  const selectedPath = data.selectedPath;
  const progress = getProgress();

  const handleSelectPath = (path: ExitPath) => {
    console.log('User tapped path card:', path);
    selectPath(path);
  };

  const paddingTop = Platform.OS === 'android' ? 48 : 0;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'ExitPlanner',
          headerShown: true,
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { ...typography.h2, color: colors.text },
        }}
      />
      <ScrollView style={[commonStyles.container, { paddingTop }]} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Plan Your Exit</Text>
          <Text style={styles.subtitle}>
            A calm, private space to prepare for your next career move
          </Text>
        </View>

        <DisclaimerBanner />

        {selectedPath && (
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Your Progress</Text>
              <Text style={styles.progressPercent}>{progress}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressLabel}>
              Keep going. Take your time with each step.
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Your Exit Path</Text>
          <Text style={styles.sectionSubtitle}>
            Choose the scenario that best matches your situation
          </Text>
          {paths.map((path) => (
            <PathCard
              key={path.id}
              path={path.id}
              title={path.title}
              description={path.description}
              iconName={path.icon}
              selected={selectedPath === path.id}
              onPress={() => handleSelectPath(path.id)}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            All data is stored locally on your device. Nothing is shared or synced to the cloud.
          </Text>
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
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  progressCard: {
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
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  progressTitle: {
    ...typography.h3,
    color: colors.text,
  },
  progressPercent: {
    ...typography.h2,
    color: colors.primary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.highlight,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
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
    marginBottom: spacing.lg,
  },
  footer: {
    marginTop: spacing.xl,
    padding: spacing.md,
    backgroundColor: colors.highlight,
    borderRadius: 12,
  },
  footerText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
