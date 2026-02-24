
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, typography, spacing } from '@/styles/commonStyles';

export function DisclaimerBanner() {
  return (
    <View style={styles.banner}>
      <IconSymbol
        ios_icon_name="info"
        android_material_icon_name="info"
        size={20}
        color={colors.warning}
        style={styles.icon}
      />
      <Text style={styles.text}>
        This app provides informational guidance only. It does not constitute legal, financial, or professional advice. Consider consulting qualified professionals for your specific situation.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    backgroundColor: '#FFF9F0',
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  icon: {
    marginRight: spacing.sm,
    marginTop: 2,
  },
  text: {
    ...typography.bodySmall,
    color: colors.text,
    flex: 1,
    lineHeight: 20,
  },
});
