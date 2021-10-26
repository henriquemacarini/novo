import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";
import { fonts } from "../../global/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#D9D9D9'

  },
  content: {
    backgroundColor: colors.white,
    width: '90%',
    marginTop: 25,
    alignItems: 'center',
    padding: 12,
    borderRadius: 7
  },
  text: {
    fontFamily: fonts.title,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  }
})