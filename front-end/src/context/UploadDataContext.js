'use client';

import React, { useState } from 'react';

export const UploadDataContext = React.createContext({
  uploadData: '',
  updateUploadData: () => {},
});

export function UploadDataProvider({ children }) {
  const [uploadData, setUploadData] = useState(null);

  const updateUploadData = (data) => {
    setUploadData(data);
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <UploadDataContext.Provider value={{ uploadData, updateUploadData }}>
      {children}
    </UploadDataContext.Provider>
  );
}
