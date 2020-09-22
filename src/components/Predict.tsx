import React, { useMemo, useEffect } from 'react';
import axios from 'axios';

type Props = {
  file: File;
};
type Data = {
  probability: number;
  prediction: string;
  error: string;
};

const Predict: React.FC<Props> = ({ file }) => {
  const [data, setData] = React.useState<Data | null>(null);

  const predict = (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    axios
      .post('/api/predict', formData)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally();
  };

  useEffect(() => {
    predict(file);
  }, [file]);

  const memo = useMemo(
    () =>
      data === null ? (
        <></>
      ) : data.error === '' ? (
        <>
          <div>クラス:{data.prediction}</div>
          <div>確率:{data.probability.toFixed(2)}%</div>
        </>
      ) : (
        <div>Error:{data.error}</div>
      ),
    [data]
  );

  return <>{memo}</>;
};

export default Predict;
