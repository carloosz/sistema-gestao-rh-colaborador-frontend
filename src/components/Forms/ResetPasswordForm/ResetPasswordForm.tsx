import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IResetForm, ResetSchema } from '@/validations/LoginSchema';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Input from '@/components/Inputs/Input/Input';
import Modal from '@/components/Modals/Modal/Modal';
import handleError, { handleSuccess } from '@/utils/handleToast';
import { useResetPassword } from '@/services/requests/user/resetPassword';

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') as string;
  const router = useRouter();

  const [openWarningModal, setOpenWarningModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IResetForm>({
    mode: 'onChange',
    resolver: yupResolver(ResetSchema),
    defaultValues: {
      code,
    },
  });
  const newPasswordValue = watch('new_password');
  const confirmPasswordValue = watch('confirm_password');

  const { mutate, isPending } = useResetPassword({
    onSuccess: () => {
      handleSuccess('Senha redefinida com sucesso!');
      router.push('/');
    },
    onError: error => handleError(error),
  });

  const onSubmit: SubmitHandler<IResetForm> = async (form: IResetForm) => {
    mutate(form);
  };

  return (
    <form
      className="w-full flex flex-col gap-[40px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      {openWarningModal && (
        <Modal
          message1="E-mail ou senha incorretos"
          message2="Não conseguimos encontrar uma conta com essas credenciais. Verifique se digitou seu e-mail e senha corretamente."
          buttons={[
            {
              text: 'Tente novamente',
              onClick: () => setOpenWarningModal(false),
            },
          ]}
        />
      )}
      <fieldset className="flex flex-col gap-[36px]">
        <legend className="text-[32px] font-bold text-primary mb-[22px]!">
          Redefinir senha
        </legend>
        <Input
          customClassNames="max-w-[470px]"
          type="password"
          showPasswordButton={newPasswordValue?.length > 0}
          placeholder="Digite a nova senha"
          {...register('new_password')}
          error={errors?.new_password?.message}
        />
        <Input
          customClassNames="max-w-[470px]"
          type="password"
          showPasswordButton={confirmPasswordValue?.length > 0}
          placeholder="Confirme a nova senha"
          {...register('confirm_password')}
          error={errors?.confirm_password?.message}
        />
      </fieldset>
      <button
        className="w-full h-[44px] text-secondary bg-primary font-bold text-[16px] rounded-[8px]"
        type="submit"
        disabled={isPending}
      >
        Redefinir senha
      </button>
    </form>
  );
};

export default ResetPasswordForm;
