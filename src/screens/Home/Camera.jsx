import React, { useEffect, useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import {
  View,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Button, Typography, TextInput, Card } from "../../components";

function CameraModal({ show, onClose, setCapturedPicture }) {
  const camera = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  const clickPicture = async () => {
    if (camera.current) {
      let photo = await camera.current.takePictureAsync();
      setCapturedPicture(photo);
    }
  };

  const switchCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const toggleFlash = () => {
    setFlash(
      flash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };
  return (
    <Modal visible={show} onRequestClose={onClose}>
      <Camera
        style={{ flex: 1 }}
        ratio="16:9"
        flashMode={flash}
        type={type}
        ref={(ref) => {
          camera.current = ref;
        }}
      >
        <View style={styles.camera_layout}>
          <View style={{ alignSelf: "flex-end" }}>
            <Pressable onPress={toggleFlash}>
              <Ionicons
                name={`ios-flash-${
                  flash === Camera.Constants.FlashMode.off ? "off-" : ""
                }outline`}
                size={30}
                color="white"
              />
            </Pressable>
          </View>
          <View style={styles.camera_action_buttons}>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={30} color="white" />
            </Pressable>

            <Pressable onPress={clickPicture}>
              <View style={styles.camera_shutter} />
            </Pressable>

            <Pressable onPress={switchCameraType}>
              <Ionicons name="camera-reverse-outline" size={30} color="white" />
            </Pressable>
          </View>
        </View>
      </Camera>
    </Modal>
  );
}

export default function CameraComponent({ visible, data, onClose }) {
  const [startCamera, setStartCamera] = React.useState(false);
  const [capturedPicture, setCapturedPicture] = useState(null);
  const [mlData, setMlData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (capturedPicture?.uri) {
      setStartCamera(false);
    }
  }, [capturedPicture]);

  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log(status);

    if (status === "granted") {
      // start the camera
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  const sendImage = async () => {
    try {
      setLoading(true);
      let res = await ImageManipulator.manipulateAsync(
        capturedPicture.uri,
        [],
        {
          base64: true,
        }
      );

      res = "data:image/jpg;base64," + res.base64;

      const baseUrl =
        "https://9680-106-208-131-157.in.ngrok.io";
      res = await axios.post(`${baseUrl}/pose/compare`, {
        pose_id: data.id,
        img: res,
      });
      setLoading(false);
      setMlData(res.data);
    } catch (e) {
      console.log(e);
      onClose();
    }
  };

  const handleClose = () => {
    setStartCamera(false);
    setCapturedPicture(null);
    onClose();
  };

  return (
    <Modal visible={visible} onRequestClose={handleClose}>
      <View style={styles.container}>
        <View style={styles.camera_container}>
          <CameraModal
            show={startCamera}
            onClose={handleClose}
            setCapturedPicture={setCapturedPicture}
          />
          {capturedPicture?.uri ? (
            <>
              <Image
                source={{ uri: capturedPicture.uri }}
                style={{
                  flex: 1,
                  marginBottom: "4%",
                  width: "100%",
                  maxHeight: "50%",
                }}
              />
              <Button
                text={"Send"}
                onPress={() => sendImage()}
                icon={
                  loading ? (
                    <ActivityIndicator size="small" color="#0000ff" />
                  ) : null
                }
                disabled={loading}
              />
              <ScrollView>
                {mlData ? (
                  mlData.msg.constructor.name == "String" ? (
                    <Typography>{mlData.msg}</Typography>
                  ) : mlData.msg.constructor.name == "Array" ? (
                    mlData.msg.map((x, i) => {
                      return (
                        <Card
                          key={i}
                          style={{
                            height: 100,
                          }}
                        >
                          <Typography>{`Angle Between: ${x.angle_between}`}</Typography>
                          <Typography>{`Angle: ${x.angle}`}</Typography>
                          <Typography>{`Angle Correct: ${x.is_angle_correct}`}</Typography>
                        </Card>
                      );
                    })
                  ) : null
                ) : null}
              </ScrollView>
            </>
          ) : (
            <Button
              text={"Capture"}
              icon={<Ionicons name="camera-outline" size={24} color="white" />}
              onPress={() => openCamera()}
              style={{ height: 64 }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  instructions: {
    flex: 0.4,
  },

  bullet_point: {
    width: 8,
    height: 8,
    backgroundColor: "#00648A",
    marginRight: 10,
    borderRadius: 100,
  },

  instructions_points: {
    alignItems: "center",
    flexDirection: "row",
  },

  camera_container: {
    //backgroundColor: "blue",
    flex: 1,
    paddingHorizontal: "4%",
    justifyContent: "center",
    alignItems: "center",
  },

  camera_button: {
    flexDirection: "row",
    alignItems: "center",
  },

  camera_layout: {
    padding: 30,
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },

  camera_action_buttons: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },

  camera_shutter: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: "red",
    borderColor: "white",
    borderWidth: 5,
    marginHorizontal: 60,
  },
});
