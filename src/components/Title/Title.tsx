import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Title = ({ children }: Props) => {
  return <h1 className="text-[40px] text-normal text-secondary">{children}</h1>;
};

export default Title;
