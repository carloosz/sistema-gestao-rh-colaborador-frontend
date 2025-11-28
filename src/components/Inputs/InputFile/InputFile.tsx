import useDocDownload from '@/hooks/useDocDownload';
import { IFile } from '@/interfaces/File';
import { urlConvert } from '@/utils/urlConvert';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  customClassNames?: string;
  buttons?: ReactNode;
  direction?: 'flex-col' | 'flex-row';
  file?: FileList | IFile;
}

const InputFile: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    id,
    readOnly,
    disabled,
    label,
    description,
    name,
    error,
    customClassNames,
    buttons,
    direction = 'flex-col',
    file,
    ...rest
  }: Props,
  ref,
) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );
  const { DocDownload } = useDocDownload();

  const fileLink =
    file instanceof FileList && file
      ? URL.createObjectURL(file.item(0) as File)
      : file?.url
      ? urlConvert(file?.url)
      : undefined;
  const fileLinkArray = fileLink?.split('.');
  const extension =
    file instanceof FileList
      ? file.item(0)?.type.split('/')[1]
      : file?.url?.split('.').pop()?.toLowerCase();

  const typeFileVerify = ['gif', 'jpeg', 'jpg', 'png'].includes(
    extension ?? '',
  );

  return (
    <div
      className={twMerge(
        ' w-full flex flex-col gap-2',
        direction,
        customClassNames,
      )}
    >
      {selectedImage && (
        <div className="fixed w-full h-full top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,0.8)] z-999">
          <div className="relative">
            <div className="w-[90dvh] h-[90dvh]">
              <img
                className="w-full h-full object-contain overflow-y-auto rounded-[12px]"
                src={selectedImage}
                alt="Imagem"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedImage(undefined)}
            className="absolute top-[12px] right-[12px] w-[40px] h-[40px"
          >
            <img src="/img/icons/close.svg" alt="Fechar" />
          </button>
        </div>
      )}
      <div className={twMerge(`w-full flex gap-[10px]`, direction)}>
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
        {!fileLink && readOnly ? (
          <span className="text-[16px] font-normal text-white">Sem Anexo</span>
        ) : (
          <div className="flex gap-[16px]">
            <label
              htmlFor={id || name}
              className="relative w-full h-[54px] flex items-center justify-between p-[13px_16px]! font-normal rounded-[12px] outline-0 bg-[#0C0C0C]"
            >
              <span className="w-full text-start text-white2 cursor-pointer text-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                {file && file instanceof FileList
                  ? file?.item(0)?.name
                  : file?.name
                  ? file?.name
                  : !disabled && !readOnly
                  ? 'Clique e selecione um arquivo'
                  : undefined}
              </span>
              <img
                width={30}
                height={30}
                src="/img/icons/clip.svg"
                alt="Arquivo"
              />

              <input
                type="file"
                id={id || name}
                disabled={disabled || readOnly}
                readOnly={readOnly}
                className={'hidden'}
                name={name}
                {...rest}
                ref={ref}
              />
            </label>
            {readOnly && fileLink && (
              <div className="flex items-center gap-[8px]">
                {typeFileVerify && (
                  <button
                    className="w-[30px] h-[30px]"
                    type="button"
                    onClick={e => setSelectedImage(fileLink)}
                  >
                    <img
                      width={30}
                      height={30}
                      src="/img/icons/eye_white.svg"
                      alt="Arquivo"
                    />
                  </button>
                )}

                <button
                  className="w-[30px] h-[30px]"
                  onClick={e =>
                    file instanceof FileList || file === undefined
                      ? undefined
                      : DocDownload({
                          event: e,
                          pathDoc: file?.url?.replace('/', '') as string,
                        })
                  }
                >
                  <img
                    width={30}
                    height={30}
                    src="/img/icons/download.svg"
                    alt="Arquivo"
                  />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {error && (
        <span className="text-[10px] text-warning font-normal">{error}</span>
      )}
    </div>
  );
};

export default forwardRef(InputFile);
