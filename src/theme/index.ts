const theme = {
  COLORS: {
    WHITE: "#FFFFFF",

    GREEN_100: "#E5F0DB",
    GREEN_300: "#1FCC79",
    GREEN_600: "#39C4A5",

    RED_100: "#F4E6E7",
    RED_300: "#F3BABD",
    RED_600: "#FF6464",

    GRAY_700: "#2E3E5C",
    GRAY_600: "#3E5481",
    GRAY_500: "#9FA5C0",
    GRAY_400: "#D0DBEA",
    GRAY_300: "#DDDEDF",
    GRAY_200: "#EFF0F0",
    GRAY_100: "#F4F5F7",
  },
  FONT_FAMILY: {
    primary: {
      regular: "Roboto_400Regular",
      medium: "Roboto_500Medium",
      bold: "Roboto_700Bold",
    },
    secondary: {
      regular: "Inter_400Regular",
      medium: "Inter_500Medium",
      bold: "Inter_700Bold",
    },
  },
  FONT_SIZE: {
    XS: 12,
    SM: 15,
    MD: 17,
    LG: 22,
  },
};

export type ColorType = keyof typeof theme.COLORS;

export interface IColor {
  color?: ColorType;
}

export type FontSizeType = keyof typeof theme.FONT_SIZE;

export interface IFontSize {
  size?: FontSizeType;
}
export type FontWeightType = "regular" | "medium" | "bold";

export interface IFontWeight {
  weight?: FontWeightType;
}

export type FontFamilyType = keyof typeof theme.FONT_FAMILY;

export interface IFontFamily {
  fontFamily?: FontFamilyType;
}

export default theme;
