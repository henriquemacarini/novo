import React from 'react'
import { View, Text } from 'react-native'
import { colors } from '../../global/colors'
import { styles } from './style'

type Props = {
  data: any
}


export function Journey({ data }: Props) {

  return (
    <View style={styles.container}>

      <View style={styles.abstract}>
        <View style={styles.content}>
          <Text style={styles.text}>
            Disciplina:
          </Text>
          <Text style={styles.text}>
            {data.class_room_teacher_subject.teacher_subject.subject.subject}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>
            Presenças:
          </Text>
          <Text style={styles.text}>
            {data.present_pupil_count}
          </Text>
        </View>
      </View>

      <View style={{ width: '70%', height: 3, backgroundColor: colors.primary }} />

      <View style={styles.abstract}>
        <View style={styles.content}>
          <Text style={styles.text}>
            Hora de início:
          </Text>
          <Text style={styles.text}>
            {data.start_time.split(' ')[1]}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.text}>
            Encerramento:
          </Text>
          <Text style={styles.text}>
            {data.end_time?.split(' ')[1]}
          </Text>
        </View>

      </View>
    </View>
  )

}