import { IInfo } from '@/hooks/useAuth';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export const useListMyInformations = (enabled?: boolean) => {
  return useQuery({
    queryKey: ['list-my-informations'],
    queryFn: async () => {
      const { data } = await api.get<IInfo>('listMyInformations');
      return data;
    },
    enabled,
  });
};
