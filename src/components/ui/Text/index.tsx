import { ColorType, FontFamilyType, FontSizeType, FontWeightType } from "@theme/index";

import { TextContainer } from "./styles";
import { ReactNode } from "react";

export type AlignType = "center" | "start";

interface TextProps extends ColorType, FontSizeType, FontFamilyType, FontWeightType {
	align?: AlignType;
	children: ReactNode;
}

export function Text({
	children,
	color = "GRAY_700",
	size = "MD",
	fontFamily = "primary",
	weight = "regular",
	align = "start",
}: TextProps) {
	return (
		<TextContainer align={align} color={color} size={size} fontFamily={fontFamily} weight={weight}>
			{children}
		</TextContainer>
	);
}
