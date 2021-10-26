import React from 'react'
import { View, Text } from 'react-native'

import { styles } from './style'
import { colors } from '../../global/colors';

type Props = {
  data: any
}

export function HistoryCard({ data }: Props) {

  const toFormat = data.class_room.created_at.split('T')[0]

  const formatedDate = {
    dia: toFormat.split('-')[2],
    mes: toFormat.split('-')[1],
    ano: toFormat.split('-')[0]
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Aula: </Text>
        <Text>{data.class_room_teacher_subject.teacher_subject.subject.subject}</Text>
      </View>
      <View style={styles.content}>
        <Text>Data: </Text>
        <Text>{formatedDate.dia}-{formatedDate.mes}-{formatedDate.ano}</Text>
      </View>
      <View style={styles.content}>
        <Text>Série: </Text>
        <Text>{data.class_room.serie.name.split('-')[1]}</Text>
      </View>

      <View style={{ height: 3, backgroundColor: colors.primary, marginVertical: 5, width: '90%', alignSelf: 'center', borderRadius: 5 }} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>Hora inicio{'\n'}    {data.start_time.split(' ')[1].substr(0, 5)}</Text>
        <Text>Hora Fim{'\n'}   {data.end_time?.split(' ')[1].substr(0, 5)}</Text>
      </View>
    </View>
  )


}

