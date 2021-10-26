import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { colors } from '../global/colors'
import { InitClass } from '../screens/initClass'
import { InClass } from '../screens/startClass'
import { Presence } from '../screens/Presence'
import { useClass } from '../context/class'
import { ClassAbstract } from '../screens/ClassAbstract'


export function ClassRoutes() {

  const { currentClass } = useClass()
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
        headerShown: false,
      }}
    >
      <Screen
        name="Aula"
        component={InClass}
      />
      <Screen
        name="Registrar presença"
        component={Presence}
        options={screenOptions}
      />
      <Screen
        name="Class Abstract"
        component={ClassAbstract}

      />
    </Navigator>
  )
}