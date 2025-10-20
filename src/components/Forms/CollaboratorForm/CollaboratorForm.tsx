import Button from '@/components/Buttons/Button/Button';
import Header from '@/components/Header/Header';
import SelectCustom from '@/components/Inputs/Select/Select';
import { maskCEP, maskCPF, maskDate, maskPhone, unMask } from '@/utils/masks';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { genderOptions } from './data';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CollaboratorSchema,
  ICollaboratorForm,
} from '@/validations/CollaboratorSchema';
import { useRouter } from 'next/navigation';
import handleError, { handleSuccess } from '@/utils/handleToast';
import api from '@/services/api';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateMyInformation } from '@/services/requests/user/updateMyInformation';
import Input from '@/components/Inputs/Input/Input';

interface Props {
  type?: 'edit' | 'view';
  formData?: ICollaboratorForm;
}

const CollaboratorForm = ({ type = 'view', formData }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    setValue,
    watch,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICollaboratorForm>({
    mode: 'onChange',
    resolver: yupResolver(CollaboratorSchema),
  });

  const { mutate: mutateUpdate } = useUpdateMyInformation({
    onSuccess: async () => {
      handleSuccess('Dados atualizados com sucesso!');
      await queryClient.invalidateQueries({
        queryKey: ['list-my-informations'],
      });
      router.push('/minhas-informacoes');
    },
    onError: error => handleError(error),
  });

  const buscarCep = async (cep: string) => {
    try {
      const cepFormatted = cep.replace('-', '');
      if (cepFormatted.length >= 8) {
        const { data } = await api.get(
          `https://viacep.com.br/ws/${cepFormatted}/json/`,
        );
        setValue('street', data.logradouro);
        setValue('neighborhood', data.bairro);
        setValue('city', data.localidade);
        setValue('state', data.uf);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const onSubmit = (form: ICollaboratorForm) => {
    mutateUpdate(form);
  };

  useEffect(() => {
    reset(formData);
  }, [formData]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, errorGroup => console.log(errorGroup))}
      >
        <Header
          title={'Minhas informações'}
          buttons={
            type !== 'view' ? (
              <Button type="submit">
                Salvar
                <img src="/img/icons/save.svg" alt="Salvar" />
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  onClick={() => router.push(`/minhas-informacoes/editar/`)}
                >
                  Editar
                  <img src="/img/icons/edit.svg" alt="Editar" />
                </Button>
              </>
            )
          }
        />
        <div className="mt-[60px]! mb-[30px]! flex flex-col gap-[30px] items-center ">
          <fieldset className="max-w-[983px] w-full rounded-[10px] bg-primary pt-[11px]! pb-[40px]! px-[25px]!">
            <span
              role="legend"
              className="block text-[20px] text-secondary font-bold mb-[25px]!"
            >
              Dados pessoais
            </span>
            <div className="grid grid-cols-3 gap-x-[37px] gap-y-[30px]">
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Nome"
                placeholder="Insira o nome"
                {...register('name')}
                error={errors?.name?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="CPF"
                maskFunction={maskCPF}
                placeholder="Insira o CPF"
                {...register('cpf')}
                error={errors?.cpf?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                type="phone"
                label="Telefone"
                maskFunction={maskPhone}
                placeholder="Insira o Telefone"
                {...register('phone')}
                error={errors?.phone?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                type="email"
                label="E-mail"
                placeholder="Insira o E-mail"
                {...register('email')}
                error={errors?.email?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Data de nascimento"
                maskFunction={maskDate}
                placeholder="Insira a data de nascimento"
                {...register('birthdate')}
                error={errors?.birthdate?.message}
              />
              <SelectCustom
                readOnly={type === 'view'}
                id={'gender'}
                options={genderOptions}
                control={control}
                label="Sexo"
                placeholder="Selecione"
                {...register('gender')}
                error={errors?.gender?.message}
              />
            </div>
          </fieldset>
          <fieldset className="max-w-[983px] w-full rounded-[10px] bg-primary pt-[11px]! pb-[40px]! px-[25px]!">
            <span
              role="legend"
              className="block text-[20px] text-secondary font-bold mb-[25px]!"
            >
              Endereço
            </span>
            <div className="grid grid-cols-3 gap-x-[37px] gap-y-[30px]">
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="CEP"
                maskFunction={maskCEP}
                placeholder="Insira o CEP"
                {...register('cep')}
                onBlur={e => buscarCep(e.target.value)}
                error={errors?.cep?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Logradouro"
                placeholder="Insira o logradouro"
                {...register('street')}
                error={errors?.street?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Estado"
                placeholder="Insira o estado"
                {...register('state')}
                error={errors?.state?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Cidade"
                placeholder="Insira a cidade"
                {...register('city')}
                error={errors?.city?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Bairro"
                placeholder="Insira o bairro"
                {...register('neighborhood')}
                error={errors?.neighborhood?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Número"
                maskFunction={unMask}
                placeholder="Insira o número"
                {...register('number')}
                error={errors?.number?.message}
              />
            </div>
          </fieldset>
        </div>
      </form>
    </>
  );
};

export default CollaboratorForm;
