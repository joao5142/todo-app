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

import { Controller, useForm } from "react-hook-form";

import { createUserSchema } from "@/schema/createUserSchema";

import { yupResolver } from "@hookform/resolvers/yup";
import Toast from "react-native-toast-message";
import api from "@/lib/axios";

type FormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export function SignUp() {
  const navigation = useNavigation();
  const login = useStore((state) => state.login);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(createUserSchema),
  });

  function handleGoBack() {
    // navigation.navigate("signIn");
  }

  async function handleSignUp(data: FormData) {
    // login();
    console.log(data);

    try {
      const response = await api.post("/user/save", { data });

      Toast.show({
        type: "success",
        text1: "Usúario adicionado com sucesso",
      });
    } catch (err) {
      console.log(err.response);
      Toast.show({
        type: "error",
        text1: err?.response?.errors || "Error ao adicionar um usúario.",
      });
    }
  }

  console.log(errors);

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
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange } }) => (
            <Input
              invalid={Boolean(errors?.name?.message)}
              placeholder="Nome"
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange } }) => (
            <Input
              invalid={Boolean(errors?.email?.message)}
              placeholder="E-mail"
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

        <Controller
          control={control}
          name="password_confirmation"
          render={({ field: { onChange } }) => (
            <Input
              invalid={Boolean(errors?.password_confirmation?.message)}
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={onChange}
            />
          )}
        />

        <Box marginTop={70}>
          <Button background="GREEN_300" onPress={handleSubmit(handleSignUp)}>
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
