import React from 'react';

interface Props {
  maxwidth?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
const ModalLogout = ({
  maxwidth = 'max-w-[29.375rem]',
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,.8)] z-[999]">
      <div
        className={`rounded-[10px] shadow-[0px_0px_10px_0px_rgba(0, 0, 0, 0.25)] ${maxwidth} w-full p-[30px]! bg-primary flex flex-col items-center justify-center`}
      >
        <span className="block text-[40px] text-secondary mb-[39px]!">
          Deseja sair?
        </span>
        <img
          width={68}
          height={68}
          className="mb-[59px]!"
          src="/img/menu/logout.svg"
          alt="Logout"
        />
        <div className="w-full flex items-center gap-[16px]">
          <button
            onClick={onCancel}
            type="button"
            className="w-full h-[59px] bg-primary2 text-white rounded-[10px] text-[24px] font-normal"
          >
            Não
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="w-full h-[59px] bg-secondary text-primary2 rounded-[10px] text-[24px] font-normal"
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalLogout;
