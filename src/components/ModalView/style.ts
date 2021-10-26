import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: colors.primary,

  },
  overlay: {
    backgroundColor: colors.overlay,
    flex: 1
  },
  bar: {
    width: 39,
    height: 2,
    borderRadius: 2,
    backgroundColor: colors.background,
    alignSelf: 'center',
    marginTop: 13,
  }
})