import { IOption } from '@/interfaces/OptionType';
import React, { ForwardRefRenderFunction, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface Props {
  id: string;
  readOnly?: boolean;
  name: string;
  label?: string;
  placeholder: string;
  options: IOption[];
  control: Control<any>;
  error?: string;
}

const SelectCustom2: ForwardRefRenderFunction<any, Props> = (
  { id, readOnly, label, options, placeholder, name, control, error, ...rest },
  ref,
) => {
  const [openSelect, setOpenSelect] = useState(false);

  return (
    <div className="relative w-full flex flex-col gap-[8px]">
      {label && (
        <span className="text-[16px] font-normal text-secondary">{label}</span>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          readOnly ? (
            <p className="text-white text-[16px] font-normal">
              {field?.value?.label}
            </p>
          ) : (
            <div
              className="bg-[#0C0C0C] rounded-[12px] p-[12px]! flex flex-col gap-[16px]"
              ref={ref}
            >
              <div className="flex items-center justify-between">
                <span className="text-[20px] text-white font-normal">
                  {(field?.value?.label as string) || 'Selecione'}
                </span>
                <button
                  type="button"
                  className="w-[24px] h-[24px]"
                  onClick={() => setOpenSelect(!openSelect)}
                >
                  <img
                    className={twMerge(
                      'transition-all',
                      openSelect ? 'rotate-[180deg]' : 'rotate-[0deg]',
                    )}
                    src="/img/icons/arrow.svg"
                    alt="Seta"
                  />
                </button>
              </div>
              {openSelect && (
                <div className="absolute w-full translate-x-[-50%] left-[50%] top-[calc(100%-10px)] bg-[#0C0C0C] flex flex-col gap-[16px] items-start max-h-[150px] overflow-y-auto rounded-b-[10px] p-[16px]! z-9 border-1 border-primary">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      className="text-[20px] text-primary2 font-normal"
                      onClick={() => {
                        field.onChange(option);
                        setOpenSelect(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        }
      />
      {error && (
        <span className="text-[10px] text-warning font-normal">{error}</span>
      )}
    </div>
  );
};

export default SelectCustom2;
