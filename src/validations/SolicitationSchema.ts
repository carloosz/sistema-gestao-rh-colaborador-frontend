import { IFile } from '@/interfaces/File';
import * as yup from 'yup';

export type ISolicitationForm = yup.InferType<typeof SolicitationSchema>;

export const SolicitationSchema = yup.object({
  id: yup.string().optional(),
  documentId: yup.string().optional(),
  name: yup.string().optional(),
  solicitation_date: yup.string().optional(),
  type: yup.string().optional(),
  observation: yup.string().optional(),
  response_date: yup.string().optional(),
  response: yup.string().optional(),
  attachment: yup.mixed<FileList | IFile>().optional(),
});
