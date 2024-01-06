'use client';
import React from "react";
import { useState } from "react";


export const HypothesisDataContext = React.createContext({
  hasHypothesisData: '',
  setHasHypothesisData: () => {}
});

export const HypothesisDataProvider  = ({ children }) => {
    const [hasHypothesisData, setHasHypothesisData] = useState(false);

    const updateHypothesisData = (status) => {
        setHasHypothesisData(status);
    };

    return (
      <HypothesisDataContext.Provider value={{ hasHypothesisData, updateHypothesisData }}>
        {children}
      </HypothesisDataContext.Provider>
    );
};
