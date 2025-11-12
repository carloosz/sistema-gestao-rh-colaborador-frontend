import React from 'react';
import './styles.css';

const Loading = () => {
  return (
    <div className="flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 w-full -h-full bg-[rgba(0,0,0,.6)] z-[999]">
      <div className="loader" />
    </div>
  );
};

export default Loading;
