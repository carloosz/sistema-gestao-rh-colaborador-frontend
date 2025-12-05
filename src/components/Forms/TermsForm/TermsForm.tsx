import Button from '@/components/Buttons/Button/Button';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRouter } from 'next/navigation';
import handleError, { handleSuccess } from '@/utils/handleToast';
import { ITermsForm, TermsSchema } from '@/validations/TermsSchema';
import Textarea2 from '@/components/Inputs/Textarea2/Textarea2';
import { useAcceptTerms } from '@/services/requests/terms/acceptTerms';
import Checkbox from '@/components/Inputs/Checkbox/Checkbox';
import { useAuth } from '@/hooks/useAuth';
import { localStorageKeys } from '@/utils/localStorageKeys';

interface Props {
  onClose: () => void;
  formData: ITermsForm;
}

const TermsForm = ({ onClose, formData }: Props) => {
  const { setUser } = useAuth();
  const termsRef = useRef<HTMLTextAreaElement | null>(null);
  const policyRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ITermsForm>({
    mode: 'onChange',
    resolver: yupResolver(TermsSchema),
  });

  const [readTerms, setReadTerms] = useState(false);
  const [readPolicy, setReadPolicy] = useState(false);

  console.log(formData);

  const acceptTermsValue = watch('accept_terms');

  const { mutate } = useAcceptTerms({
    onSuccess: async data => {
      handleSuccess('Termos aceitos com sucesso!');
      setUser(data);
      localStorage.setItem(localStorageKeys.user, JSON.stringify(data));
      router.push('/solicitacoes');
    },
    onError: (error: any) => handleError(error),
  });

  const onSubmit = (form: ITermsForm) => {
    mutate();
  };

  useEffect(() => {
    const termsEl = termsRef.current;
    if (termsEl) {
      if (termsEl.scrollHeight === 200) {
        setReadTerms(true);
      } else {
        termsEl.addEventListener('scroll', function (e) {
          console.log(termsEl?.scrollTop);
          const condition = termsEl.scrollHeight - termsEl.scrollTop === 200;
          if (condition) {
            setReadTerms(true);
          }
        });
      }
    }
  }, [termsRef]);

  useEffect(() => {
    const policyEl = policyRef.current;
    if (policyEl) {
      if (policyEl.scrollHeight === 200) {
        setReadPolicy(true);
      } else {
        policyEl.addEventListener('scroll', function (e) {
          console.log(policyEl?.scrollTop);
          const condition = policyEl.scrollHeight - policyEl.scrollTop === 200;
          if (condition) {
            setReadPolicy(true);
          }
        });
      }
    }
  }, [policyRef]);

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit(onSubmit, errorGroup =>
        handleError('Aceite os termos de uso e política de privacidade'),
      )}
    >
      <span className="block text-center text-[36px] font-normal text-secondary mb-[23px]!">
        Termos de uso e Política de privacidade
      </span>
      <p className="font-normal text-[#9b9b9b] text-center text-[18px] mb-[23px]!">
        Role até o final para aceitar os Termos e Política de Privacidade
      </p>
      <div className="flex flex-col gap-[12px]">
        <div className="w-full flex flex-col">
          <span className="font-normal text-secondary text-[20px]">
            Termos de uso
          </span>
          <Textarea2
            disabled
            customClassName="h-[200px]"
            wrap="hard"
            value={formData?.terms_of_use}
            placeholder="Digite os termos de uso"
            {...register('terms_of_use')}
            ref={termsRef}
            error={errors?.terms_of_use?.message}
          />
        </div>
        <div className="w-full flex flex-col">
          <span className="font-normal text-secondary text-[20px]">
            Política de privacidade
          </span>
          <Textarea2
            disabled
            customClassName="h-[200px]"
            wrap="hard"
            value={formData?.privacy_policies}
            placeholder="Digite a política de privacidade"
            {...register('privacy_policies')}
            ref={policyRef}
            error={errors?.privacy_policies?.message}
          />
        </div>
        <Checkbox
          disabled={!readTerms || !readPolicy}
          label={
            <p className="text-white text-[16px] font-normal">
              Declaro que li e aceito os Termos de uso e políticas de
              privacidade.
            </p>
          }
          checked={acceptTermsValue}
          handleChange={e => setValue('accept_terms', e)}
          {...register('accept_terms')}
        />
        <div className="flex justify-center gap-[12px]">
          <Button
            type="button"
            buttonStyle="primary2"
            customClassNames="w-[286px] h-[46px]"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            buttonStyle="secondary"
            customClassNames="w-[286px] h-[46px]"
          >
            Continuar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TermsForm;
