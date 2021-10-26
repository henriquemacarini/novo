import React from 'react'
import { View, Text } from 'react-native'
import CodeScanner from '../../components/CodeScanner'
import { useClass } from '../../context/class'
import { colors } from '../../global/colors'
import { GlobalStyles } from '../../global/styles'
import { styles } from './style'

export function Presence() {

  const { scanStudent } = useClass()

  async function onScan(type: any, data: any) {
    scanStudent(data)
  }

  return (
    <View style={styles.container}>
      <CodeScanner
        onScan={onScan}
      />
      <Text style={GlobalStyles.modalText}>Escaneie o código QR do aluno</Text>
    </View>
  )
}