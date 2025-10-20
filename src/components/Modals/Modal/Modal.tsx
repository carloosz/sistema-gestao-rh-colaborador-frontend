import React from 'react';

interface Props {
  maxwidth?: string;
  message1?: string;
  message2?: string;
  buttons: IButton[];
}

interface IButton {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: () => void;
}

const Modal = ({
  maxwidth = 'max-w-[32.5625rem]',
  message1,
  message2,
  buttons,
}: Props) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,.8)] z-[999]">
      <div
        className={`rounded-[12px] shadow-[0px_0px_10px_0px_rgba(0, 0, 0, 0.25)] ${maxwidth} w-full py-[15px]! px-[35px]! bg-primary flex flex-col items-center justify-center`}
      >
        {message1 && (
          <p className="text-[40px] font-normal text-secondary mb-[88px]!">
            {message1}
          </p>
        )}
        {message2 && (
          <p className="text-[32px] font-normal text-white mb-[61px]!">
            {message2}
          </p>
        )}

        <div className="w-full flex gap-[16px] items-center justify-center">
          {buttons.map((button, index) => (
            <button
              key={index}
              type={button.type || 'button'}
              onClick={button.onClick}
              className={`rounded-[10px] flex items-center justify-center h-[59px] border-1 bg-secondary px-[70px]! py-[15px]! font-normal text-[24px] text-primary2`}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
