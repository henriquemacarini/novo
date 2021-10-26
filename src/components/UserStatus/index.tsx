import React, { useState } from 'react'
import { View, Text, } from 'react-native'
import { useJourney } from '../../context/journey'

import { styles } from './style'

export function UserStatus() {



  const { status } = useJourney()

  return (
    <View style={styles.status}>
      <View>
        <View style={{ flexDirection: 'row' }}>
          {
            status ?
              <>
                <View style={{ backgroundColor: 'green', width: 20, height: 20, borderRadius: 10, marginTop: 25, }} />
                <Text style={styles.text}>Disponivel</Text>
              </>
              :
              <>
                <View style={{ backgroundColor: 'red', width: 20, height: 20, borderRadius: 10, marginTop: 25, }} />
                <Text style={styles.text}>Indisponível</Text>
              </>
          }
        </View>

      </View>
    </View>


  )
}