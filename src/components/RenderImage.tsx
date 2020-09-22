import React, { useEffect } from 'react';

type Props = {
  file: File;
};

const RenderImage: React.FC<Props> = ({ file }) => {
  useEffect(() => {
    const img = document.getElementById('myImage');
    if (img != null) {
      const reader = new FileReader();
      reader.onload = function () {
        if (typeof reader.result === 'string')
          img.setAttribute('src', reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div>
      <img id='myImage' alt={file.name} />
    </div>
  );
};

export default RenderImage;
