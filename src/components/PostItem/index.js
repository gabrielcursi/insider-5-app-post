import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { urlApi } from "../../utils";
import { styles } from "./styles";

const PostItem = ({ data }) => {
  const navigation = useNavigation();

  const handleDetails = () => {
    navigation.navigate("Details", { id: data?.id });
  };

  return (
    <TouchableOpacity onPress={handleDetails} style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.cover}
          source={{
            uri: `${urlApi}${data?.attributes?.cover?.data?.attributes?.url}`,
          }}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{data?.attributes?.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {data?.attributes?.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PostItem;
