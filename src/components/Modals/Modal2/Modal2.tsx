import React from 'react';

interface Props {
  maxwidth?: string;
  message: string;
  img: string;
  buttons: IButton[];
}

interface IButton {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: () => void;
}
const Modal2 = ({
  maxwidth = 'max-w-[29.375rem]',
  message,
  img,
  buttons,
}: Props) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,.8)] z-[999]">
      <div
        className={`rounded-[10px] shadow-[0px_0px_10px_0px_rgba(0, 0, 0, 0.25)] ${maxwidth} w-full p-[46px]! bg-primary flex flex-col items-center justify-center`}
      >
        <span className="block text-[40px] text-secondary mb-[39px]!">
          {message}
        </span>
        <img width={91} height={91} className="mb-[46px]!" src={img} alt="" />
        <div className="w-full flex items-center justify-center gap-[16px]">
          {buttons.map((button, index) => (
            <button
              key={index}
              type={button.type || 'button'}
              onClick={button.onClick}
              className={
                index === 1
                  ? `w-[201px] h-[59px] bg-primary2 text-white rounded-[10px] text-[24px] font-normal`
                  : 'w-[201px] h-[59px] bg-secondary text-primary2 rounded-[10px] text-[24px] font-normal'
              }
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal2;
