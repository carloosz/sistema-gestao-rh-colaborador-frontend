import { IUser } from '@/hooks/useAuth';
import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';

interface IRequest {
  onSuccess?: (data: IUser) => void;
  onError?: (error: any) => void;
}

export const useAcceptTerms = ({ onSuccess, onError }: IRequest) => {
  return useMutation({
    mutationKey: ['accept-terms'],
    mutationFn: async () => {
      const { data } = await api.post<IUser>('acceptTerms');
      return data;
    },
    onSuccess,
    onError,
  });
};
