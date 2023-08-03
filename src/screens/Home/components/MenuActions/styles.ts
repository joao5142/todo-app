import styled from "styled-components/native";

import { Entypo } from "@expo/vector-icons";

export const DotsButtonContainer = styled.TouchableOpacity`
  margin-left: auto;
`;

export const DotsIcon = styled(Entypo).attrs(({ theme }) => ({
  size: 24,
  name: "dots-three-vertical",
  color: theme.COLORS["GRAY_500"],
}))``;

export const MenuItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
