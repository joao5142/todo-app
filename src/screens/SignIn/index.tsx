import { Text } from "@components/ui/Text";
import {
  FormContainer,
  NoAccountContainer,
  PasswordForgot,
  SignInContainer,
} from "./styles";
import { Input } from "@components/ui/Input";
import { Button } from "@components/ui/Button";
import { Box } from "@components/wrappers/Box";

import { TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { loginUserSchema } from "@/schema/loginUserSchema";

import Toast from "react-native-toast-message";

import { AxiosError } from "axios";
import api from "@/lib/api";

import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStore } from "@/store";
import { TOKEN_COLLECTION } from "@/storage";

type FormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const login = useStore((state) => state.login);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginUserSchema),
  });

  const navigation = useNavigation();

  function handleSignUp() {
    navigation.navigate("signUp");
  }

  async function handleLogin(formData: FormData) {
    try {
      const {
        data: { message, token, errors },
      } = await api.post("/login", formData);

      await AsyncStorage.setItem(TOKEN_COLLECTION, token);
      login();
      Toast.show({
        type: "success",
        text1: message,
      });
    } catch (err) {
      const error = err as AxiosError;

      Toast.show({
        type: "error",
        text1: error.message || "Error ao Logar.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SignInContainer>
      <Text
        size="LG"
        color="GRAY_700"
        align="center"
        fontFamily="primary"
        weight="bold"
      >
        Bem-vindo(a)!
      </Text>
      <FormContainer>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange } }) => (
            <Input
              invalid={Boolean(errors?.email?.message)}
              placeholder="Email"
              inputMode="email"
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange } }) => (
            <Input
              invalid={Boolean(errors?.password?.message)}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={onChange}
            />
          )}
        />

        <PasswordForgot>
          <Text
            align="end"
            fontFamily="secondary"
            size="SM"
            color="GRAY_700"
            weight="medium"
          >
            Esqueceu sua senha?
          </Text>
        </PasswordForgot>

        <Box marginTop={70}>
          <Button background="GREEN_300" onPress={handleSubmit(handleLogin)}>
            {isLoading ? (
              <ActivityIndicator size={24} color="white" />
            ) : (
              <Text color="WHITE" fontFamily="secondary" weight="bold">
                Login
              </Text>
            )}
          </Button>
        </Box>
      </FormContainer>
      <NoAccountContainer>
        <Text
          align="center"
          size="SM"
          color="GRAY_700"
          fontFamily="primary"
          weight="bold"
        >
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
