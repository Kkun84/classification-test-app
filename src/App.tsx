import React from 'react';
import FileInput from './components/FileInput';
import Predict from './components/Predict';
import RenderImage from './components/RenderImage';
import './App.css';

const App: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);

  return (
    <div>
      <FileInput setFile={setFile} />
      {file ? <Predict file={file} /> : <div></div>}
      {file ? <RenderImage file={file} /> : <div></div>}
    </div>
  );
};

export default App;
