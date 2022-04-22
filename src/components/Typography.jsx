import { Text } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function Typography({
  variant = "sm",
  color,
  size,
  children,
  style = {},
}) {
  const tailwind = useTailwind();
  const componentStyle = {
    sm: "text-black text-sm",
    md: "text-black text-base",
    lg: "text-black text-lg",
  };

  let customs = color ? { color } : {};
  customs = size ? { ...customs, size } : customs;

  return (
    <Text style={[tailwind(componentStyle[variant]), style, customs]}>
      {children}
    </Text>
  );
}
