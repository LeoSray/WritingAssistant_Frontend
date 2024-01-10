'use client';

import React, { useState } from 'react';

export const InsightsDataContext = React.createContext({
  insightsData: '',
  updateInsightsData: () => {},
});

export function InsightsDataProvider({ children }) {
  const [insightsData, setInsightsData] = useState([]);

  const updateInsightsData = (status) => {
    setInsightsData(status);
  };

  return (
    <InsightsDataContext.Provider value={{ insightsData, updateInsightsData }}>
      {children}
    </InsightsDataContext.Provider>
  );
}
