import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import CategoryItem from "../../components/CategoryItem";
import { getFavorite, setFavorite } from "../../services/favorite";
import FavoritePost from "../../components/FavoritePost";
import PostItem from "../../components/PostItem";
import * as Animatable from "react-native-animatable";

const FlatListAnimated = Animatable.createAnimatableComponent(FlatList);

const Home = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [favCategory, setFavCategory] = useState([]);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState(null);

  const handleNavigateSearch = () => {
    navigation.navigate("Search");
  };

  const handleFavorite = async (id) => {
    const response = await setFavorite(id);
    if (id) {
      setFavCategory(response);
    } else {
      setFavCategory(null);
    }
    setSelected(id);
  };

  const getListPosts = async () => {
    setLoading(!!loading);
    const response = await api.get(
      "/api/posts?populate=cover&sort=createdAt:desc"
    );
    setPosts(response.data.data);
    setLoading(!!loading);
  };

  useEffect(() => {
    async function loadData() {
      await getListPosts();

      const category = await api.get("/api/categories?populate=icon");
      setCategories(category.data.data);
    }

    loadData();
  }, []);

  useEffect(() => {
    const favorite = async () => {
      const response = await getFavorite();

      setFavCategory(response);
    };

    favorite();
  }, []);

  console.log("abcd favCategory", favCategory.length !== 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Animatable.Text animation="fadeInLeft" style={styles.name}>
          DevBlog
        </Animatable.Text>
        <TouchableOpacity onPress={handleNavigateSearch}>
          <Feather name="search" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      <FlatListAnimated
        delay={500}
        animation="flipInX"
        showsHorizontalScrollIndicator={false}
        data={categories}
        contentContainerStyle={{ paddingRight: 12 }}
        horizontal
        style={styles.categories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <CategoryItem
            selected={selected}
            data={item}
            favorite={() => handleFavorite(item.id)}
          />
        )}
      />

      <View style={styles.main}>
        {favCategory.length !== 0 && (
          <FlatList
            style={{ marginTop: 50, maxHeight: 100, paddingStart: 18 }}
            data={favCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingEnd: 18 }}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <FavoritePost data={item} />}
          />
        )}

        <Text
          style={[
            styles.title,
            { marginTop: favCategory.length > 0 ? 14 : 46 },
          ]}
        >
          Conteúdos em alta
        </Text>

        <FlatList
          style={{ flex: 1, paddingHorizontal: 18 }}
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostItem data={item} />}
          refreshing={loading}
          onRefresh={() => {
            getListPosts();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
