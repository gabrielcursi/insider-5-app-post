import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 8,
  },
  cover: {
    borderRadius: 4,
    width: WIDTH - 60,
    height: 100,
    justifyContent: "flex-end",
    backgroundColor: "#262630",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    textShadowColor: "#121212",
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 8,
  },
});
