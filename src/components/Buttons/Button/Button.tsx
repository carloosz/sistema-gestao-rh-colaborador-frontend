import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  buttonStyle?: KeyofButtonStyles;
  customClassNames?: string;
}

const buttonStyles = {
  primary: 'bg-primary text-secondary',
  primary2: 'bg-primary2 text-white',
  secondary: 'bg-secondary text-primary',
  warning: 'bg-warning2 text-primary',
};

type KeyofButtonStyles = keyof typeof buttonStyles;

const Button = ({
  buttonStyle = 'primary',
  type = 'button',
  children,
  customClassNames,
  ...rest
}: Props) => {
  return (
    <button
      type={type}
      className={twMerge(
        `flex gap-[16px] items-center justify-center font-normal text-[20px] rounded-[10px] p-[13px_22px]! h-[50px]`,
        buttonStyles[buttonStyle],
        customClassNames,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
