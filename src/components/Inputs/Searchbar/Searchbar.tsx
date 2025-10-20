import React, {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Searchbar: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { ...rest },
  ref,
) => {
  return (
    <div className="rounded-[0.625rem] bg-primary flex gap-[25px] items-center w-[335px] h-[50px] p-[9px]!">
      <img width={35} height={35} src="/img/icons/search.svg" alt="Busca" />
      <input
        className="w-full text-[24px] font-normal text-primary2 outline-0"
        ref={ref}
        {...rest}
      />
    </div>
  );
};

export default forwardRef(Searchbar);
