import React, {
  ButtonHTMLAttributes,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const AddButton: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  { text, ...rest },
  ref,
) => {
  return (
    <button
      className="rounded-[10px] bg-secondary font-normal text-[24px] text-primary2 flex justify-center items-center gap-[20px] w-[335px] h-[50px]"
      {...rest}
      ref={ref}
    >
      {text}
      <img width={32} height={32} src="/img/icons/plus.svg" alt="Adicionar" />
    </button>
  );
};

export default forwardRef(AddButton);
