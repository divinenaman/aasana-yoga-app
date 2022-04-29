import { View, FlatList, Modal, ActivityIndicator } from "react-native";
import { Typography, Card, Button, TextInput } from "../../components";
import HeroImage from "../../assets/login/hero";
import { useState, useEffect } from "react";
import axios from "axios";

function CatalogueItemModal({ visible, handleClose, data }) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <View style={{ flex: 1, padding: 30 }}>
        <Typography>{data?.name}</Typography>
        <View style={{ width: "100%", flex: 1 }}>
          <HeroImage />
        </View>
        <Typography>{data?.desc}</Typography>
      </View>
    </Modal>
  );
}

export default function Catalogue({}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const baseUrl =
        "https://9680-106-208-131-157.in.ngrok.io";
      let res = await axios.get(`${baseUrl}/pose`);
      setLoading(false);
      setData(res.data.msg);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (modalData) {
      setModalVisible(true);
    }
  }, [modalData]);

  return (
    <View style={{ width: "100%" }}>
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      <FlatList
        data={data}
        numColumns={1}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={{ padding: 5, flex: 1 }}>
              <Card
                style={{ height: 200 }}
                onPress={() => setModalData({ ...item })}
              >
                <View style={{ flex: 1, width: "100%" }}>
                  <HeroImage />
                </View>
                <Typography>{item.name}</Typography>
              </Card>
            </View>
          );
        }}
      />
      <CatalogueItemModal
        visible={modalVisible}
        handleClose={() => setModalVisible(false)}
        data={modalData}
      />
    </View>
  );
}
