'use client';

import { formData, formData2 } from './data';
import { useParams } from 'next/navigation';
import SolicitationForm from '@/components/Forms/SolicitationForm/SolicitationForm';
import protectedRoute from '@/hooks/protectedRoute';
import { useRequest } from '@/services/requests/requests/getRequests';
import CollaboratorForm from '@/components/Forms/CollaboratorForm/CollaboratorForm';
import { useAuth } from '@/hooks/useAuth';
import Loading from '@/components/Loading/Loading';

const MyInformationEditPage = () => {
  const { myInfo } = useAuth();

  if (!myInfo) {
    return <Loading />;
  }

  return (
    <CollaboratorForm
      type="edit"
      formData={{
        name: myInfo?.name,
        cpf: myInfo?.cpf,
        phone: myInfo?.phone,
        email: myInfo?.email,
        birthdate: myInfo?.dateOfBirth
          ?.slice(0, 10)
          ?.split('-')
          ?.reverse()
          ?.join('/'),
        gender: {
          label: myInfo?.gender,
          value: myInfo?.gender,
        },
        cep: myInfo?.zipCode,
        street: myInfo?.address,
        state: myInfo?.state,
        city: myInfo?.city,
        neighborhood: myInfo?.neighborhood,
        number: myInfo?.number,
      }}
    />
  );
};

export default protectedRoute(MyInformationEditPage);
