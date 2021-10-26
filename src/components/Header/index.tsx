import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons';

import { styles } from './style'
import { colors } from '../../global/colors';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import LogoApp from '../../assets/logoapp.png'
import { useAuth } from '../../context/auth';
import { api } from '../../services/api';
import { getTie } from '../../services/journeyServices';
import { useJourney } from '../../context/journey';

export function Header() {

  const { getFullDate, logOut, acess_token } = useAuth()

  const { school, checkStatus } = useJourney()

  const [image, setImage] = useState(true)



  const [dayOfWeek, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [today, setToday] = useState('')

  const [userInfo, setUserInfo] = useState<any>({})

  useEffect(() => {
    const date = new Date()
    var dd = String(date.getDate()).padStart(2, '0');
    setToday(dd)
    var day = date.getDay()
    var month = date.getMonth()
    var year = date.getFullYear()

    var correctMonth = (month + 1).toString().padStart(2, '0')

    getFullDate(dd + '/' + correctMonth + '/' + year)


    switch (day) {
      case 0: setDay('Domingo')
        break;
      case 1: setDay('Segunda-feira')
        break;
      case 2: setDay('Terça-feira')
        break;
      case 3: setDay('Quarta-feira')
        break;
      case 4: setDay('Quinta-feira')
        break;
      case 5: setDay('Sexta-feira')
        break;
      case 6: setDay('Sábado')
    }
    switch (month) {
      case 0: setMonth('Janeiro')
        break;
      case 1: setMonth('Fevereiro')
        break;
      case 2: setMonth('Março')
        break;
      case 3: setMonth('Abril')
        break;
      case 4: setMonth('Maio')
        break;
      case 5: setMonth('Junho')
        break;
      case 6: setMonth('Julho')
        break;
      case 7: setMonth('Agosto')
        break;
      case 8: setMonth('Setembro')
        break;
      case 9: setMonth('Outubro')
        break;
      case 10: setMonth('Novembro')
        break;
      case 11: setMonth('Dezembro')
        break;
    }

  }, [])

  useEffect(() => {
    async function getData() {
      api.defaults.headers.authorization = `Bearer ${acess_token}`
      const response = await getTie()
      checkStatus(response.data[0].status)
      setUserInfo(response.data[0])
      if (response.data[0].image)
        setImage(true)
    }
    getData()
  }, [])

  function handleLogOut() {
    logOut()
  }


  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', height: 80, alignItems: 'center', marginTop: getStatusBarHeight(), paddingHorizontal: 24 }}>
        <Entypo name="log-out" size={24} color={colors.white} onPress={handleLogOut} style={{ transform: [{ rotateY: '180deg' }] }} />
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={LogoApp}
            style={{ height: 30, width: 30, marginLeft: 32 }}
          />
          <Text style={{ fontSize: 24, color: colors.white, fontWeight: '700', marginLeft: 10 }}>Sister</Text>
        </View>

      </View>
      <View style={styles.user}>
        {
          image &&
          <Image
            source={{
              uri: userInfo?.image
            }}
            style={{ width: 45, height: 45, borderRadius: 22, marginRight: 12 }}
          />
        }
        <View>
          <Text style={{ color: colors.white, fontSize: 18, fontWeight: '700' }}>Olá, {userInfo.name}</Text>
          <Text style={styles.emailText}>{userInfo?.email}</Text>
        </View>
      </View>
      {school != '' && <Text style={{ paddingHorizontal: 24, color: colors.white }}>Escola</Text>}
      <View style={styles.school}>
        <Text style={{ color: colors.white, fontSize: 18, fontWeight: '700', }}>{school}</Text>
        <Text style={[styles.emailText, { paddingRight: 12 }]}>{dayOfWeek}, {today} de {month}</Text>
      </View>
    </View>
  )
}