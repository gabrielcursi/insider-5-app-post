import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import api from "../../services/api";
import PostItem from "../../components/PostItem";

const CategoryPosts = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [posts, setPosts] = useState([]);

  const handleBack = () => {
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title === "" ? "Categoria" : route.params?.title,
    });
  }, [navigation]);

  useEffect(() => {
    const loadPosts = async () => {
      const response = await api.get(
        `api/categories/${route.params?.id}?fields=name&populate=posts,posts.cover`
      );

      console.log("abcd response", response.data?.data);
      setPosts(response.data?.data?.attributes?.posts?.data);
    };
    loadPosts();
  }, []);
  return (
    <View style={styles.container}>
      {posts.length === 0 && (
        <View style={styles.alertContainer}>
          <Text style={styles.textAlert}>
            Essa categoria ainda não possui nenhum post.
          </Text>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.textButton}>Encontrar posts</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        data={posts}
        renderItem={({ item }) => <PostItem data={item} />}
      />
    </View>
  );
};

export default CategoryPosts;
