import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { styles } from './style'
import CodeScanner from '../../components/CodeScanner'
import { useJourney } from '../../context/journey'
import { useNavigation } from '@react-navigation/core'
import { colors } from '../../global/colors'
import { ModalView } from '../../components/ModalView'
import { useAuth } from '../../context/auth'
import { GlobalStyles } from '../../global/styles'
import { RectButton } from 'react-native-gesture-handler'


export function StartJourney() {
  const { handleStartJourney, inJourney, handleFinishJourney } = useJourney()
  const { schools } = useAuth()

  const navigation: any = useNavigation()

  async function onScan(type: any, data: any) {
    const response = await handleStartJourney(data)
    if (response)
      navigation.navigate('Home')
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