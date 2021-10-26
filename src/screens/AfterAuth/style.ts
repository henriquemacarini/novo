import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AAAAAA',
    paddingBottom: 24

  },
  actionView: { backgroundColor: colors.white, height: 125, marginTop: 25, marginHorizontal: 24, borderRadius: 5 },
  minimalText: { color: '#AAAAAA', fontSize: 16, textAlign: 'center' },
  viewContent: {
    flexDirection: 'row', padding: 10,
    justifyContent: 'center'

  }
})