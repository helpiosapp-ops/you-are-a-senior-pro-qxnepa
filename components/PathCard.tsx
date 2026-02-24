
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, typography, spacing } from '@/styles/commonStyles';
import { ExitPath } from '@/types/ExitPlan';

interface PathCardProps {
  path: ExitPath;
  title: string;
  description: string;
  iconName: string;
  selected: boolean;
  onPress: () => void;
}

export function PathCard({ path, title, description, iconName, selected, onPress }: PathCardProps) {
  const borderColor = selected ? colors.primary : colors.border;
  const backgroundColor = selected ? colors.highlight : colors.card;

  return (
    <TouchableOpacity
      style={[styles.card, { borderColor, backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <IconSymbol
          ios_icon_name={iconName}
          android_material_icon_name={iconName as any}
          size={32}
          color={selected ? colors.primary : colors.textSecondary}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {selected && (
        <View style={styles.checkmark}>
          <IconSymbol
            ios_icon_name="check"
            android_material_icon_name="check"
            size={20}
            color={colors.primary}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  checkmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
});
