import { View } from "react-native";
import { Typography, Button, TextInput } from "../components";
import HeroImage from "../assets/login/hero";

export default function Login({}) {
  return (
    <View style={{ width: "100%", padding: 30 }}>
      <Typography variant="lg">Aasana</Typography>
      <View style={{ width: "100%", height: "50%", marginBottom: 40 }}>
        <HeroImage />
      </View>
      <TextInput placeholder="Phone" style={{ marginBottom: 20 }} />
      <TextInput placeholder="OTP" style={{ marginBottom: 20 }} />
      <Button text={"Login"} disabled={true} />
    </View>
  );
}
