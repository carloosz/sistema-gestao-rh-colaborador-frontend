import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';

interface Props {
  onBack?: () => void;
  title: string;
  id?: string;
  buttons?: ReactNode;
}

const Header = ({ title, id, buttons, onBack }: Props) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className="pt-[72px]! pb-[20px]! px-[30px]! flex flex-col lg:flex-row justify-between rounded-[10px] gap-[10px] bg-secondary z-9">
      <div className="flex flex-col sm:flex-row gap-[16px] items-start sm:items-center">
        <button type="button" onClick={handleBack}>
          <img src="/img/icons/back_arrow.svg" alt="Voltar" />
        </button>
        <h1 className="text-[24px] lg:text-[40px] font-normal text-#0C0C0C">
          {title}{' '}
          {id && (
            <span className="text-[24px] lg:text-[40px] text-#0C0C0C font-normal">
              #{id}
            </span>
          )}
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-[16px] justify-end sm:items-center">
        {buttons}
      </div>
    </header>
  );
};

export default Header;
