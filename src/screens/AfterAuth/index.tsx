import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { UserStatus } from '../../components/UserStatus'
import { useJourney } from '../../context/journey'

import { styles } from './style'

export function AfterAuth() {

  const navigation: any = useNavigation();

  const { status } = useJourney()


  function handleUnavailability() {
    navigation.navigate('Informar Indisponibilidade')
  }

  function handleStartJourney() {
    if (status)
      navigation.navigate('Iniciar Jornada')
  }
  return (
    <View style={styles.container}>
      <Header />


      <ScrollView
        showsVerticalScrollIndicator={false}
      >


        <View style={[styles.actionView, { height: 130 }]}>
          <View style={{ alignItems: 'center', width: '100%', marginTop: 10 }}>
            <Button
              title="Iniciar Jornada"
              onPress={handleStartJourney}
            />
          </View>
          <View style={styles.viewContent} >
            <Text style={styles.minimalText}>Leia o QR Code da instituição de ensino</Text>
          </View>
        </View>


        <View style={[styles.actionView, { height: 190 }]}>
          <UserStatus />
          <View style={{ alignItems: 'center', width: '100%', marginTop: 10 }}>
            <Button
              title={status ? 'Informar Indisponibilidade' : 'Informar Disponibilidade'}
              onPress={handleUnavailability}
            />
          </View>
          <View style={styles.viewContent} >
            <Text style={styles.minimalText}>Informe sua condição no dia vigente</Text>
          </View>

        </View>
      </ScrollView>
    </View>
  )
}