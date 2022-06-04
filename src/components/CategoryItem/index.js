import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { urlApi } from "../../utils";

const CategoryItem = ({ data, favorite, selected }) => {
  const image = data?.attributes?.icon?.data?.attributes?.url;
  const name = data?.attributes?.name;
  // const favCategoryId = favCategory?
  const navigation = useNavigation();

  const handleNavigateCategory = () => {
    navigation.navigate("Category", { id: data.id, title: name });
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: selected === data.id ? "#D7D7D7" : "#FFF" },
      ]}
      activeOpacity={0.8}
      onPress={handleNavigateCategory}
      onLongPress={favorite}
    >
      <Image style={styles.icon} source={{ uri: `${urlApi}${image}` }} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
