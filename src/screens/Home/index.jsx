import { StyleSheet, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Typography, Button } from "../../components";
import { useState } from "react";

import Catalogue from "./Catalogue";
import PoseML from "./PoseMl";

export default function Home() {
  const tailwind = useTailwind();
  const [selection, setSelection] = useState("catalogue");
  return (
    <View style={tailwind("flex-1 m-[40px]")}>
      <View style={tailwind("flex-row mt-2.5")}>
        <View style={{ width: "50%" }}>
          <Button
            onPress={() => setSelection("catalogue")}
            text="Catalogue"
            variant="secondry"
          />
        </View>
        <View style={tailwind("w-[50%] border-l-2 border-gray-100")}>
          <Button
            onPress={() => setSelection("poseAi")}
            text="Pose AI"
            variant="secondry"
          />
        </View>
      </View>
      <View style={tailwind("flex-1")}>
        {selection === "catalogue" && <Catalogue />}
        {selection === "poseAi" && <PoseML />}
      </View>
    </View>
  );
}
