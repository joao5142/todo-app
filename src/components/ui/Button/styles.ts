import styled, { css } from "styled-components/native";
import { ButtonProps } from "./index";

export const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
  ${({ theme, background }) => css`
    padding: 15px 20px;

    background-color: ${theme.COLORS[background]};

    border-radius: 30px;

    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
  `};

  ${({ wFull }) =>
    wFull &&
    css`
      width: "100%";
      flex: 1;
    `}
`;
