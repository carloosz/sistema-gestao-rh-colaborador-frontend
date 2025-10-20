import api from '@/services/api';
import { ICollaboratorForm } from '@/validations/CollaboratorSchema';
import { ITermsForm } from '@/validations/TermsSchema';
import { useMutation } from '@tanstack/react-query';

const updateMyInformation = async (form: ICollaboratorForm) => {
  await api.put(`editMyInformations`, {
    name: form?.name,
    cpf: form?.cpf,
    phone: form?.phone,
    email: form?.email,
    dateOfBirth: form?.birthdate?.split('/')?.reverse()?.join('-'),
    gender: form?.gender?.value,
    zipCode: form?.cep,
    address: form?.street,
    state: form?.state,
    city: form?.city,
    neighborhood: form?.neighborhood,
    number: form?.number,
  });
};

interface IRequest {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useUpdateMyInformation = ({ onSuccess, onError }: IRequest) => {
  return useMutation({
    mutationKey: ['update-my-information'],
    mutationFn: updateMyInformation,
    onSuccess,
    onError,
  });
};
