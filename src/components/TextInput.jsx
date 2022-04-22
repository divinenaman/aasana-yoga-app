import { View, TextInput as _TextInput } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function TextInput({
  variant = "primary",
  radius = "sm",
  icon = null,
  value = "",
  placeholder = "",
  onChange,
  style = {},
}) {
  const tailwind = useTailwind();
  const componentStyle = {
    primary: {
      view:
        "bg-[#fff] flex-row items-center w-full h-[52px] " +
        (radius === "sm" ? "rounded-lg " : "rounded-full ") +
        "p-3 border-2 border-gray-100",
      input: "flex-1 text-black",
    },
    secondry: {
      view:
        "bg-[#fff] flex-row items-center w-full h-[52px] " +
        (radius === "sm" ? "rounded-lg " : "rounded-full ") +
        "p-3 ",
      input: "flex-1 text-black",
    },
  };

  return (
    <View style={[tailwind(componentStyle[variant].view), style]}>
      {icon}
      <_TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        style={tailwind(componentStyle[variant].input)}
      />
    </View>
  );
}
