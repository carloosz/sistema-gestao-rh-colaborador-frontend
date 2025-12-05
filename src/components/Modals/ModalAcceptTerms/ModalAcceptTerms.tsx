import TermsForm from '@/components/Forms/TermsForm/TermsForm';
import { useTerms } from '@/services/requests/terms/getTerms';
import React from 'react';

interface Props {
  onClose: () => void;
}

const ModalAcceptTerms = ({ onClose }: Props) => {
  const { data } = useTerms();

  if (!data) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,.8)] z-[999]">
      <div
        className={`rounded-[12px] shadow-[0px_0px_10px_0px_rgba(0, 0, 0, 0.25)] max-w-[784px] w-full max-h-[calc(100dvh-15px)]  pl-[51px]! pr-[10px]! pt-[34px]! pb-[18px]! bg-primary flex flex-col items-center justify-center`}
      >
        <div className='w-full overflow-y-auto pr-[41px]!'>
          <TermsForm
            formData={{
              terms_of_use: data?.terms,
              privacy_policies: data?.policy,
              accept_terms: false,
            }}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalAcceptTerms;
