import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";
import { fonts } from "../../global/fonts";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: '90%',
    borderRadius: 6,
  },
  text: {
    fontWeight: "700",
    fontSize: 18,
    color: colors.white,
  }
})