import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const GlobalStyles = StyleSheet.create({
  alertText: {
    fontSize: 18, fontWeight: '700', color: colors.primary, alignSelf: 'center'
  },
  modalText: {
    position: 'absolute', top: 100, alignSelf: 'center', fontSize: 18, color: colors.white, fontWeight: '700', backgroundColor: colors.overlay, padding: 12, opacity: 0.8, borderRadius: 5
  }
})
