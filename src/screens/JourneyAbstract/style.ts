import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#AAAAAA',
    paddingHorizontal: 24,
    paddingVertical: 24

  },
  content: {
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 24
  }
})