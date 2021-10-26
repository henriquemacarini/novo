import React from "react";
import { View, Text, FlatList } from 'react-native'
import { Button } from "../../components/Button";
import { Journey } from "../../components/Journey";
import { useAuth } from "../../context/auth";
import { useJourney } from "../../context/journey";
import { styles } from "./style";

export function JourneyAbstract() {

  const { journeyAbstract, closeJourneyAbstract } = useJourney()
  const { logOut } = useAuth()

  function close() {
    closeJourneyAbstract()
    logOut()
  }

  if (journeyAbstract) {
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>Oops, parece que estamos sem os dados do resumo de sua jornada.
          Desculpe pelo incoveniente
        </Text>
        <View style={{ flex: 1, width: '100%', alignItems: 'center', paddingTop: '70%' }}>
          <Button
            title="Fechar"
            onPress={close}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>

      <View style={{ flex: 1, marginBottom: 25 }}>
        <FlatList
          data={journeyAbstract}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Journey
              data={item}
            />
          )}
        />
      </View>
      <Button
        title="Fechar"
        onPress={close}
      />
    </View>
  )
}