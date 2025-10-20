import React, {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  TextareaHTMLAttributes,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
  maxwidth?: string;
  maskFunction?: (value: string) => string;
  onEdit?: () => void;
  showPasswordButton?: boolean;
  buttons?: ReactNode;
  lock?: boolean;
  direction?: 'col' | 'row';
}

const Textarea: ForwardRefRenderFunction<HTMLTextAreaElement, Props> = (
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
    maxwidth,
    buttons,
    lock,
    direction = 'col',
    ...rest
  }: Props,
  ref,
) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className={`${
        maxwidth ? `max-w-[${maxwidth}]` : ''
      } w-full flex flex-${direction} gap-2`}
    >
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
          <textarea
            id={id || name}
            disabled={disabled}
            readOnly={readOnly}
            className={
              !!readOnly
                ? 'w-full text-white text-[16px] font-normal bg-transparent border-none outline-none resize-none'
                : twMerge(
                    `w-full text-primary placeholder:text-primary text-[14px] p-[11.5px]! font-normal rounded-[12px] outline-none resize-none bg-primary2
              `,
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

export default forwardRef(Textarea);
