import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'

import { styles } from './style'
import { colors } from '../../global/colors';
import { useClass } from '../../context/class';
import { fonts } from '../../global/fonts';
import { useNavigation } from '@react-navigation/core';
import { ModalView } from '../../components/ModalView';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/build/AntDesign';


export function InClass() {

  const navigation: any = useNavigation()

  const [modalVisible, setModalVisible] = useState(false)

  const [presenceModal, setModal] = useState(false)
  const [abscentModal, setAbscentModal] = useState(false)
  const [modalLastClass, setModalLastClass] = useState(false)


  const [resume, setResume] = useState('')

  const { currentClass, finishClass, alunos, registrados, lastClass } = useClass()

  function handleFinishClass() {
    setModalVisible(true)
  }

  function handleCloseModal() {
    setAbscentModal(false)
    setModal(false)
    setModalLastClass(false)
  }

  function handleRegisterPresence() {
    navigation.navigate('Registrar presença')
  }

  async function sendData() {
    const response = await finishClass(resume)

    if (response)
      navigation.navigate('Class Abstract')
  }


  return (
    <View style={styles.container}>
      <ModalView
        visible={modalVisible}
      >

        <Text style={{ marginTop: 25, fontFamily: fonts.subtitle, color: colors.overlay, fontSize: 24 }}>Resumo da Aula</Text>
        <TextInput
          multiline
          onChangeText={text => setResume(text)}
          placeholder="Digite o resumo da aula ministrada"
          placeholderTextColor={colors.white}
          style={{
            height: 150, width: '90%', backgroundColor: colors.overlay, borderRadius: 5, paddingHorizontal: 24,
            marginTop: 5, textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: colors.white, marginBottom: 25
          }}>

        </TextInput>
        <Button
          title="Enviar"
          onPress={sendData}
        />

      </ModalView>

      <ModalView
        visible={presenceModal}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <View style={{ flexDirection: 'row', marginBottom: 15, justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 24 }}>
            <FontAwesome name="users" size={24} color={colors.primary} />
            <Text style={{ fontFamily: fonts.subtitle, color: 'black', fontSize: 24, alignSelf: 'center' }}>Presenças registradas</Text>
            <AntDesign name="close" size={32} color={colors.primary} style={{ alignSelf: 'flex-end' }} onPress={handleCloseModal} />
          </View>

          <FlatList
            data={registrados}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <View style={{ width: 600, paddingHorizontal: 24, marginVertical: 10, flexDirection: 'row', }}>
                <Entypo name="user" size={24} color={colors.primary} style={{}} />
                <Text style={{ fontFamily: fonts.text, color: colors.primary, fontWeight: 'bold', marginLeft: 20, fontSize: 16, textAlign: 'justify' }}>{item}</Text>
              </View>
            )}
          />
        </View>
      </ModalView>

      <ModalView
        visible={abscentModal}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <View style={{ flexDirection: 'row', marginBottom: 15, justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 24 }}>
            <FontAwesome name="users" size={24} color={colors.primary} />
            <Text style={{ fontFamily: fonts.subtitle, color: 'black', fontSize: 24, alignSelf: 'center' }}>Alunos faltantes</Text>
            <AntDesign name="close" size={32} color={colors.primary} style={{ alignSelf: 'flex-end', }} onPress={handleCloseModal} />
          </View>

          <FlatList
            data={alunos}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <View style={{ paddingHorizontal: 12, marginVertical: 10, flexDirection: 'row' }}>
                <Entypo name="user" size={24} color={colors.primary} style={{ left: 0 }} />
                <Text style={{ fontFamily: fonts.text, color: colors.primary, fontWeight: 'bold', fontSize: 16, marginLeft: 24 }}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      </ModalView>

      <ModalView
        visible={modalLastClass}
      >
        <Text style={{ marginTop: 25, fontFamily: fonts.subtitle, color: colors.overlay, fontSize: 24 }}>Resumo da última Aula</Text>
        <View style={{ width: '70%', alignItems: 'center', marginBottom: 30, marginTop: 30 }}>
          <Text>{lastClass.note}</Text>
        </View>
        <Button
          title="Fechar"
          onPress={handleCloseModal}
        />
      </ModalView>

      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.actionView}>
          <View style={styles.viewContent}>
            <Entypo name="bar-graph" size={24} color={colors.primary} />
            <Text style={styles.titleText}>Aula em Andamento</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
            <Text>Disciplina:</Text>
            <Text>{currentClass}</Text>
          </View>
        </View>

        <View style={styles.actionView}>
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Button
              title="Resumo aula anterior"
              onPress={() => setModalLastClass(true)}
            />
          </View>
          <View style={styles.viewContent} >
            <Text style={styles.minimalText}>Análise sintática</Text>
          </View>
        </View>

        <View style={styles.actionView}>
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Button
              title="Registrar Presença"
              onPress={handleRegisterPresence}
            />
          </View>
          <View style={styles.viewContent} >
            <Text style={styles.minimalText}>Leia o Qrcode do aluno para registrar sua presença na aula</Text>
          </View>
        </View>

        <View style={styles.actionView}>
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Button
              title="Presenças registradas"
              onPress={() => setModal(true)}
            />
          </View>
          <View style={styles.viewContent} >
            <Text style={styles.minimalText}>Veja as presenças já registradas durante essa aula</Text>
          </View>
        </View>
        <View style={styles.actionView}>
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Button
              title="Presenças não registradas"
              onPress={() => setAbscentModal(true)}
            />
          </View>
          <View style={styles.viewContent} >
            <Text style={styles.minimalText}>Veja os alunos que não tiveram sua presença registrada ainda</Text>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginVertical: 15 }}>
          <Button title="Finalizar Aula" onPress={handleFinishClass} />
        </View>

      </ScrollView>
    </View >
  )
}