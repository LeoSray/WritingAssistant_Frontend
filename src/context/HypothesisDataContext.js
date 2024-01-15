/* eslint-disable no-sequences */
/* eslint-disable max-len */

'use client';

import React, { useState } from 'react';

export const HypothesisDataContext = React.createContext({
  hasHypothesisData: '',
  setHasHypothesisData: () => {},
  hypothesisData: [],
  setHypothesisData: () => {},
});

export function HypothesisDataProvider({ children }) {
  const [hasHypothesisData, setHasHypothesisData] = useState(false);
  const [hypothesisData, setHypothesisData] = useState([]);

  const updateHypothesisData = (status) => {
    setHasHypothesisData(status);
  };

  return (
    <HypothesisDataContext.Provider value={
      {
        hasHypothesisData, hypothesisData, updateHypothesisData, setHypothesisData,
      }
}
    >
      {children}
    </HypothesisDataContext.Provider>
  );
}
