import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  active: boolean;
  onSelect: () => void;
  children: ReactNode;
}

const Tab2 = ({ active, onSelect, children }: Props) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={twMerge(
        'flex items-center justify-center text-[24px] font-normal',
        active ? 'text-secondary' : 'text-primary',
      )}
    >
      {children}
    </button>
  );
};

export default Tab2;
