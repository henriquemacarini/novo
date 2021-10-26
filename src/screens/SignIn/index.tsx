import React, { useEffect, useState } from 'react'
import { Text, TextInput, View, Image, Keyboard, Switch, ActivityIndicator, TouchableOpacity } from 'react-native'
import { styles } from './style'
import { Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons'

import { TextInputMask } from 'react-native-masked-text'

import { Button } from '../../components/Button'

import LogoApp from '../../assets/logoapp.png'

import { useNavigation } from '@react-navigation/core'
import { colors } from '../../global/colors'
import { useAuth } from '../../context/auth'
import { fonts } from '../../global/fonts'
import { Alert } from '../../components/Alert'
import { GlobalStyles } from '../../global/styles'
import { BarCodeScanner } from 'expo-barcode-scanner'

import { ModalView } from '../../components/Modal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { recoverPassword } from '../../services/auth'


export function SignIn() {

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const { signIn, loading } = useAuth()

  const [isEnabled, setIsEnabled] = useState(true)
  const [hidePassword, setHidePassword] = useState(true)
  const [alertVisible, setAlert] = useState(false)
  const [alertPass, setAlertPass] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [loadingPass, setLoading] = useState(false)
  const [document, setDocument] = useState('')

  useEffect(() => {
    async function setSwitch() {
      if (isEnabled)
        await AsyncStorage.setItem('@sister:switch', JSON.stringify(true))
      else {
        await AsyncStorage.multiRemove(['@sister:user', '@sister:password'])
      }
    }
    setSwitch()
  }, [isEnabled])

  useEffect(() => {
    async function saveUser() {
      if (isEnabled && user != '')
        await AsyncStorage.setItem('@sister:user', JSON.stringify(user))
    }
    saveUser()

  }, [user])

  useEffect(() => {
    async function saveUser() {

      const storagedUser = await AsyncStorage.getItem('@sister:user')
      const storagedPass = await AsyncStorage.getItem('@sister:password')

      if (storagedUser)
        setUser(JSON.parse(storagedUser))
      if (storagedPass)
        setPassword(JSON.parse(storagedPass))
    }
    saveUser()
  }, [])

  useEffect(() => {
    async function saveUser() {
      if (isEnabled && password != '')
        await AsyncStorage.setItem('@sister:password', JSON.stringify(password))
    }
    saveUser()

  }, [password])


  const navigation: any = useNavigation()

  function handleSignUp() {
    navigation.navigate('SignUp')
  }

  async function handleSignIn() {
    Keyboard.dismiss()

    const response = await signIn(user, password)
    if (!response)
      setAlert(true)
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status != 'granted') {
        alert('Desculpa, mas precisamos de acesso a sua câmera!');
        await BarCodeScanner.requestPermissionsAsync();
      }
    })();
  }, []);

  async function handleResetPassword() {
    setLoading(true)
    try {
      const response = await recoverPassword(user)
      console.log(response.data)
      if (response.data.success)
        setAlertPass(true)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }

  }


  function handleCloseAlert() {
    setAlert(false)
    setAlertPass(false)
  }

  return (
    <View style={styles.container}>
      <Alert
        visible={alertVisible}
        handleCloseAlert={handleCloseAlert}
      >
        <Text style={GlobalStyles.alertText}>Credenciais inválidas</Text>
      </Alert>

      <Alert
        visible={alertPass}
        handleCloseAlert={handleCloseAlert}
      >
        <Text style={GlobalStyles.alertText}>Nova senha enviada ao email</Text>
      </Alert>

      <ModalView visible={modalVisible}>
      </ModalView>

      <View style={styles.logo}>
        <Image
          source={LogoApp}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={{ fontFamily: fonts.text, fontWeight: '700', color: colors.white, fontSize: 28, marginTop: 25 }}>Sister Professor</Text>
      </View>

      <View style={styles.form}>

        <View style={styles.inputView}>
          <Feather name="user" size={20} color="#CDCDCD" style={{ marginLeft: 15 }} />
          <TextInputMask
            type={'cpf'}
            value={user}
            defaultValue={user}
            style={styles.input}
            onChangeText={text => setUser(text)}
            placeholder={'CPF'}
            placeholderTextColor="#AAAAAA"
          />
        </View>

        <View style={styles.inputView}>
          <Feather name="lock" size={20} color="#CDCDCD" style={{ marginLeft: 15 }} />
          <TextInput
            style={styles.input}
            secureTextEntry={hidePassword}
            onChangeText={text => setPassword(text)}
            placeholder={'Senha'}
            placeholderTextColor="#AAAAAA"
            defaultValue={password}
            keyboardType={'numeric'}
          />
          {!hidePassword ?
            <Entypo name="eye-with-line" size={20} color='#CDCDCD' onPress={() => setHidePassword(!hidePassword)} />
            :
            <MaterialCommunityIcons name="eye-outline" size={20} color="#CDCDCD" onPress={() => setHidePassword(!hidePassword)} />}
        </View>

        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
          <Switch
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={isEnabled ? colors.white : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsEnabled}
            value={isEnabled}
          />
          <Text style={{ color: "#A7A7A7" }}>Lembrar minhas credenciais</Text>
        </View>

        <View style={styles.button}>
          {loading ?
            <ActivityIndicator color={colors.white} size="large" /> :
            <Button
              title="Entrar"
              onPress={handleSignIn}
            />
          }
        </View>

        <TouchableOpacity style={styles.clickButton} onPress={handleResetPassword}>
          <Text style={styles.passText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signUp}>
        <Text style={{
          fontWeight: "400",
          fontSize: 16,
          color: '#A7A7A7',
          textAlign: 'center'
        }}>Não tem cadastro de professor?</Text>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sisterPay}>
        <Image
          source={LogoApp}
          style={{ width: 18, height: 18, marginRight: 15 }}
        />
        <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 18 }}>SisterPay</Text>
      </View>
    </View>
  )
}