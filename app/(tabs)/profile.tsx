
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';

export default function ProfileScreen() {
  return <Redirect href="/(tabs)/(home)" />;
}
