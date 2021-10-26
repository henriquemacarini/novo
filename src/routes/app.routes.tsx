import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../screens/Home'
import { StartJourney } from '../screens/StartJourney'
import { colors } from '../global/colors'
import { FinishJourney } from '../screens/FinishJourney'
import { useJourney } from '../context/journey'
import { ClassAbstract } from '../screens/ClassAbstract'
import { History } from '../screens/History'
import { Indisponible } from '../screens/Indisponible'
import { JourneyAbstract } from '../screens/JourneyAbstract'
import { AfterAuth } from '../screens/AfterAuth'
import { InitClass } from '../screens/initClass'


export function AppRoutes() {

  const { Navigator, Screen } = createNativeStackNavigator()

  const { inJourney } = useJourney()

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

  if (inJourney)
    return (
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen
          name="Home"
          component={Home}
        />
        <Screen
          name="Finalizar Jornada"
          component={FinishJourney}
          options={screenOptions}
        />
        <Screen
          name="Histórico de aulas"
          component={History}
          options={screenOptions}
        />
        <Screen
          name="Iniciar Aula"
          component={InitClass}
          options={screenOptions}
        />
        <Screen
          name="Resumo da Jornada"
          component={JourneyAbstract}
          options={screenOptions}
        />
      </Navigator>
    )

  else
    return (
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen
          name="Choise"
          component={AfterAuth}

        />
        <Screen
          name="Iniciar Jornada"
          component={StartJourney}
          options={screenOptions}
        />
        <Screen
          name="Home"
          component={Home}
        />
        <Screen
          name="Iniciar Aula"
          component={InitClass}
          options={screenOptions}
        />
        <Screen
          name="Histórico de aulas"
          component={History}
          options={screenOptions}
        />
        <Screen
          name="Informar Indisponibilidade"
          component={Indisponible}
        />
        <Screen
          name="Resumo da Jornada"
          component={JourneyAbstract}
          options={screenOptions}
        />
      </Navigator>
    )

}