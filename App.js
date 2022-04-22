import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

import { Button } from "./src/components";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <View style={styles.container}>
        <Login />
      </View>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
