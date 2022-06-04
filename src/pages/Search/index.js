import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import { styles } from "./styles.js";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import PostItem from "../../components/PostItem";

const Search = () => {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [empty, setEmpty] = useState(false);

  const handleSearchPost = async () => {
    if (input.trim().length === 0) {
      alert("Opss! Parece que você não digitou nada no campo");
      return;
    }

    const response = await api.get(
      `api/posts?filters[title][$contains]=${input}&populate=cover`
    );

    if (response.data?.data.length === 0) {
      setEmpty(true);
      setPosts([]);
      return;
    }

    setPosts(response.data?.data);
    setEmpty(false);
    setInput("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          placeholder="O que está buscando?"
          style={styles.input}
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearchPost}
        >
          <Feather name="search" size={25} color="#000" />
        </TouchableOpacity>
      </View>
      {empty && <Text>Nenhum post encontrado</Text>}
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <PostItem data={item} />}
      />
    </View>
  );
};

export default Search;
