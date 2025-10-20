import React, {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  handleChange?: (bool: boolean) => void;
}

const Checkbox: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { label, name, id, handleChange, checked, ...rest }: Props,
  ref,
) => {
  return (
    <div className="flex flex-row gap-[8px] items-center">
      <input
        id={id || name}
        type="checkbox"
        className="peer hidden"
        onClick={() => {
          if (handleChange) {
            handleChange(!checked);
          }
        }}
        {...rest}
        ref={ref}
      />
      <label
        className="cursor-pointer w-[20px] h-[20px] rounded-[4px] border-1 transition-all border-[#E8E8E8] peer-disabled:opacity-40 peer-checked:bg-[url('/img/icons/check.svg')] bg-[length:12px_12px] bg-no-repeat bg-center"
        htmlFor={id || name}
      />
      <span className="font-normal text-neutral3 text-[14px] peer-disabled:opacity-40">
        {label}
      </span>
    </div>
  );
};

export default forwardRef(Checkbox);
