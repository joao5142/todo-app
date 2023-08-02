import { TextInputProps } from "react-native";
import { TextInputContainer } from "./styles";

interface InputProps extends TextInputProps {}

export function Input({ ...rest }: InputProps) {
	return <TextInputContainer {...rest} />;
}
