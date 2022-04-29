import { View, FlatList, ActivityIndicator } from "react-native";
import { Typography, Card, Button, TextInput } from "../../components";
import HeroImage from "../../assets/login/hero";
import { useState, useEffect } from "react";
import axios from "axios";
import Camera from "./Camera";

export default function PoseML({}) {
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
    if (modalData) {
      setModalVisible(true);
    }
  }, [modalData]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Typography>{"Pose AI"}</Typography>
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
      <Camera
        visible={modalVisible}
        data={modalData}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
