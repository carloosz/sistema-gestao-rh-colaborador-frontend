import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  active: boolean;
  onSelect: () => void;
  children: ReactNode;
}

const Tab = ({ active, onSelect, children }: Props) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={twMerge(
        'w-full h-[59px] flex items-center justify-center text-[18px] border-b-1 transition-all',
        active
          ? 'text-primary font-semibold border-primary'
          : 'text-neutral4 font-normal border-transparent',
      )}
    >
      {children}
    </button>
  );
};

export default Tab;
