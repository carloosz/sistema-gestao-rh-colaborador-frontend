import { InputHTMLAttributes, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  maskFunction?: (value: string) => string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MaskedInput: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { maskFunction, onChange, width, ...rest },
  ref,
) => {
  const handleMask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskFunction
      ? maskFunction(event.target.value)
      : event.target.value;
    event.target.value = masked;
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <input
      type="text"
      className="form-control outline-0"
      onChange={(event: any) => handleMask(event)}
      {...rest}
      ref={ref}
    />
  );
};

export default forwardRef(MaskedInput);
