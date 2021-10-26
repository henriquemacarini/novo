import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { colors } from "../../global/colors";
import { fonts } from "../../global/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    textAlign: 'center',
    marginBottom: 25
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  button: {
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: colors.primary,
    height: 45,
    width: 150,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '90%',
  },
  viewButton: {
    paddingVertical: 24,
    width: '100%',
    alignItems: 'center'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  viewImage: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  modalText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  }
})