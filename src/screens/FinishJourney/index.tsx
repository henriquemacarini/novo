import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './style'
import CodeScanner from '../../components/CodeScanner'
import { useJourney } from '../../context/journey'
import { useAuth } from '../../context/auth'
import { GlobalStyles } from '../../global/styles'
import { useNavigation } from '@react-navigation/core'

export function FinishJourney() {
  const { handleFinishJourney } = useJourney()
  const { logOut } = useAuth()

  const navigation: any = useNavigation()

  async function onScan(type: any, data: any) {
    const response = await handleFinishJourney(data)
  }

  return (
    <View style={styles.container}>
      <CodeScanner
        onScan={onScan}
      />
      <Text style={GlobalStyles.modalText}>Escaneie o código QR da instituição</Text>

    </View>
  )
}