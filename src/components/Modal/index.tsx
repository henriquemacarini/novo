import React, { ReactNode } from 'react'
import { Modal, View, ModalProps } from 'react-native'
import { styles } from './style'

type Props = ModalProps & {
  children: ReactNode
}

export function ModalView({ children, ...rest }: Props) {
  return (
    <Modal
      animationType="slide"
      statusBarTranslucent
      {...rest}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {children}
        </View>
      </View>
    </Modal>
  )
}