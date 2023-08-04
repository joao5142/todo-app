import * as yup from "yup";

export const createUserSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup
    .string()
    .required("Informe o e-mail.")
    .email("Informe um  e-mail válido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
  password_confirmation: yup
    .string()
    .required("Informe a confirmação da senha.")
    .oneOf([yup.ref("password")], "A confirmação de senha não confere."),
});
