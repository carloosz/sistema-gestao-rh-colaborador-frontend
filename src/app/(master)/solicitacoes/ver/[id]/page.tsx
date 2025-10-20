'use client';

import { formData, formData2 } from './data';
import { useParams } from 'next/navigation';
import SolicitationForm from '@/components/Forms/SolicitationForm/SolicitationForm';
import protectedRoute from '@/hooks/protectedRoute';
import { useRequest } from '@/services/requests/requests/getRequests';

const ViewSolicitationPage = () => {
  const params = useParams();
  const { id } = params;

  const { data } = useRequest(id as string);

  if (!data) {
    return null;
  }

  return <SolicitationForm type="view" formData={data} />;
};

export default protectedRoute(ViewSolicitationPage);
