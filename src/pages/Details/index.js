import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
  Modal,
} from "react-native";
import { styles } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../services/api";
import { urlApi } from "../../utils";
import { Feather, Entypo } from "@expo/vector-icons";
import LinkWeb from "../../components/LinkWeb";

const Details = () => {
  const navivation = useNavigation();
  const route = useRoute();

  const [post, setPost] = useState({});
  const [links, setLinks] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [openLink, setOpenLink] = useState({});

  const handleOpenLink = (link) => {
    setModalVisible(!modalVisible);
    setOpenLink(link);
  };

  useEffect(() => {
    const getPost = async () => {
      const response = await api.get(
        `/api/posts/${route.params?.id}?populate=cover,category,options`
      );
      setPost(response.data.data);
      setLinks(response.data?.data?.attributes?.options);
    };
    getPost();
  }, []);

  useLayoutEffect(() => {
    navivation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleShare}>
          <Entypo name="share" size={25} color="#FFF" />
        </TouchableOpacity>
      ),
    });
  }, [navivation, post]);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `
        Confere esse post: ${post?.attributes?.title}

        ${post?.attributes?.description}

        Vi lá no app DevPost!
        `,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("ACTIVITY TYPE");
        } else {
          console.log("COMPARTILHADO COM SUCESSO");
        }
      } else if (result.aciton === Share.dismissedAction) {
        console.log("MODAL FECHADO");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.cover}
        source={{
          uri: `${urlApi}${post?.attributes?.cover?.data?.attributes?.url}`,
        }}
      />
      <Text style={styles.title}>{post?.attributes?.title}</Text>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>{post?.attributes?.description}</Text>
        {links.length > 0 && <Text style={styles.subTitle}>Links</Text>}

        {links?.map((link) => (
          <TouchableOpacity
            key={link.id}
            style={styles.linkButton}
            onPress={() => handleOpenLink(link)}
          >
            <Feather name="link" color="#1E4687" size={14} />
            <Text style={styles.linkText}>{link.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal animationType="slide" visible={modalVisible} transparent>
        <LinkWeb
          link={openLink.url}
          title={openLink.name}
          closeModal={() => setModalVisible(!modalVisible)}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default Details;
