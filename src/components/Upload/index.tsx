import React from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

import { useUpload } from '../../contexts/upload';

import 'react-circular-progressbar/dist/styles.css';

import upload from '../../assets/icons/upload.svg';

import './styles.css';

const Upload: React.FC = () => {
  const { handleUpload } = useUpload();

  function renderMessage(isDragActive: boolean, isDragReject: boolean) {
    if (!isDragActive) return <span>Arraste arquivos aqui</span>;

    if (isDragReject) return <span>Arquivo não suportado</span>;

    return <span>Solte os arquivos aqui</span>;
  }

  return (
    <Dropzone
      maxSize={2097152}
      multiple={false}
      accept="image/jpeg, image/pjpeg, image/png, image/gif"
      onDropAccepted={handleUpload}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
        const classDropzone = classNames({
          'wrapper upload normal': true,
          'wrapper upload active': isDragActive,
          'wrapper upload reject': isDragReject,
        });

        return (
          <div
            className={classDropzone}
            title="Enviar imagem da receita"
            {...getRootProps()}
          >
            {renderMessage(isDragActive, isDragReject)}
            <img src={upload} alt="Icone de upload de imagem" />
            <input {...getInputProps()} />
          </div>
        );
      }}
    </Dropzone>
  );
};

export default Upload;
