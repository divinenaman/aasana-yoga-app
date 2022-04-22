import { TouchableOpacity, View } from "react-native";
import Typography from "./Typography";

import { useTailwind } from "tailwind-rn";

export default function Button({
  onPress,
  text,
  variant = "primary",
  radius = "sm",
  icon = null,
  style = {},
  disabled = false,
}) {
  const tailwind = useTailwind();
  const componentStyle = {
    primary: {
      view:
        "bg-[#B58DD4] flex-1 items-center " +
        (radius === "sm" ? "rounded-lg " : "rounded-full ") +
        "p-3 ",
    },
    secondry: {
      view:
        "bg-[#fff] flex-1 items-center " +
        (radius === "sm" ? "rounded-lg " : "rounded-full ") +
        "p-3 ",
    },
  };

  return (
    <TouchableOpacity
      onPress={disabled ? null : onPress}
      activeOpacity={disabled ? 1 : 0.8}
      style={[{ width: "100%", height: 52 }, style]}
    >
      <View
        style={[
          tailwind(componentStyle[variant].view),
          disabled ? { backgroundColor: "grey", opacity: 0.6 } : {},
        ]}
      >
        {text && (
          <Typography
            color={variant === "primary" ? "#fff" : "#B58DD4"}
            variant={"md"}
          >
            {text}
          </Typography>
        )}
        {icon}
      </View>
    </TouchableOpacity>
  );
}
