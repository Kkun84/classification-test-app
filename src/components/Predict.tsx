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
    setData(null);
    const formData = new FormData();
    formData.append('image', file);
    axios
      .post('https://pytorch-flask-test.herokuapp.com/predict', formData)
      .then((response) => {
        setData({ ...response.data, error: '' });
      })
      .catch((error) => {
        console.error(error);
        setData({ probability: 0, prediction: '', error: 'Network error.' });
      })
      .finally();
  };

  useEffect(() => {
    predict(file);
  }, [file]);

  const memo = useMemo(
    () =>
      data == null ? (
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
