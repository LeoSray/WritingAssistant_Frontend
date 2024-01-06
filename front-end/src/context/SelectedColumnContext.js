'use client';
import React from "react";
import { useState } from "react";


export const SelectedColumnContext = React.createContext({
    selectedColumn: '',
    setSelectedColumn: () => {}
});

export const SelectedColumnProvider = ({ children }) => {
    const [selectedColumn, setSelectedColumn] = useState('');
    return (
      <SelectedColumnContext.Provider value={{ selectedColumn, setSelectedColumn }}>
        {children}
      </SelectedColumnContext.Provider>
    );
};
