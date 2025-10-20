import { IRequest, IRequestList } from '@/interfaces/Request';
import api from '@/services/api';
import { ISolicitationForm } from '@/validations/SolicitationSchema';
import { useQuery } from '@tanstack/react-query';

export const useRequests = (params?: any, enabled?: boolean) => {
  return useQuery({
    queryKey: ['requests', params],
    queryFn: async () => {
      const { data } = await api.get<IRequestList>('listMyRequests', {
        params,
      });

      return data;
    },
    initialData: {
      requests: [],
      page: 1,
      pageSize: 1,
      totalPages: 1,
      totalItems: 1,
      totalThisPage: 1,
    },
    enabled,
  });
};

export const useRequest = (documentId: string) => {
  return useQuery({
    queryKey: ['request', documentId],
    queryFn: async () => {
      const { data } = await api.get<IRequest>(`requests/${documentId}`);

      return DataToForm(data);
    },
  });
};

const DataToForm = (data: IRequest) => {
  return {
    id: data?.id?.toString(),
    documentId: data?.documentId,
    name: data?.client?.name,
    solicitation_date: data?.createdAt
      ?.slice(0, 10)
      ?.split('-')
      ?.reverse()
      ?.join('/'),
    type: data?.type,
    observation: data?.observation,
    response: data?.answer,
    response_date: data?.answeredAt
      ?.slice(0, 10)
      ?.split('-')
      ?.reverse()
      ?.join('/'),
    attachment: data?.file,
  } as ISolicitationForm;
};
