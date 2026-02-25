
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { Stack } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useExitPlan } from '@/hooks/useExitPlan';
import { ChecklistSection } from '@/components/ChecklistSection';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, typography, spacing, commonStyles } from '@/styles/commonStyles';
import { pathDescriptions } from '@/data/checklistData';

export default function PlanScreen() {
  const { data, loading, toggleChecklistItem, updateNotes, getProgress } = useExitPlan();
  const [notes, setNotes] = useState(data.notes);
  const [isExporting, setIsExporting] = useState(false);

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

  const handleExportPDF = async () => {
    if (!selectedPath) {
      Alert.alert('No Plan Selected', 'Please select an exit path first.');
      return;
    }

    console.log('User tapped Export PDF button');
    setIsExporting(true);

    try {
      const pathTitles = {
        resignation: 'Resignation',
        layoff: 'Layoff Risk',
        negotiated: 'Negotiated Exit',
        'career-break': 'Career Break',
      };

      const pathTitle = pathTitles[selectedPath];
      const completedItems = data.checklist.filter(item => item.completed);
      const totalItems = data.checklist.length;
      const progressPercent = Math.round(progressValue);

      const checklistHTML = Object.entries(groupedChecklist)
        .map(([category, items]) => {
          const itemsHTML = items
            .map(
              item => `
              <tr>
                <td style="padding: 6px 0; vertical-align: top; width: 30px;">
                  <span style="font-size: 16px;">${item.completed ? '✓' : '○'}</span>
                </td>
                <td style="padding: 6px 0; vertical-align: top; line-height: 1.5;">
                  ${item.text}
                </td>
              </tr>
            `
            )
            .join('');

          return `
            <div style="margin-bottom: 20px;">
              <h3 style="color: #7A9B8E; margin: 12px 0 8px 0; font-size: 18px; font-weight: 600;">${category}</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  ${itemsHTML}
                </tbody>
              </table>
            </div>
          `;
        })
        .join('');

      const notesHTML = notes ? `
        <div style="margin-top: 24px;">
          <h2 style="color: #2C2C2C; margin: 20px 0 12px 0; font-size: 22px; font-weight: 600;">Personal Notes</h2>
          <div style="background-color: #F8F7F5; padding: 14px; border-radius: 6px; white-space: pre-wrap; word-wrap: break-word; font-size: 14px; line-height: 1.6;">
${notes.replace(/\n/g, '<br/>')}
          </div>
        </div>
      ` : '';

      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exit Plan - ${pathTitle}</title>
  <style>
    @page {
      margin: 0.75in;
      size: letter;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #2C2C2C;
      line-height: 1.6;
      font-size: 14px;
      padding: 0;
      margin: 0;
    }
    
    h1 {
      color: #7A9B8E;
      margin-bottom: 8px;
      font-size: 32px;
      font-weight: 700;
    }
    
    h2 {
      color: #2C2C2C;
      margin-top: 24px;
      margin-bottom: 12px;
      font-size: 22px;
      font-weight: 600;
    }
    
    h3 {
      color: #7A9B8E;
      margin-top: 16px;
      margin-bottom: 12px;
      font-size: 18px;
      font-weight: 600;
    }
    
    .subtitle {
      color: #6B6B6B;
      margin-bottom: 20px;
      font-size: 14px;
    }
    
    .progress {
      background-color: #F8F7F5;
      padding: 14px;
      border-radius: 6px;
      margin-bottom: 20px;
    }
    
    .disclaimer {
      background-color: #FFF9F0;
      border-left: 4px solid #D4A574;
      padding: 14px;
      margin-bottom: 20px;
      font-size: 12px;
      color: #6B6B6B;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    td {
      padding: 6px 0;
      vertical-align: top;
    }
    
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #E0DDD8;
      font-size: 12px;
      color: #6B6B6B;
    }
  </style>
</head>
<body>
  <h1>ExitPlanner</h1>
  <div class="subtitle">Exit Path: ${pathTitle}</div>
  
  <div class="disclaimer">
    <strong>Disclaimer:</strong> This document provides informational guidance only. It does not constitute legal, financial, or professional advice. Consider consulting qualified professionals for your specific situation.
  </div>

  <div class="progress">
    <strong>Progress:</strong> ${completedItems.length} of ${totalItems} items completed (${progressPercent}%)
  </div>

  <h2>Preparation Checklist</h2>
  ${checklistHTML}

  ${notesHTML}

  <div class="footer">
    Generated by ExitPlanner on ${new Date().toLocaleDateString()}
  </div>
</body>
</html>
      `;

      console.log('Generating PDF with full content - all categories included');
      console.log('Total checklist categories:', Object.keys(groupedChecklist).length);
      console.log('Total checklist items:', data.checklist.length);
      
      const { uri } = await Print.printToFileAsync({ 
        html,
        base64: false,
        width: 612,
        height: 792,
      });
      console.log('PDF generated successfully:', uri);

      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Export Exit Plan',
          UTI: 'com.adobe.pdf',
        });
        console.log('PDF shared successfully');
      } else {
        Alert.alert('Success', 'PDF generated successfully');
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      Alert.alert('Export Failed', 'Could not generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const paddingTop = Platform.OS === 'android' ? 48 : 0;

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
        <View style={[commonStyles.container, styles.emptyContainer, { paddingTop }]}>
          <IconSymbol
            ios_icon_name="assignment"
            android_material_icon_name="assignment"
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
      <ScrollView style={[commonStyles.container, { paddingTop }]} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Exit Plan</Text>
          <TouchableOpacity
            style={[styles.exportButton, isExporting && styles.buttonDisabled]}
            onPress={handleExportPDF}
            disabled={isExporting}
            activeOpacity={0.7}
          >
            <IconSymbol
              ios_icon_name="share"
              android_material_icon_name="share"
              size={20}
              color={colors.card}
              style={styles.buttonIcon}
            />
            <Text style={styles.exportButtonText}>
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </Text>
          </TouchableOpacity>
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
  exportButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exportButtonText: {
    ...typography.body,
    color: colors.card,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonIcon: {
    marginRight: spacing.sm,
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
