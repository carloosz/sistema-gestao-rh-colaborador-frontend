import Textarea2 from '@/components/Inputs/Textarea2/Textarea2';
import handleError from '@/utils/handleToast';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { typeOptions } from './data';
import SelectCustom2 from '@/components/Inputs/Select2/Select2';
import { useQueryClient } from '@tanstack/react-query';
import Modal2 from '@/components/Modals/Modal2/Modal2';
import { useCreateRequest } from '@/services/requests/requests/createRequest';
import { IRequestForm, RequestSchema } from '@/validations/RequestSchema';
import InputFile from '@/components/Inputs/InputFile/InputFile';

interface Props {
  onClose: () => void;
}

const NewRequestForm = ({ onClose }: Props) => {
  const queryClient = useQueryClient();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<IRequestForm>({
    mode: 'onChange',
    resolver: yupResolver(RequestSchema),
  });

  const fileValue = watch('file');

  const { mutate } = useCreateRequest({
    onSuccess: async () => {
      setOpenSuccessModal(true);
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
    onError: (error: any) => handleError(error),
  });

  const onSubmit = (form: IRequestForm) => {
    mutate(form);
  };

  return (
    <form
      className="w-full flex flex-col gap-[14px]"
      onSubmit={handleSubmit(onSubmit, errorGroup => console.log(errorGroup))}
    >
      {openSuccessModal && (
        <Modal2
          message="Solicitação Enviada!"
          img="/img/icons/check_circle.svg"
          buttons={[
            {
              onClick: onClose,
              text: 'Voltar',
            },
          ]}
        />
      )}
      <div className="w-full flex flex-col justify-center">
        <span className="text-start text-secondary text-[24px] font-normal">
          Nova solicitação
        </span>
      </div>
      <SelectCustom2
        id={'type'}
        options={typeOptions}
        control={control}
        placeholder="Selecione o tipo"
        {...register('type')}
        error={errors?.type?.message}
      />
      <InputFile
        customClassNames="max-w-[470px]"
        file={fileValue as FileList}
        {...register('file')}
      />
      <Textarea2
        rows={5}
        wrap="hard"
        placeholder="Insira a observação"
        {...register('observation')}
        error={errors?.observation?.message}
      />
      <div className=" w-full flex items-center justify-center gap-[20px]">
        <button
          onClick={onClose}
          type="button"
          className={`rounded-[10px] flex items-center justify-center w-[201px] h-[59px] border-1 border-primary2 bg-primary2 font-normal text-[24px] text-white`}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className={`rounded-[10px] flex items-center justify-center w-[201px] h-[59px] border-1 bg-secondary font-normal text-[24px] text-primary2`}
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default NewRequestForm;
