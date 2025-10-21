import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginForm, LoginSchema } from '@/validations/LoginSchema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Input from '@/components/Inputs/Input/Input';
import Modal from '@/components/Modals/Modal/Modal';
import handleError from '@/utils/handleToast';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import ModalAcceptTerms from '@/components/Modals/ModalAcceptTerms/ModalAcceptTerms';

const LoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openAcceptModal, setOpenAcceptModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginForm>({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
    // defaultValues: {
    //   email: 'maria.oliveira@email.com',
    //   password: '12345678',
    // },
  });
  const passwordValue = watch('password');

  const onSubmit: SubmitHandler<ILoginForm> = async (form: ILoginForm) => {
    try {
      if (isSubmitting) {
        return;
      }

      setIsSubmitting(true);
      const user = await login(form);
      if (!user.isReadTerms) {
        setOpenAcceptModal(true);
      } else {
        router.push('/solicitacoes');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {openAcceptModal && (
        <ModalAcceptTerms onClose={() => setOpenAcceptModal(false)} />
      )}
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
        <fieldset className="flex flex-col gap-6">
          <Input
            type="email"
            autoComplete="on"
            placeholder="Digite seu e-mail"
            {...register('email')}
            error={errors?.email?.message}
          />

          <div className="flex flex-col gap-[16px]">
            <Input
              type="password"
              showPasswordButton={passwordValue?.length > 0}
              placeholder="Digite sua senha"
              autoComplete="on"
              {...register('password')}
              error={errors?.password?.message}
            />
          </div>
          <Link
            href="/esqueci-minha-senha"
            className="flex items-center text-white text-[16px] font-medium underline"
          >
            Esqueci minha senha/Primeiro acesso
          </Link>
        </fieldset>
        <button
          className="w-full h-[44px] text-secondary bg-primary font-bold text-[16px] rounded-[8px]"
          type="submit"
          disabled={isSubmitting}
        >
          Entrar
        </button>
      </form>
    </>
  );
};

export default LoginForm;
