import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.overlay,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: colors.white,
    width: 250,
    height: 150,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
})