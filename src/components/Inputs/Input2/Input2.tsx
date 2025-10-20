import React, {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from 'react';
import MaskedInput from '../MaskedInput/MaskedInput';
import { twMerge } from 'tailwind-merge';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  customClassNames?: string;
  maskFunction?: (value: string) => string;
  onEdit?: () => void;
  showPasswordButton?: boolean;
  buttons?: ReactNode;
  lock?: boolean;
  direction?: 'flex-col' | 'flex-row';
}

const Input2: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    id,
    readOnly,
    disabled,
    label,
    description,
    name,
    error,
    maskFunction,
    onEdit,
    showPasswordButton,
    type,
    customClassNames,
    buttons,
    lock,
    direction = 'flex-col',
    ...rest
  }: Props,
  ref,
) => {
  const [show, setShow] = useState(false);
  return (
    <div className={twMerge(customClassNames, direction, `w-full flex gap-2`)}>
      <div className={`w-full flex flex-${direction} gap-[10px]`}>
        {label && (
          <div className="flex justify-between items-center">
            <label
              className="text-[16px] font-normal text-secondary flex items-center gap-2 h-[25px]"
              htmlFor={id || name}
            >
              {label}
              {description && (
                <span className="text-[16px] font-light text-neutral2">{` ${description}`}</span>
              )}
            </label>
            {buttons && !disabled && (
              <div className="flex items-center gap-[16px]">{buttons}</div>
            )}
          </div>
        )}
        <div className="relative w-full flex items-center justify-start rounded-[0.75rem]">
          <MaskedInput
            id={id || name}
            disabled={disabled}
            readOnly={readOnly}
            className={
              !!readOnly
                ? 'w-full text-white text-[16px] font-normal bg-transparent border-none outline-none'
                : twMerge(
                    `w-full text-white2 placeholder:text-primary text-[20px] p-[23px_26px]! font-normal rounded-[12px] outline-0 bg-[#0C0C0C]
              `,
                    type === 'password' ? 'pr-[40px]!' : '',
                    error ? 'border-2 border-warning' : '',
                  )
            }
            name={name}
            maskFunction={maskFunction}
            type={type === 'password' ? (show ? 'text' : 'password') : type}
            {...rest}
            ref={ref}
          />
          {type === 'password' &&
            (showPasswordButton === undefined || showPasswordButton) && (
              <button
                className="absolute top-1/2 right-[16px] translate-y-[-50%] border-none bg-transparent flex items-center justify-center"
                type="button"
                onClick={() => setShow(prev => !prev)}
              >
                <img
                  width={24}
                  height={24}
                  src={
                    show ? '/img/icons/eye_on.svg' : '/img/icons/eye_off.svg'
                  }
                  alt="Alternar mostrar senha"
                />
              </button>
            )}
          {disabled && lock && (
            <div className="absolute top-1/2 right-[16px] translate-y-[-50%] border-none bg-transparent flex items-center justify-center">
              <img
                width={24}
                height={24}
                src="/img/icons/lock.svg"
                alt="Bloqueado"
              />
            </div>
          )}
        </div>
      </div>
      {error && (
        <span className="text-[10px] text-warning font-normal">{error}</span>
      )}
    </div>
  );
};

export default forwardRef(Input2);
