import styled, { css } from "styled-components/native";

export const TextInputContainer = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.COLORS["GRAY_500"],
}))`
  padding: 15px;
  margin-bottom: 16px;

  border-radius: 30px;
  border-width: 1px;
  border-color: ${(props) => props.theme.COLORS["GRAY_400"]};

  ${(props) =>
    props.invalid &&
    css`
      border-color: ${(props) => props.theme.COLORS["RED_300"]};
    `}
`;
