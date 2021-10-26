import { StyleSheet } from "react-native";
import { colors } from '../../global/colors'
import { fonts } from "../../global/fonts";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    height: 250,
    width: '100%',
    alignSelf: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  text: {
    fontSize: 20,
    color: colors.white,
    marginTop: 75,
    textAlign: 'center',
    fontWeight: '700',
  },
  user: {
    height: 50,
    paddingHorizontal: 24,
    width: '100%',
    flexDirection: 'row'
  },
  school: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  emailText: { color: colors.white, fontSize: 14, fontWeight: '400', alignSelf: 'center' }
})