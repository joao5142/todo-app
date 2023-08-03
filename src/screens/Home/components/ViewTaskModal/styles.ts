import styled from "styled-components/native";

export const ViewTaskModalContainer = styled.View`
  position: absolute;

  width: "100%";
  height: "100%";

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;

  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.7);
`;

export const ViewTaskModalContent = styled.View`
  background-color: ${(props) => props.theme.COLORS.WHITE};

  padding: 40px 16px;

  width: 90%;

  border-radius: 24px;
`;
