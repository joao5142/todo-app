import { TouchableOpacityProps } from "react-native";

import { ButtonContainer } from "./styles";

import { ColorType } from "@/theme";
import { ReactNode } from "react";

export interface ButtonProps extends TouchableOpacityProps {
	background: ColorType;
	children: ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
	return <ButtonContainer {...rest}>{children}</ButtonContainer>;
}
