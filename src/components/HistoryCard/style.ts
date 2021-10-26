import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    marginVertical: 15,
    width: '100%',
    height: 150,
    justifyContent: 'space-evenly'
  },
  content: { flexDirection: 'row', justifyContent: 'space-between', width: 300 }

})