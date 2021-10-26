import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { styles } from './style'
import CodeScanner from '../../components/CodeScanner'
import { useJourney } from '../../context/journey'
import { useNavigation } from '@react-navigation/core'
import { colors } from '../../global/colors'
import { useClass } from '../../context/class'
import { GlobalStyles } from '../../global/styles'


export function InitClass() {

  const navigation: any = useNavigation()

  const { startClass } = useClass()

  async function onScan(type: any, data: any) {
    var Ids = data.toString().split(',')
    const response = await startClass(Ids[0], Ids[1])
    if (response)
      navigation.navigate('Aula')
  }

  return (
    <View style={styles.container}>
      <CodeScanner
        onScan={onScan}
      />
      <Text style={GlobalStyles.modalText}>Escaneie o código QR da matéria</Text>

    </View>
  )
}