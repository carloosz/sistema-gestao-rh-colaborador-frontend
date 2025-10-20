import api from '@/services/api';
import { IChangeForm } from '@/validations/LoginSchema';
import { useMutation } from '@tanstack/react-query';

interface IRequest {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useChangePassword = ({ onSuccess, onError }: IRequest) => {
  return useMutation({
    mutationKey: ['change-password'],
    mutationFn: async (form: IChangeForm) => {
      await api.post('changePassword', {
        currentPassword: form?.current_password,
        password: form?.new_password,
        passwordConfirmation: form?.confirm_password,
      });
    },
    onSuccess,
    onError,
  });
};
