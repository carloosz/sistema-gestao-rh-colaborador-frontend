'use client';

import React from 'react';
import ForgotPasswordForm from '@/components/Forms/ForgotPasswordForm/ForgotPasswordForm';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
  const router = useRouter();
  return (
    <main className="bg-primary2 flex">
      <div className="relative w-[375px] bg-secondary rounded-r-[50px] h-dvh p-[36px]! flex flex-col items-start justify-center no-scrollbar overflow-auto">
        <button
          className="absolute top-[20px] left-[20px]"
          type="button"
          onClick={() => router.push('/')}
        >
          <img src="/img/icons/back_arrow.svg" alt="Voltar" />
        </button>
        <span className="block text-[40px] text-primary font-black">RH+</span>
        <span className="block text-[22px] text-primary font-normal mb-[39px]!">
          Colaborador
        </span>
        <ForgotPasswordForm />
      </div>
      <div className="flex flex-col items-center justify-end px-[80px]! mx-auto!">
        <h1 className="font-normal text-[36px] text-center text-white w-full">
          Conectando talentos e oportunidades
        </h1>
        <img
          className="w-full max-h-full"
          src="/img/examples/login_banner.png"
          alt="Login banner"
        />
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
