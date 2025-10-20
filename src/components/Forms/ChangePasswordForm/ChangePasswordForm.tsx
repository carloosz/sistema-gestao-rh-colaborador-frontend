import Header from '@/components/Header/Header';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import handleError from '@/utils/handleToast';
import Input2 from '@/components/Inputs/Input2/Input2';
import { ChangeSchema, IChangeForm } from '@/validations/LoginSchema';
import { useChangePassword } from '@/services/requests/config/changePassword';
import Modal2 from '@/components/Modals/Modal2/Modal2';
import { useAuth } from '@/hooks/useAuth';

const ChangePasswordForm = () => {
  const { logout } = useAuth();

  const [formData, setFormData] = useState<IChangeForm | null>(null);

  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangeForm>({
    mode: 'onChange',
    resolver: yupResolver(ChangeSchema),
  });

  const currentPasswordValue = watch('current_password');
  const newPasswordValue = watch('new_password');
  const confirmPasswordValue = watch('confirm_password');

  const { mutate } = useChangePassword({
    onSuccess: () => {
      setOpenConfirmModal(false);
      setOpenSuccessModal(true);
    },
    onError: error => handleError(error),
  });

  const onSubmit = (form: IChangeForm) => {
    setOpenConfirmModal(true);
    setFormData(form);
  };

  return (
    <>
      {openConfirmModal && formData && (
        <Modal2
          maxwidth="max-w-[32.5625rem]"
          message="Deseja alterar a senha?"
          img="/img/icons/lock.svg"
          buttons={[
            {
              onClick: () => mutate(formData),
              text: 'Sim',
            },
            {
              onClick: () => setOpenConfirmModal(false),
              text: 'Não',
            },
          ]}
        />
      )}
      {openSuccessModal && (
        <Modal2
          message="Senha alterada!"
          img="/img/icons/check_circle.svg"
          buttons={[
            {
              onClick: logout,
              text: 'Voltar',
            },
          ]}
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit, errorGroup => console.log(errorGroup))}
      >
        <Header title="Alterar senha" />
        <div className="mt-[63px]! flex flex-col gap-[30px] items-center justify-center">
          <fieldset className="max-w-[560px] w-full rounded-[10px] bg-primary pt-[65px]! pb-[52px]! px-[45px]! flex flex-col gap-[30px]">
            <Input2
              customClassNames="max-w-[470px]"
              type="password"
              showPasswordButton={currentPasswordValue?.length > 0}
              placeholder="Digite a senha atual"
              {...register('current_password')}
              error={errors?.current_password?.message}
            />
            <Input2
              customClassNames="max-w-[470px]"
              type="password"
              showPasswordButton={newPasswordValue?.length > 0}
              placeholder="Digite a nova senha"
              {...register('new_password')}
              error={errors?.new_password?.message}
            />
            <Input2
              customClassNames="max-w-[470px]"
              type="password"
              showPasswordButton={confirmPasswordValue?.length > 0}
              placeholder="Confirme a nova senha"
              {...register('confirm_password')}
              error={errors?.confirm_password?.message}
            />
            <button
              type="submit"
              className="w-full h-[62px] bg-secondary text-primary2 rounded-[10px] text-[24px] font-normal"
            >
              Alterar senha
            </button>
          </fieldset>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordForm;
