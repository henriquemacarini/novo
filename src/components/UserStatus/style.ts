import { StyleSheet } from "react-native";
import { colors } from '../../global/colors'
import { fonts } from "../../global/fonts";

export const styles = StyleSheet.create({

  text: {
    fontSize: 18,
    color: 'gray',
    fontWeight: '400',
    marginTop: 22,
    marginLeft: 10
  },
  status: {
    height: 60,
    borderColor: colors.overlay,
    marginHorizontal: 24,
    backgroundColor: colors.white,
    borderRadius: 5
  },
  button: {
    alignSelf: 'center',
    marginTop: 15,
    borderColor: colors.background,
    borderWidth: 2,
    padding: 15,
    width: '90%',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    color: colors.primary,
    fontWeight: '700'
  }
})