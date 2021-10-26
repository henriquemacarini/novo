import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
  },
  content: {
    width: '90%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 25,
    backgroundColor: colors.white,
    marginBottom: 15,
    borderRadius: 3,

  },
  content1: {
    flexDirection: 'row',


  }
})