import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Keyboard, ActivityIndicator } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { styles } from './style'
import * as ImagePicker from 'expo-image-picker';

import { SignUpProps, SignUpFc, getSchools } from '../../services/auth'
import { ModalView } from '../../components/Modal';

import { Button } from '../../components/Button'
import { getCep } from '../../services/cep';
import { useNavigation } from '@react-navigation/core';
import { AntDesign } from '@expo/vector-icons';
import { Alert } from '../../components/Alert';
import { GlobalStyles } from '../../global/styles';


interface adressInfo {
  cep: string
  localidade: string
  logradouro: string
  uf: string
}

export function SignUp() {

  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)

  const [alertVisible, setAlertVisible] = useState(false)

  const [name, setName] = useState('')
  const [document, setDocument] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [number, setNumber] = useState('')
  const [uf, setUf] = useState('')
  const [city, setCity] = useState('')
  const [zip_code, setZipCode] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')

  const [image, setImage] = useState<string | null>(null)

  const [adressInfos, setAdressInfos] = useState<adressInfo | null>(null)
  const [cep, setCep] = useState('')

  function handleGoBack() {
    navigation.goBack()
  }



  async function searchCep() {
    setLoading(true)
    Keyboard.dismiss()
    if (cep.length == 9) {
      const response = await getCep(cep)
      setAdressInfos(response.data)
    }
    setLoading(false)

  }

  useEffect(() => {
    function setAllAdressInfos() {
      if (adressInfos != null) {
        setAddress(adressInfos.logradouro)
        setUf(adressInfos.uf)
        setZipCode(adressInfos.cep)
        setCity(adressInfos.localidade)
      }
    }
    setAllAdressInfos()
  }, [adressInfos])

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.type == 'image') {
      setImage(result.uri);
    }
  };

  async function handleSignUp() {
    const userInfo: SignUpProps = {
      name: name,
      document: document,
      phone: phone,
      email: email,
      address: address,
      number: number,
      uf: uf,
      city: city,
      zip_code: zip_code,
      password: password,
      password_confirmation: password_confirmation,
      image: image
    }

    const response = await SignUpFc(userInfo)
    if (response.data.success)
      setAlertVisible(true)
  }

  function handleCloseAlert() {
    setAlertVisible(false)
    navigation.goBack()
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Alert
          visible={alertVisible}
          handleCloseAlert={handleCloseAlert}
        >
          <Text style={GlobalStyles.alertText}>Conta criada com sucesso</Text>
        </Alert>
        <ModalView
          visible={adressInfos == null}
        >
          <View style={styles.container}>
            <Text style={[styles.modalText, { marginTop: 80 }]}>Primeiro, digite seu CEP</Text>
            <TextInputMask
              type={'zip-code'}
              value={cep}
              onChangeText={text => setCep(text)}
              style={styles.input}
              placeholder="Digite seu CEP"
            />
            <TouchableOpacity style={styles.button} onPress={searchCep}>
              {loading ? <ActivityIndicator size="large" color="white" /> : <Text style={styles.modalText}>Consultar</Text>}
            </TouchableOpacity>

            <AntDesign name="close" size={56} color="white" style={{ position: 'absolute', bottom: 70, alignSelf: 'center' }} onPress={handleGoBack} />
          </View>
        </ModalView>

        <View style={styles.form}>
          <Text style={styles.text}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            onChangeText={text => setName(text)}
          />
          <Text style={styles.text}>CPF</Text>
          <TextInputMask
            type={'cpf'}
            value={document}
            onChangeText={text => setDocument(text)}
            style={styles.input}
            placeholder="Digite seu CPF"
          />
          <Text style={styles.text}>Celular</Text>
          <TextInputMask
            type={'cel-phone'}
            value={phone}
            onChangeText={text => setPhone(text)}
            style={styles.input}
            placeholder="Digite seu celular"
          />
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            placeholder="Digite seu email"
          />
          <Text style={styles.text}>Endereço</Text>
          <TextInput
            style={styles.input}
            defaultValue={adressInfos?.logradouro}
          />
          <Text style={styles.text}>Número</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o numero"
            onChangeText={text => setNumber(text)}
          />
          <Text style={styles.text}>UF</Text>
          <TextInput
            style={styles.input}
            defaultValue={adressInfos?.uf}
          />
          <Text style={styles.text}>Cidade</Text>
          <TextInput
            style={styles.input}
            defaultValue={adressInfos?.localidade}
          />
          <Text style={styles.text}>CEP</Text>
          <TextInput
            style={styles.input}
            defaultValue={adressInfos?.cep}
          />
          <Text style={styles.text}>Senha</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            keyboardType={'number-pad'}
          />
          <Text style={styles.text}>Confirmar senha</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPasswordConfirmation(text)}
            secureTextEntry={true}
            keyboardType={'number-pad'}
          />
          <View style={styles.viewImage}>
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.text}>Escolher foto de perfil</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.image} />}
          </View>

        </View>
        <View style={styles.viewButton}>
          <Button
            title="Cadastrar"
            onPress={handleSignUp}
          />
        </View>
      </View>
    </ScrollView>
  )

}