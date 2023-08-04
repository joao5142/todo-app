import { TextInputProps, View } from "react-native";
import { TextInputContainer } from "./styles";
import { Text } from "../Text";

interface InputProps extends TextInputProps {
  invalid?: boolean;
}

export function Input({
  invalid = false,

  ...rest
}: InputProps) {
  return (
    <View>
      <TextInputContainer invalid={invalid} {...rest} />
    </View>
  );
}
