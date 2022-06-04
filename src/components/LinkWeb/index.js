import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";

import { WebView } from "react-native-webview";

const LinkWeb = ({ link, title, closeModal }) => {
  return (
    <>
      <TouchableOpacity onPress={closeModal} style={styles.button}>
        <Feather name="x" size={25} color="#FFF" />
        <Text style={styles.name}>{title}</Text>
      </TouchableOpacity>
      <WebView source={{ uri: link }} />
    </>
  );
};

export default LinkWeb;
