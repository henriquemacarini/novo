import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9'
  },
  actionView: {
    backgroundColor: colors.white,
    height: 125,
    marginTop: 25,
    marginHorizontal: 24,
    borderRadius: 5,
    paddingVertical: 10
  },
  minimalText: {
    padding: 10,
    color: '#AAAAAA',
    fontSize: 16,
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
    color: 'black'
  },
  viewContent: {
    flexDirection: 'row',
    paddingHorizontal: 10

  }
})