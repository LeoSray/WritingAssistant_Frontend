'use client';

import React, { useState } from 'react';

export const HypothesisDataContext = React.createContext({
  hasHypothesisData: '',
  setHasHypothesisData: () => {},
});

export function HypothesisDataProvider({ children }) {
  const [hasHypothesisData, setHasHypothesisData] = useState(false);

  const updateHypothesisData = (status) => {
    setHasHypothesisData(status);
  };

  return (
    <HypothesisDataContext.Provider value={{ hasHypothesisData, updateHypothesisData }}>
      {children}
    </HypothesisDataContext.Provider>
  );
}
