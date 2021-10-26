import React, { useState } from 'react'
import { ActivityIndicator, Text, TextInput, View } from 'react-native'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { useAuth } from '../../context/auth'
import { useJourney } from '../../context/journey'
import { colors } from '../../global/colors'
import { getTie, sendAvailability, sendUnavailability } from '../../services/journeyServices'

import { styles } from './style'

export function Indisponible() {

  const { logOut } = useAuth()
  const { checkStatus, status } = useJourney()

  const [loading, setLoading] = useState(false)
  const [reason, setReason] = useState('')
  const [alert, setAlert] = useState(false)

  function handleCloseAlert() {
    setAlert(false)
    logOut()
  }

  async function submitReason() {
    setLoading(true)
    if (status) {
      try {
        const response = await sendUnavailability(reason)
        if (response.data.success) {
          setAlert(true)
          const reason = await getTie()
          checkStatus(reason.data[0].status)
        }

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    else {
      try {
        const response = await sendAvailability(reason)
        if (response.data.success) {
          setAlert(true)
          const reason = await getTie()
          checkStatus(reason.data[0].status)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

  }



  return (
    <View style={styles.container}>

      <Alert
        handleCloseAlert={handleCloseAlert}
        visible={alert}
      >
        <Text style={{ fontWeight: 'bold', textAlign: 'center', color: colors.primary }}>Status Informado{'\n'}com sucesso</Text>
      </Alert>
      <Header />
      <View style={styles.content}>
        <Text style={styles.text}>Informe o motivo</Text>
        <TextInput
          onChangeText={text => setReason(text)}
          multiline
          placeholder="Digite o motivo aqui"
          placeholderTextColor={colors.white}
          style={{ minHeight: 70, width: '90%', backgroundColor: colors.overlay, borderRadius: 5, marginTop: 10, color: colors.white, fontSize: 15, padding: 10, marginBottom: 25 }}
        />

        {loading ? <ActivityIndicator size="large" color={colors.primary} />
          :
          <Button
            title="Enviar"
            onPress={submitReason}
          />
        }
      </View>

    </View>
  )
}