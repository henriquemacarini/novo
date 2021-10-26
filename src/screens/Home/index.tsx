import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import { Header } from "../../components/Header";
import { styles } from "./style";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core";
import { colors } from "../../global/colors";
import { useClass } from "../../context/class";
import { Button } from "../../components/Button";
import { FlatList } from "react-native-gesture-handler";
import { useJourney } from "../../context/journey";

export function Home() {


  const navigation: any = useNavigation()

  const { setToInClass } = useClass()
  const { schedule } = useJourney()


  const [modalVisible, setModalVisible] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [currentQR, setCurrentQR] = useState('')

  function handleStartClass() { //navite pra tela de scanear o codigo QR e na startClass no sucesso, alterar o inClass pra true
    navigation.navigate('Iniciar Aula')
  }

  function handleCloseJourney() {
    console.log('aqui')
    navigation.navigate('Finalizar Jornada')
  }

  function handleGoHistory() {
    navigation.navigate('Histórico de aulas')
  }

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={{ marginBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >

        <View style={[styles.actionView, { height: 150 }]}>
          <View style={styles.viewContent}>
            <Entypo name="bar-graph" size={24} color={colors.primary} />
            <Text style={styles.titleText}>Horários de aula</Text>

          </View>
          <FlatList
            data={schedule}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                <Text>{item.schedule[0].start_time.substr(0, 5)} - {item.schedule[0].end_time.substr(0, 5)}</Text>
                <Text>{item.teacher_subject.subject.subject}</Text>
              </View>
            )}
          />
        </View>

        <TouchableOpacity style={styles.actionView} onPress={handleStartClass}>
          <View style={{ alignItems: 'center', width: '100%', marginTop: 10 }}>
            <Button
              title="Iniciar Aula"
              onPress={handleStartClass}
            />
          </View>
          <View style={styles.viewContent} >
            <Text style={styles.minimalText}>Leia o Qrcode da Aula que será ministrada</Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity style={styles.actionView} onPress={handleGoHistory}>
          <View style={{ alignItems: 'center', width: '100%', marginTop: 10 }}>
            <Button
              title="Histórico de aulas"
              onPress={handleGoHistory}
            />
          </View>
          <View style={styles.viewContent}>
            <Text style={styles.minimalText}>Consultar seu histórico de aulas ministradas</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionView} onPress={handleCloseJourney}>
          <View style={{ alignItems: 'center', width: '100%', marginTop: 10 }}>
            <Button
              title="Finalizar Jornada"
              onPress={handleCloseJourney}
            />
          </View>
          <View style={styles.viewContent}>
            <Text style={styles.minimalText}>Realiza o check-out da instituição de ensino</Text>
          </View>

        </TouchableOpacity>

      </ScrollView>
    </View>

  )
}