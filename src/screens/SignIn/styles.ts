import styled from "styled-components/native";

import { SafeAreaView } from "react-native-safe-area-context";

export const SignInContainer = styled(SafeAreaView)`
	flex: 1;
	background-color: ${(props) => props.theme.white};
`;
