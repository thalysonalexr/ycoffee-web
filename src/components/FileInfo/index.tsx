import React from 'react';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import { CircularProgressbar } from 'react-circular-progressbar';

import { useUpload } from '../../contexts/upload';

import './styles.css';

const FileInfo: React.FC = () => {
  const { uploadedFile } = useUpload();

  return (
    <>
      {!!uploadedFile && (
        <div className="upload-wrapper">
          <div>
            <div
              className="preview"
              style={{ backgroundImage: `url(${uploadedFile.preview})` }}
            />
            <div className="upload-info">
              <strong>{uploadedFile.name}</strong>
              <span>{uploadedFile.readableSize}</span>
            </div>
          </div>
          <div>
            {!uploadedFile.uploaded && !uploadedFile.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: '#087e8b' },
                }}
                strokeWidth={10}
                value={uploadedFile.progress}
              />
            )}
            {uploadedFile.url && (
              <a
                href={uploadedFile.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
              </a>
            )}
            {uploadedFile.uploaded && (
              <MdCheckCircle size={24} color="#087e8b" />
            )}
            {uploadedFile.error && <MdError size={24} color="#e71d36" />}
          </div>
        </div>
      )}
    </>
  );
};

export default FileInfo;
