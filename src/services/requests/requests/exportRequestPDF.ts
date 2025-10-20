import api from '@/services/api';
import { urlConvert } from '@/utils/urlConvert';

export const exportRequestPDF = async (documentId: string) => {
  const { data } = await api.get<string>(`/exportRequestPdf/${documentId}`);
  return urlConvert(data);
};
