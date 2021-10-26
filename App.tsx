import { StatusBar } from 'expo-status-bar';
import React from 'react';


import { useFonts, Oswald_400Regular, Oswald_500Medium, Oswald_600SemiBold } from '@expo-google-fonts/oswald';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/auth';
import { colors } from './src/global/colors';

import { Routes } from './src/routes';
import { JourneyProvider } from './src/context/journey';
import { ClassProvider } from './src/context/class';


export default function App() {
  const [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold
  });

  if (!fontsLoaded)
    return <AppLoading />

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={colors.background} />
      <AuthProvider>
        <JourneyProvider>
          <ClassProvider>
            <Routes />
          </ClassProvider>
        </JourneyProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
