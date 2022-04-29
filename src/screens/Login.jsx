import { View } from "react-native";
import { Typography, Button, TextInput } from "../components";
import HeroImage from "../assets/login/hero";
import { useState } from "react";

export default function Login({}) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <View style={{ width: "100%", padding: 30, paddingTop: 40 }}>
      <Typography variant="lg">Aasana</Typography>
      <View style={{ width: "100%", height: "50%", marginBottom: 20 }}>
        <HeroImage />
      </View>
      <TextInput
        value={phone}
        onChange={setPhone}
        placeholder="phone"
        style={{ marginBottom: 20 }}
      />
      <TextInput
        value={otp}
        onChange={setOtp}
        placeholder="otp"
        style={{ marginBottom: 40 }}
      />
      <Button text={"Login"} disabled={true} />
    </View>
  );
}
