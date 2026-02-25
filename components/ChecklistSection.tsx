
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, typography, spacing } from '@/styles/commonStyles';
import { ChecklistItem } from '@/types/ExitPlan';

interface ChecklistSectionProps {
  category: string;
  items: ChecklistItem[];
  onToggle: (itemId: string) => void;
}

export function ChecklistSection({ category, items, onToggle }: ChecklistSectionProps) {
  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const allCompleted = completedCount === totalCount;

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <Text style={styles.progress}>
          {completedCount}/{totalCount}
        </Text>
      </View>
      {items.map((item) => {
        const isCompleted = item.completed;
        const textColor = isCompleted ? colors.textSecondary : colors.text;
        const iconColor = isCompleted ? colors.success : colors.border;

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => onToggle(item.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}>
              {isCompleted && (
                <IconSymbol
                  ios_icon_name="checkmark"
                  android_material_icon_name="check"
                  size={16}
                  color={colors.card}
                />
              )}
            </View>
            <Text style={[styles.itemText, { color: textColor }]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  categoryTitle: {
    ...typography.h3,
    color: colors.text,
  },
  progress: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  itemText: {
    ...typography.body,
    flex: 1,
  },
});
