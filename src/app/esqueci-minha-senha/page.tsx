'use client';

import React from 'react';
import ForgotPasswordForm from '@/components/Forms/ForgotPasswordForm/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <main className="bg-primary2 flex">
      <div className="w-[375px] bg-secondary rounded-r-[50px] h-dvh p-[36px]! flex flex-col items-start justify-center no-scrollbar overflow-auto">
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
