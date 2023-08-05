import styled from "styled-components/native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/Text";

export const HomeContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.COLORS.WHITE};
`;
export const Container = styled.View`
  padding: 24px;
`;
export const FilterButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 16px;

  margin-top: 16px;
`;
export const LineSeparator = styled.View`
  height: 10px;
  margin: 16px 0px;
  margin-bottom: 0px;
  background: ${(props) => props.theme.COLORS["GRAY_100"]};
`;

export const TaskContainer = styled(Container)`
  border: 1px solid ${(props) => props.theme.COLORS["GRAY_100"]};

  padding-top: 18px;
  padding-bottom: 18px;

  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const DescriptionText = styled(Text)`
  flex: 1;
  flex-wrap: wrap;
`;

export const DotsViewContainer = styled.View`
  margin-left: auto;
`;

export const TitleContainer = styled(Container)`
  padding-top: 16px;
  padding-bottom: 13px;
`;

export const FooterContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const Navigation = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  max-width: 100%;

  background-color: ${(props) => props.theme.COLORS.WHITE};

  border-top-color: #1fcc7920;
  border-top-width: 3px;
`;
export const NavigationItem = styled.TouchableOpacity`
  align-items: center;
  gap: 7px;
`;

export const NavigationButton = styled.View`
  height: 58px;
  width: 58px;

  border-radius: 100px;

  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.COLORS["GREEN_300"]};

  margin-top: -34px;
`;
