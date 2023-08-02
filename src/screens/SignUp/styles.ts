import styled from "styled-components/native";

import { SafeAreaView } from "react-native-safe-area-context";

export const SignUpContainer = styled(SafeAreaView)`
	flex: 1;
	background-color: ${(props) => props.theme.COLORS.WHITE};
	padding: 24px;
	padding-top: 100px;
`;

export const FormContainer = styled.View`
	margin-top: 65px;
`;

export const NoAccountContainer = styled.View`
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-end;
	gap: 5px;
`;

export const PasswordForgot = styled.TouchableOpacity`
	max-width: 200px;
	align-self: flex-end;
`;
