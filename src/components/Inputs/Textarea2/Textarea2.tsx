import React, {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  TextareaHTMLAttributes,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  description?: string;
  error?: string;
  maxwidth?: string;
  customClassName?: string;
  showPasswordButton?: boolean;
  buttons?: ReactNode;
  lock?: boolean;
  direction?: 'col' | 'row';
}

const Textarea2: ForwardRefRenderFunction<HTMLTextAreaElement, Props> = (
  {
    id,
    readOnly,
    disabled,
    description,
    name,
    error,
    showPasswordButton,
    maxwidth,
    customClassName,
    buttons,
    lock,
    direction = 'col',
    ...rest
  }: Props,
  ref,
) => {
  return (
    <div
      className={`${
        maxwidth ? `max-w-[${maxwidth}]` : ''
      } w-full flex flex-${direction} gap-2`}
    >
      <div className={`w-full flex flex-${direction} gap-[10px]`}>
        <div className="relative w-full flex items-center justify-start rounded-[10px]">
          <textarea
            id={id || name}
            disabled={disabled}
            readOnly={readOnly}
            className={
              !!readOnly
                ? 'w-full text-white text-[16px] font-normal bg-transparent border-none outline-none resize-none'
                : twMerge(
                    `w-full text-white placeholder:text-primary2 text-[20px] p-[11.5px]! font-normal rounded-[12px] outline-none resize-none bg-[#0C0C0C]
              `,
                    customClassName,
                    error ? 'border-2 border-warning' : '',
                  )
            }
            name={name}
            {...rest}
            ref={ref}
          />
        </div>
      </div>
      {error && (
        <span className="text-[10px] text-warning font-normal">{error}</span>
      )}
    </div>
  );
};

export default forwardRef(Textarea2);
