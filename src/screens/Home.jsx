import { StyleSheet, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function Home() {
  const tailwind = useTailwind();

  return <Text style={tailwind("text-blue-600")}>Hello</Text>;
}
