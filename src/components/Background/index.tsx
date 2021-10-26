import React, { ReactNode } from 'react'
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './style';

type Props = {
  children: ReactNode
}

export function Background({ children }: Props) {
  return (
    <LinearGradient
      colors={['white', 'white']}
      style={styles.background}
    >
      {children}
    </LinearGradient>
  )
}