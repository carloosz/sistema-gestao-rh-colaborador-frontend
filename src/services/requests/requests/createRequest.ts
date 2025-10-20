import api from '@/services/api';
import { IRequestForm } from '@/validations/RequestSchema';
import { useMutation } from '@tanstack/react-query';

const createRequest = async (form: IRequestForm) => {
  const file = form?.file?.item(0);
  await api.postForm(`requests`, {
    data: JSON.stringify({
      type: form?.type?.value,
      observation: form?.observation,
    }),
    file: file !== null ? file : undefined,
  });
};

interface IRequest {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useCreateRequest = ({ onSuccess, onError }: IRequest) => {
  return useMutation({
    mutationKey: ['create-request'],
    mutationFn: createRequest,
    onSuccess,
    onError,
  });
};
