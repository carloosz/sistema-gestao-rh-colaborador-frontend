import * as yup from 'yup';

export type ITermsForm = yup.InferType<typeof TermsSchema>;

export const TermsSchema = yup.object({
  terms_of_use: yup.string().optional(),
  privacy_policies: yup.string().optional(),
  accept_terms: yup.bool().oneOf([true]).required('Campo obrigatório'),
});
