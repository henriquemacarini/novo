import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { styles } from './style'
import { colors } from '../../global/colors';

type Props = {
  onScan(type: any, data: any): void
}

export default function CodeScanner({ onScan }: Props) {
  const [scanned, setScanned] = useState(false);


  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    onScan(type, data)
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{
        flex: 1

      }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

    </View>


  );
}