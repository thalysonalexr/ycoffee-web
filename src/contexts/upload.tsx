import React, { useContext, createContext, useState, useEffect } from 'react';
import filesize from 'filesize';

import { uploadCoffeeImage, uploadUserAvatar } from '../services/api-core';
import { UserModel } from '../types/domain/User';
import { CoffeeModel } from '../types/domain/Coffee';

interface UploadedFile {
  file: File;
  name: string;
  readableSize: string;
  preview: string;
  progress: number;
  uploaded: boolean;
  error: boolean;
  url: string | null | undefined;
}

interface Upload {
  uploadedFile: UploadedFile | null;
  handleUpload: (files: File[]) => void;
  processUploadUser: (file: File) => void;
  processUploadCoffee: (id: string, file: File) => void;
  cleanupUploadFile: () => void;
}

const UploadContext = createContext({} as Upload);

export const UploadProvider: React.FC = ({ children }) => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(uploadedFile?.preview as string);
    };
  }, [uploadedFile]);

  function handleUpload(files: File[]) {
    const [file] = files;

    setUploadedFile({
      file,
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    });
  }

  function processUploadUser(file: File) {
    const data = new FormData();

    data.append('image', file, file.name);

    uploadUserAvatar<{ user: UserModel }>(data, (progress) => {
      setUploadedFile({ ...(uploadedFile as UploadedFile), progress });
    })
      .then((response) => {
        const { user } = response.data;

        setUploadedFile({
          ...(uploadedFile as UploadedFile),
          uploaded: true,
          url: `${process.env.REACT_APP_API}/files/${user.avatar?.key}`,
        });
      })
      .catch(() => {
        setUploadedFile({
          ...(uploadedFile as UploadedFile),
          error: true,
        });
      });
  }

  function processUploadCoffee(id: string, file: File) {
    const data = new FormData();

    data.append('image', file, file.name);

    uploadCoffeeImage<{ coffee: CoffeeModel }>(id, data, (progress) => {
      setUploadedFile({ ...(uploadedFile as UploadedFile), progress });
    })
      .then((response) => {
        const { coffee } = response.data;

        setUploadedFile({
          ...(uploadedFile as UploadedFile),
          uploaded: true,
          url: `${process.env.REACT_APP_API}/files/${coffee.image?.key}`,
        });
      })
      .catch(() => {
        setUploadedFile({
          ...(uploadedFile as UploadedFile),
          error: true,
        });
      });
  }

  function cleanupUploadFile() {
    setUploadedFile(null);
  }

  return (
    <UploadContext.Provider
      value={{
        uploadedFile,
        handleUpload,
        processUploadUser,
        processUploadCoffee,
        cleanupUploadFile,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => useContext(UploadContext);
