"use client";
import React from "react";
import { useState } from "react";

export const UploadDataContext = React.createContext({
    uploadData: '',
    updateUploadData: () => {}
});
  
export const UploadDataProvider  = ({ children }) => {
    const [uploadData, setUploadData] = useState(null);

    const updateUploadData = (data) => {
        setUploadData(data);
    };

    return (
    <UploadDataContext.Provider value={{ uploadData, updateUploadData }}>
        {children}
    </UploadDataContext.Provider>
    );
};