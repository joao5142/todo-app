import { ColorType, FontFamilyType, FontSizeType, FontWeightType } from "@theme/index";
import styled, { css } from "styled-components/native";
import { AlignType } from "./";

interface TextContainerAlignProp {
	align: AlignType;
}
interface TextContainerProps extends ColorType, FontSizeType, FontFamilyType, TextContainerAlignProp, FontWeightType {}

export const TextContainer = styled.Text<TextContainerProps>`
	${({ size, color, fontFamily, theme, weight }) => css`
		color: ${theme.COLORS[color!]};
		font-size: ${theme.FONT_SIZE[size!]}px;
		font-family: ${theme.FONT_FAMILY[fontFamily!][weight]};
	`};

	${({ align }) =>
		align == "center" &&
		css`
			text-align: center;
		`}

	${({ align }) =>
		align == "end" &&
		css`
			text-align: right;
		`}
`;
