// Loader.tsx
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <ClipLoader size={100} color={"#123abc"} loading={true} />
    </div>
  );
};

export default Loader;
