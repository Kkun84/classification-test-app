import React from 'react';

type Props = {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

const FileInput: React.FC<Props> = ({ setFile }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  return (
    <div>
      <input type='file' onChange={handleInputChange} accept='image/*' />
    </div>
  );
};

export default FileInput;
