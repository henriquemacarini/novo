import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    marginTop: 25
  },
  content: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    paddingVertical: 20
  },
  actionButton: {
    height: 75,
    width: 150,
    backgroundColor: colors.primary,
    borderRadius: 5,
    justifyContent: 'center'
  },
  textButton: {
    fontWeight: '700',
    textAlign: 'center',
    color: colors.white,
    fontSize: 18
  },
  actionView: { backgroundColor: colors.white, height: 125, marginTop: 25, marginHorizontal: 24, borderRadius: 5 },
  minimalText: { color: '#AAAAAA', fontSize: 16, textAlign: 'center' },
  titleText: { fontSize: 18, fontWeight: '700', marginLeft: 12, color: 'black' },
  viewContent: {
    flexDirection: 'row', padding: 10,

  }


})