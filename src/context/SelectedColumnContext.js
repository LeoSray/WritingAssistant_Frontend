'use client';

import React, { useState } from 'react';

export const SelectedColumnContext = React.createContext({
  selectedColumn: '',
  setSelectedColumn: () => {},
});

export function SelectedColumnProvider({ children }) {
  const [selectedColumn, setSelectedColumn] = useState('');
  return (
    <SelectedColumnContext.Provider value={{ selectedColumn, setSelectedColumn }}>
      {children}
    </SelectedColumnContext.Provider>
  );
}
