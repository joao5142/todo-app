import { Text } from "@components/ui/Text";
import { FormContainer, NoAccountContainer, PasswordForgot, SignInContainer } from "./styles";
import { Input } from "@components/ui/Input";
import { Button } from "@components/ui/Button";
import { Box } from "@components/wrappers/Box";

import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function SignIn() {
	const navigation = useNavigation();

	function handleSignUp() {
		navigation.navigate("signUp");
	}

	return (
		<SignInContainer>
			<Text size="LG" color="GRAY_700" align="center" fontFamily="primary" weight="bold">
				Bem-vindo(a)!
			</Text>
			<FormContainer>
				<Input placeholder="Email" inputMode="email" />
				<Input placeholder="Password" secureTextEntry={true} />

				<PasswordForgot>
					<Text align="end" fontFamily="secondary" size="SM" color="GRAY_700" weight="medium">
						Esqueceu sua senha?
					</Text>
				</PasswordForgot>

				<Box marginTop={70}>
					<Button background="GREEN_300">
						<Text color="WHITE" fontFamily="secondary" weight="bold">
							Login
						</Text>
					</Button>
				</Box>
			</FormContainer>
			<NoAccountContainer>
				<Text align="center" size="SM" color="GRAY_700" fontFamily="primary" weight="bold">
					Não tem uma conta?
				</Text>
				<TouchableOpacity onPress={handleSignUp}>
					<Text color="GREEN_300" size="SM" fontFamily="primary" weight="bold">
						Cadastre-se
					</Text>
				</TouchableOpacity>
			</NoAccountContainer>
		</SignInContainer>
	);
}
