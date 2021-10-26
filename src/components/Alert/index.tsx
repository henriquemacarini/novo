import React, { ReactNode } from 'react'
import { Modal, View, Text, ModalProps } from 'react-native'
import { styles } from './style'
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../global/colors';

type Props = ModalProps & {
  children: ReactNode
  handleCloseAlert(): void
}

export function Alert({ children, handleCloseAlert, ...rest }: Props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          {children}
          <FontAwesome5 name="check-circle" size={38} color={colors.primary} style={{ top: 30 }} onPress={handleCloseAlert} />
        </View>
      </View>

    </Modal>
  )
}