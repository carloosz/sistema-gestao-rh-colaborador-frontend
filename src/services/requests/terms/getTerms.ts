import { ITerms } from '@/interfaces/Terms';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export const useTerms = () => {
  return useQuery({
    queryKey: ['terms'],
    queryFn: async () => {
      const { data } = await api.get<ITerms>('terms');
      return data;
    },
  });
};
