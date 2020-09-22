import React, { useMemo, useEffect } from 'react';

type Props = {
  file: File;
};

const RenderImage: React.FC<Props> = ({ file }) => {
  useEffect(() => {
    const img = document.getElementById('myImage');
    if (img != null) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string')
          img.setAttribute('src', reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  const memo = useMemo(() => <img id='myImage' alt={file.name} />, [file]);

  return memo;
};

export default RenderImage;
