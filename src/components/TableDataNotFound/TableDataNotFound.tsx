import React from 'react';

interface Props {
  image: string;
  message: string;
  description: string;
  button?: IButton;
}

interface IButton {
  text: string;
  onClick: () => void;
}

const TableDataNotFound = ({ image, message, description, button }: Props) => {
  return (
    <div className="w-full min-h-[33.8125rem] flex items-center justify-center flex-col gap-[24px] m-auto! bg-white2">
      <img width={80} height={80} src={image} alt="Ícone da tabela" />
      <div className="flex flex-col gap-[16px]">
        <p
          className={`text-center text-neutral2 text-[18px] font-bold`}
        >
          {message}
        </p>
        <p className="text-center text-[16px] text-neutral2 font-normal">
          {description}
        </p>
      </div>
      {button && (
        <button type="button" onClick={button.onClick}>
          {button.text}
        </button>
      )}
    </div>
  );
};

export default TableDataNotFound;
