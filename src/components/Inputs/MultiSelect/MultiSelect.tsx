import { IOption } from '@/interfaces/OptionType';
import React, { ForwardRefRenderFunction, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface Props {
  id: string;
  readOnly?: boolean;
  name: string;
  label: string;
  placeholder: string;
  options: IOption[];
  control: Control<any>;
  error?: string;
}

const MultiSelect: ForwardRefRenderFunction<any, Props> = (
  { id, readOnly, label, options, placeholder, name, control, error, ...rest },
  ref,
) => {
  const [openSelect, setOpenSelect] = useState(false);

  return (
    <div className="relative w-full flex flex-col gap-[8px] ">
      <span className="text-[16px] font-normal text-secondary">{label}</span>
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          readOnly ? (
            <p className="text-white text-[16px] font-normal">
              {Array.isArray(field?.value)
                ? field?.value?.map(item => item?.label)?.join(', ')
                : ''}
            </p>
          ) : (
            <div
              className="bg-primary2 rounded-[12px] p-[12px]! flex flex-col gap-[16px]"
              ref={ref}
            >
              <div className="flex items-center justify-between">
                <span className="text-[16px] text-primary font-normal">
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
                <div className="absolute w-full translate-x-[-50%] left-[50%] top-[calc(100%-10px)] bg-primary2 flex flex-col gap-[16px] items-start max-h-[150px] overflow-y-auto rounded-b-[10px] p-[16px]! z-9 border-1 border-primary">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      className="text-[16px] text-primary font-normal flex items-center gap-[16px]"
                      onClick={() => {
                        if (Array.isArray(field.value)) {
                          if (
                            field.value.find(
                              item => item?.value === option?.value,
                            )
                          ) {
                            field.onChange(
                              field.value.filter(
                                item => item?.value !== option?.value,
                              ),
                            );
                          } else {
                            field.onChange([...field.value, option]);
                          }
                        } else {
                          field.onChange([option]);
                        }
                      }}
                    >
                      <div
                        className={twMerge(
                          'w-[20px] h-[20px] rounded-[4px] border-1 transition-background',
                          Array.isArray(field.value) &&
                            field.value.find(
                              item => item?.value === option?.value,
                            )
                            ? 'bg-secondary bg-[url(/img/icons/check.svg)] bg-size-[12px] bg-center bg-no-repeat border-secondary'
                            : 'border-primary',
                        )}
                      />

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

export default MultiSelect;
