import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { colors } from "../../global/colors";
import { fonts } from "../../global/fonts";

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: "#e1e1e1"
  },
  text: {
    fontFamily: fonts.text,
    fontSize: 32,
    color: colors.white,
    top: 65,
  },
  form: {
    height: 300,
    width: '90%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderRadius: 6,
    bottom: 17
  },
  logo: {
    width: '100%',
    backgroundColor: colors.background,
    height: 212,
    alignItems: 'center'
  },
  image: {
    marginTop: getStatusBarHeight() + 25,
    width: 35,
    height: 35
  },
  input: {
    width: '70%',
    fontSize: 16,
    marginLeft: 15
  },
  clickButton: {
    marginTop: 20,
    height: 50,
    justifyContent: 'center',

  },
  passText: {
    fontSize: 14,
    color: '#A7A7A7',
    bottom: 15,
    fontWeight: '600'
  },
  button: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: '90%',
    borderRadius: 5
  },
  signUp: {
    width: '90%',
    height: 100,
    backgroundColor: colors.white,
    borderRadius: 6,
    justifyContent: 'space-evenly'
  },
  signUpText: {
    fontFamily: fonts.title,
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 7
  },
  signUpButton: {
    alignItems: 'center'
  },
  inputView: {
    flexDirection: 'row',
    backgroundColor: "#FDFDFD",
    width: '90%',
    marginTop: 10,
    borderRadius: 8,
    height: 56,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#D9D9D9'
  },
  sisterPay: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: '85%',
    borderRadius: 6,
    marginTop: 10,
    flexDirection: 'row'
  },
})