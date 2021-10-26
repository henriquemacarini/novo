import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { JourneyAbstract } from '../screens/JourneyAbstract'
import { colors } from '../global/colors'

export function AfterJourney() {

  const { Navigator, Screen } = createNativeStackNavigator()

  const [screenOptions, setScreenOptions] = useState<any>({
    headerShown: true,
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: colors.white,
      fontSize: 20
    },
    headerStyle: {
      backgroundColor: colors.background,

    },
  })

  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen
        name="Resumo da Jornada"
        component={JourneyAbstract}
        options={screenOptions}
      />

    </Navigator>
  )

}