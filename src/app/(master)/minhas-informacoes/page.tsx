'use client';

import protectedRoute from '@/hooks/protectedRoute';
import CollaboratorForm from '@/components/Forms/CollaboratorForm/CollaboratorForm';
import { useAuth } from '@/hooks/useAuth';
import Loading from '@/components/Loading/Loading';

const MyInformationPage = () => {
  const { myInfo } = useAuth();

  if (!myInfo) {
    return <Loading/>;
  }

  return (
    <CollaboratorForm
      type="view"
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

export default protectedRoute(MyInformationPage);
