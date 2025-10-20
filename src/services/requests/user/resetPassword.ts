import api from '@/services/api';
import { IResetForm } from '@/validations/LoginSchema';
import { useMutation } from '@tanstack/react-query';

interface IRequest {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useResetPassword = ({ onSuccess, onError }: IRequest) => {
  return useMutation({
    mutationKey: ['reset-password'],
    mutationFn: async (form: IResetForm) => {
      await api.post('resetPassword', {
        code: form?.code,
        password: form?.new_password,
        passwordConfirmation: form?.confirm_password,
      });
    },
    onSuccess,
    onError,
  });
};
