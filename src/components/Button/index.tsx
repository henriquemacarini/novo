import React from 'react'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { styles } from './style'

type Props = TouchableOpacityProps & {
  title: string
}

export function Button({ title, ...rest }: Props) {
  return (
    <TouchableOpacity
      {...rest}
      style={styles.container}
      activeOpacity={0.2}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}