import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { urlApi } from "../../utils";
import { styles } from "./styles";

const FavoritePost = ({ data }) => {
  const navigation = useNavigation();

  const handleNavigateDetail = () => {
    navigation.navigate("Details", { id: data.id });
  };

  return (
    <TouchableOpacity onPress={handleNavigateDetail} style={styles.container}>
      <ImageBackground
        style={styles.cover}
        source={{
          uri: `${urlApi}${data?.attributes?.cover?.data?.attributes?.url}`,
        }}
        resizeMode="cover"
        blurRadius={3}
        imageStyle={{ borderRadius: 6, opacity: 0.4 }}
      >
        <Text style={styles.title} numberOfLines={1}>
          {data?.attributes?.title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default FavoritePost;
