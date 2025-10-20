import * as yup from 'yup';

export type ILoginForm = yup.InferType<typeof LoginSchema>;

export const LoginSchema = yup.object({
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .email('Insira um e-mail válido'),
  password: yup.string().required('Senha é obrigatória'),
  remember_me: yup.bool(),
});

export type IRecoveryForm = yup.InferType<typeof RecoverySchema>;

export const RecoverySchema = yup.object({
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .email('Insira um e-mail válido'),
});

export type IChangeForm = yup.InferType<typeof ChangeSchema>;

export const ChangeSchema = yup.object({
  current_password: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'Mínimo de 8 digitos'),
  new_password: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'Mínimo de 8 digitos'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('new_password')], 'As senhas devem coincidir')
    .required('Confirmação de senha é obrigatória')
    .min(8, 'Mínimo de 8 digitos'),
});

export type IResetForm = yup.InferType<typeof ResetSchema>;

export const ResetSchema = yup.object({
  code: yup.string().required('Código é obrigatório'),
  new_password: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'Mínimo de 8 digitos'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('new_password')], 'As senhas devem coincidir')
    .required('Confirmação de senha é obrigatória')
    .min(8, 'Mínimo de 8 digitos'),
});
