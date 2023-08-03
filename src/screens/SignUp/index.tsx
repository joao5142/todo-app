import { Text } from "@components/ui/Text";
import {
  FormContainer,
  NoAccountContainer,
  PasswordForgot,
  SignUpContainer,
} from "./styles";
import { Input } from "@components/ui/Input";
import { Button } from "@components/ui/Button";
import { Box } from "@components/wrappers/Box";

import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "@/store";

export function SignUp() {
  const navigation = useNavigation();
  const updateUserLogged = useStore((state) => state.updateUserLogged);

  function handleGoBack() {
    navigation.navigate("signIn");
  }

  function handleSignUp() {
    updateUserLogged(true);
  }

  return (
    <SignUpContainer>
      <Text
        size="LG"
        color="GRAY_700"
        align="center"
        fontFamily="primary"
        weight="bold"
      >
        Cadastre sua conta.
      </Text>
      <FormContainer>
        <Input placeholder="Nome" />
        <Input placeholder="E-mail" inputMode="email" />
        <Input placeholder="Password" secureTextEntry={true} />
        <Input placeholder="Password" secureTextEntry={true} />

        <Box marginTop={70}>
          <Button background="GREEN_300" onPress={handleSignUp}>
            <Text color="WHITE" fontFamily="secondary" weight="bold">
              Sign Up
            </Text>
          </Button>
        </Box>
      </FormContainer>
      <NoAccountContainer>
        <TouchableOpacity onPress={handleGoBack}>
          <Text color="GREEN_300" size="SM" fontFamily="primary" weight="bold">
            Voltar para login
          </Text>
        </TouchableOpacity>
      </NoAccountContainer>
    </SignUpContainer>
  );
}
