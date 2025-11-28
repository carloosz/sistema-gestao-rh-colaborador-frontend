'use client';

import React from 'react';
import LoginForm from '@/components/Forms/LoginForm/LoginForm';

const LoginPage = () => {
  return (
    <main className="bg-primary2 flex lg:justify-start justify-center items-center h-dvh min-h-[600px]">
      <div className="max-w-[375px] lg:h-full h-max w-full bg-secondary rounded-[50px] lg:rounded-l-none p-[36px]! flex flex-col items-start justify-center">
        <span className="block text-[40px] text-primary font-black">RH+</span>
        <span className="block text-[22px] text-primary font-normal mb-[96px]!">
          Colaborador
        </span>
        <LoginForm />
      </div>
      <div className="lg:flex hidden flex-col items-center justify-end mx-auto! mt-auto! overflow-hidden">
        <h1 className="min-w-[788px] font-normal text-[36px] text-center text-white w-full whitespace-nowrap">
          Conectando talentos e oportunidades
        </h1>
        <img
          className="min-w-[788px]"
          src="/img/examples/login_banner.png"
          alt="Login banner"
        />
      </div>
    </main>
  );
};

export default LoginPage;
