import {
  ColorType,
  FontFamilyType,
  FontSizeType,
  FontWeightType,
  IColor,
  IFontFamily,
  IFontSize,
  IFontWeight,
} from "@theme/index";

import { TextContainer } from "./styles";
import { ReactNode } from "react";

import { TextProps as TextBaseProps } from "react-native";

export type AlignType = "center" | "start" | "end";

interface TextProps
  extends IColor,
    IFontSize,
    IFontFamily,
    IFontWeight,
    TextBaseProps {
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
  ...rest
}: TextProps) {
  return (
    <TextContainer
      align={align}
      color={color}
      size={size}
      fontFamily={fontFamily}
      weight={weight}
      {...rest}
    >
      {children}
    </TextContainer>
  );
}
