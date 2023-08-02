import { Text } from "@/components/ui/Text";
import { SignInContainer } from "./styles";
import { Input } from "@/components/ui/Input";

export function SignIn() {
	return (
		<SignInContainer>
			<Text size="LG" color="GRAY_700" align="center" fontFamily="primary" weight="bold">
				Bem-vindo(a)!
			</Text>
			<Input />
		</SignInContainer>
	);
}
