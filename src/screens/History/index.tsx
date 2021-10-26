import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { HistoryCard } from '../../components/HistoryCard'
import { useJourney } from '../../context/journey'

import { styles } from './style'

export function History() {

  const { history } = useJourney()

  return (
    <View style={styles.container}>

      <FlatList
        data={history}
        renderItem={({ item }) => (
          <HistoryCard
            data={item}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

    </View>
  )
}