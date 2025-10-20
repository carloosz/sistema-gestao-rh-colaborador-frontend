import api from '@/services/api';
import { IRecoveryForm } from '@/validations/LoginSchema';
import { useMutation } from '@tanstack/react-query';

interface IRequest {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useForgotPassword = ({ onSuccess, onError }: IRequest) => {
  return useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: async (form: IRecoveryForm) => {
      await api.post('forgotPassword', {
        email: form?.email,
      });
    },
    onSuccess,
    onError,
  });
};
