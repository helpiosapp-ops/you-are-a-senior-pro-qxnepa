
import React from 'react';
import { View } from 'react-native';
import FloatingTabBar from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs = [
    {
      name: 'Home',
      title: 'Home',
      route: '/(tabs)/(home)',
      ios_icon_name: 'house.fill',
      android_material_icon_name: 'home',
    },
    {
      name: 'Plan',
      title: 'Plan',
      route: '/(tabs)/plan',
      ios_icon_name: 'checklist',
      android_material_icon_name: 'assignment',
    },
  ];

  return (
    <>
      <View style={{ flex: 1 }} />
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
