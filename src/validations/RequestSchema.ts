import { IOption } from '@/interfaces/OptionType';
import * as yup from 'yup';

export type IRequestForm = yup.InferType<typeof RequestSchema>;

export const RequestSchema = yup.object({
  type: yup.mixed<IOption>().required('Campo obrigatório'),
  observation: yup.string().required('Campo obrigatório'),
  file: yup.mixed<FileList>().optional(),
});
