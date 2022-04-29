import { View } from "react-native";
import { Typography, Button, TextInput } from "../../components";
import HeroImage from "../../assets/login/hero";
import { useState } from "react";

export default function GetName({}) {
  const [name, setName] = useState("");

  return (
    <View style={{ width: "100%", padding: 30, paddingTop: 40 }}>
      <Typography variant="lg">Aasana</Typography>
      <View style={{ width: "100%", height: "50%", marginBottom: 10 }}>
        <HeroImage />
      </View>
      <TextInput
        value={name}
        onChange={setName}
        placeholder="phone"
        style={{ marginBottom: 40 }}
      />
      <Button text={"Next"} disabled={true} />
    </View>
  );
}
