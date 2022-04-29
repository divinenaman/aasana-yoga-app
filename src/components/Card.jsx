import { View, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function Card({
  variant = "primary",
  selected = false,
  radius = "sm",
  onPress,
  children,
  style = {},
}) {
  const tailwind = useTailwind();
  let commonStyle =
    "p-3 flex-1 items-center border-2 " +
    (radius === "sm" ? "rounded-lg " : "rounded-full ");

  const componentStyle = {
    primary: "bg-[#fff] " + (selected ? "border-[#B58DD4]" : "border-gray-100"),
    secondry:
      "bg-[#B58DD4] " + (selected ? "border-[#fff]" : "border-gray-100"),
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{ width: "100%", height: 52, ...style }}
    >
      <View style={[tailwind(commonStyle + componentStyle[variant])]}>
        {children}
      </View>
    </TouchableOpacity>
  );
}
