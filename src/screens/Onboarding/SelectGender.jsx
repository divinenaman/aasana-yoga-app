import { View } from "react-native";
import { Typography, Button, TextInput, Card } from "../../components";
import HeroImage from "../../assets/login/hero";
import { useState } from "react";

export default function SelectGender({}) {
  const [gender, setGender] = useState("male");

  return (
    <View style={{ width: "100%", padding: 30, paddingTop: 40 }}>
      <Typography variant="lg">Aasana</Typography>
      <View style={{ width: "100%", height: "50%", marginBottom: 10 }}>
        <HeroImage />
      </View>
      <Card
        selected={gender === "male"}
        onPress={() => setGender("male")}
        style={{ marginBottom: 20 }}
      >
        <Typography>{"Male"}</Typography>
      </Card>

      <Card
        selected={gender === "female"}
        onPress={() => setGender("female")}
        style={{ marginBottom: 20 }}
      >
        <Typography>{"Female"}</Typography>
      </Card>

      <Card
        selected={gender === "other"}
        onPress={() => setGender("other")}
        style={{ marginBottom: 40 }}
      >
        <Typography>{"Other"}</Typography>
      </Card>

      <Button text={"Next"} disabled={true} />
    </View>
  );
}
