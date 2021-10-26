import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";
import { fonts } from "../../global/fonts";

export const styles = StyleSheet.create({
  container: {
    height: 130,
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: 'space-around'
  },
  text: {
    textAlign: 'center', fontWeight: 'bold', fontFamily: fonts.text, color: 'black'
  },
  content: {
    width: 120,
  },
  abstract: {
    flexDirection: 'row', justifyContent: 'space-between', width: '85%'
  }
})