import { IOption } from '@/interfaces/OptionType';
import * as yup from 'yup';

export type ICollaboratorForm = yup.InferType<typeof CollaboratorSchema>;

export const CollaboratorSchema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  cpf: yup.string().required('Campo obrigatório'),
  phone: yup.string().required('Campo obrigatório'),
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .email('Insira um e-mail válido'),
  birthdate: yup
    .string()
    .test('date-validation', 'Data inválida', (value?: string) => {
      if (value) {
        const date = value?.split('/');
        const hasValidDay = Number(date[0]) > 0 && Number(date[0]) <= 31;
        const hasValidMonth = Number(date[1]) > 0 && Number(date[1]) <= 12;

        return hasValidDay && hasValidMonth;
      }
      return true;
    })
    .required('Campo obrigatório'),
  gender: yup.mixed<IOption>().required('Campo obrigatório'),
  cep: yup.string().required('Campo obrigatório'),
  street: yup.string().required('Campo obrigatório'),
  state: yup.string().required('Campo obrigatório'),
  city: yup.string().required('Campo obrigatório'),
  neighborhood: yup.string().required('Campo obrigatório'),
  number: yup.string().required('Campo obrigatório'),
});
