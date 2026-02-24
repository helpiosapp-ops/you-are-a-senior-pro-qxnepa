
import React from 'react';
import { Slot } from 'expo-router';
import FloatingTabBar from '@/components/FloatingTabBar';

export default function TabLayout() {
  const tabs = [
    {
      name: 'Home',
      label: 'Home',
      route: '/(tabs)/(home)',
      icon: 'home',
    },
    {
      name: 'Plan',
      label: 'Plan',
      route: '/(tabs)/plan',
      icon: 'assignment',
    },
  ];

  return (
    <>
      <Slot />
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
