import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TextInput, ScrollView } from 'react-native'
import { Entypo } from '@expo/vector-icons';

import { Header } from '../../components/Header'
import { styles } from './style'
import { colors } from '../../global/colors';
import { useAuth } from '../../context/auth';
import { useClass } from '../../context/class';
import { Button } from '../../components/Button';
import { fonts } from '../../global/fonts';

import moment from 'moment';



export function ClassAbstract() {
  const { deleteData, currentClass, classAbstract } = useClass()

  const [minutos, setMinutos] = useState(0)

  useEffect(() => {

    var antes = classAbstract.endClass.start_time
    var depois = classAbstract.endClass.end_time

    antes = moment(antes).format("HH:mm:SS")
    depois = moment(depois).format("HH:mm:SS")

    const diff = moment(depois).diff(depois)

    console.log(diff)

  }, [])

  const { fullDate } = useAuth()

  function handleDeleteData() {
    deleteData()
  }

  const { alunos, registrados, abstract } = useClass()

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Header />

        <View style={styles.content}>
          <View style={styles.content1}>
            <Entypo name="bar-graph" size={24} color={colors.primary} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 18 }}>Resumo da Aula</Text>
          </View>

          <View style={[styles.content1, { justifyContent: 'space-around' }]}>
            <View style={{ marginTop: 20, height: 60, borderBottomWidth: 1, borderBottomColor: 'black' }}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>Data</Text>
              <Text style={{ alignSelf: 'center' }}>{fullDate} </Text>
            </View>
            <View style={{ marginTop: 20, height: 60, borderBottomWidth: 1, borderBottomColor: 'black' }}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>Disciplina </Text>
              <Text style={{ alignSelf: 'center' }}>{classAbstract?.endClass.subject}</Text>
            </View>
          </View>
          <Text style={{ marginTop: 12, fontWeight: 'bold', fontSize: 18 }}>Presenças registradas</Text>

          <FlatList
            data={registrados}
            keyExtractor={item => item}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ width: '100%', flex: 1, paddingHorizontal: 12 }}>
                <Text style={{ fontFamily: fonts.text }}>{item}</Text>
              </View>
            )}
          />

          <Text style={{ marginTop: 12, fontWeight: 'bold', fontSize: 18 }}>Presenças não registradas</Text>

          <FlatList
            data={alunos}

            keyExtractor={item => item.nome}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ width: '100%', flex: 1, paddingHorizontal: 12 }}>
                <Text style={{ fontFamily: fonts.text }}>{item.name}</Text>
              </View>
            )}
          />

          <Text style={{ marginTop: 12, fontWeight: 'bold', fontSize: 18 }}>Tempo de aula:</Text>
          <Text style={{ marginTop: 12, fontWeight: 'bold', fontSize: 18 }}>{minutos / 60000}</Text>

          <Text style={{ marginTop: 12, fontWeight: 'bold', fontSize: 18 }}>Resumo</Text>
          <TextInput
            defaultValue={abstract}
            multiline={true}
            style={{ backgroundColor: '#D9D9D9', width: '100%', minHeight: 50, borderRadius: 8, marginTop: 5, padding: 5 }}
          />

        </View>
        <Button
          title="Fechar"
          onPress={handleDeleteData} />

        <View style={{ marginBottom: 15 }} />

      </View>
    </ScrollView>
  )
}