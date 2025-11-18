import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IRecoveryForm, RecoverySchema } from '@/validations/LoginSchema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Input from '@/components/Inputs/Input/Input';
import Modal from '@/components/Modals/Modal/Modal';
import handleError, { handleSuccess } from '@/utils/handleToast';
import { useForgotPassword } from '@/services/requests/user/forgotPassword';

const ForgotPasswordForm = () => {
  const router = useRouter();

  const [openWarningModal, setOpenWarningModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRecoveryForm>({
    mode: 'onChange',
    resolver: yupResolver(RecoverySchema),
  });

  const { mutate, isPending } = useForgotPassword({
    onSuccess: () => {
      handleSuccess('Email enviado com sucesso! Verifique sua caixa de entrada.');
      setTimeout(() => {
        router.push('/redefinir-senha');
      }, 1000);
    },
    onError: error => handleError(error),
  });

  const onSubmit: SubmitHandler<IRecoveryForm> = async (
    form: IRecoveryForm,
  ) => {
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
      <fieldset className="flex flex-col gap-[86px]">
        <legend className="text-[32px] font-bold text-primary mb-[86px]!">
          Esqueci minha senha
        </legend>
        <Input
          type="email"
          customClassNames="max-w-[470px]"
          placeholder="Insira seu e-mail"
          {...register('email')}
          error={errors?.email?.message}
        />
      </fieldset>
      <button
        className="w-full h-[44px] text-secondary bg-primary font-bold text-[16px] rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        type="submit"
        disabled={isPending}
      >
        {isPending ? 'Enviando...' : 'Enviar e-mail'}
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
