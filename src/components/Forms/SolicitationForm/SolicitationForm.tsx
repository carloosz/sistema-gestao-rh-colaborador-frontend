import Button from '@/components/Buttons/Button/Button';
import Header from '@/components/Header/Header';
import Input from '@/components/Inputs/Input/Input';
import { maskDate } from '@/utils/masks';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRouter } from 'next/navigation';
import Textarea from '@/components/Inputs/Textarea/Textarea';
import {
  ISolicitationForm,
  SolicitationSchema,
} from '@/validations/SolicitationSchema';
import { exportRequestPDF } from '@/services/requests/requests/exportRequestPDF';
import InputFile from '@/components/Inputs/InputFile/InputFile';

interface Props {
  type?: 'register' | 'edit' | 'view';
  formData?: ISolicitationForm;
}

const SolicitationForm = ({ type = 'register', formData }: Props) => {
  const router = useRouter();

  const {
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<ISolicitationForm>({
    mode: 'onChange',
    resolver: yupResolver(SolicitationSchema),
    defaultValues: formData,
  });

  const fileValue = watch('attachment');

  useEffect(() => {
    reset(formData);
  }, [formData]);

  return (
    <>
      <form className="pb-[20px]!">
        <Header
          title={
            formData?.response
              ? 'Detalhes da solicitação - Finalizada'
              : 'Detalhes da solicitação - Pendente'
          }
          id={formData?.id}
          buttons={
            formData?.response ? (
              <Button
                type="button"
                onClick={async () => {
                  const link = await exportRequestPDF(
                    formData?.documentId as string,
                  );
                  open(link, '_blank');
                }}
              >
                Imprimir
                <img
                  width={32}
                  height={32}
                  src="/img/icons/print_blue.svg"
                  alt="Imprimir"
                />
              </Button>
            ) : undefined
          }
        />
        <div className="mt-[60px]! mb-[30px]! flex flex-col gap-[30px] items-center ">
          <fieldset className="max-w-[983px] w-full rounded-[10px] bg-primary pt-[11px]! pb-[40px]! px-[25px]!">
            <span
              role="legend"
              className="block text-[20px] text-secondary font-bold mb-[25px]!"
            >
              Dados da solicitação
            </span>
            <div className="flex flex-col gap-[45px]">
              <div className="grid grid-cols-3 gap-x-[37px] gap-y-[30px]">
                <Input
                  customClassNames="max-w-[286px]"
                  readOnly={type === 'view'}
                  label="Nome"
                  {...register('name')}
                  error={errors?.name?.message}
                />
                <Input
                  customClassNames="max-w-[286px]"
                  readOnly={type === 'view'}
                  label="Data"
                  maskFunction={maskDate}
                  {...register('solicitation_date')}
                  error={errors?.solicitation_date?.message}
                />
                <Input
                  customClassNames="max-w-[286px]"
                  readOnly={type === 'view'}
                  label="Tipo de solicitação"
                  {...register('type')}
                  error={errors?.type?.message}
                />
              </div>
              <Textarea
                rows={5}
                wrap="hard"
                maxwidth="max-w-[286px]"
                readOnly={type === 'view'}
                label="Observações"
                {...register('observation')}
                error={errors?.observation?.message}
              />
              <InputFile
                readOnly={type === 'view'}
                customClassNames="max-w-[470px]"
                label="Anexo"
                file={fileValue}
                {...register('attachment')}
              />
            </div>
          </fieldset>
          {formData?.response && (
            <fieldset className="max-w-[983px] w-full rounded-[10px] bg-primary pt-[11px]! pb-[40px]! px-[25px]!">
              <span
                role="legend"
                className="block text-[20px] text-secondary font-bold mb-[25px]!"
              >
                Dados da resposta
              </span>
              <div className="flex flex-col gap-[45px]">
                <Input
                  customClassNames="max-w-[286px]"
                  readOnly={type === 'view'}
                  label="Data"
                  maskFunction={maskDate}
                  {...register('response_date')}
                  error={errors?.response_date?.message}
                />
                <Textarea
                  rows={5}
                  wrap="hard"
                  maxwidth="max-w-[286px]"
                  readOnly={type === 'view'}
                  label="Resposta"
                  {...register('response')}
                  error={errors?.response?.message}
                />
              </div>
            </fieldset>
          )}
        </div>
      </form>
    </>
  );
};

export default SolicitationForm;
