import React, { ReactNode } from 'react'
import { Modal, View, ModalProps, TouchableWithoutFeedback } from 'react-native'
import { styles } from './style'

import { Background } from '../Background'

type Props = ModalProps & {
  children: ReactNode

}
export function ModalView({ children, ...rest }: Props) {
  return (
    <Modal
      transparent
      animationType="slide"
      statusBarTranslucent
      {...rest}
    >
      <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Background>
              <View style={styles.bar} />
              {children}
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}