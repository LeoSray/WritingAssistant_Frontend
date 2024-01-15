'use client';

import React, { useState, useEffect, useContext } from 'react';
import { SelectedColumnContext } from '../context/SelectedColumnContext';
import ScatterPlot from './ScatterPlot';

function PopupModal({ isModalOpen, closeModal }) {
  const { selectedColumn } = useContext(SelectedColumnContext);
  const [visibility, setVisibility] = useState('hidden');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    let timeoutId;

    if (!isModalOpen) {
      timeoutId = setTimeout(() => {
        setVisibility('hidden');
      }, 300);
      setChartData(null);
    } else {
      setVisibility('visible');

      const getChartData = async (column_name) => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/get_data`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ column_name }),
          });
          const data = await response.json();

          // Check if the response is ok
          if (response.ok) {
            setChartData(data.data);
          } else {
            // Handle HTTP errors
            console.error('Failed to fetch chart data: ', data);
          }
        } catch (error) {
          // Handle network errors
          console.error('Network error:', error);
        }
      };
      getChartData(selectedColumn);
    }
    return () => clearTimeout(timeoutId);
  }, [isModalOpen, selectedColumn]);

  const modalBackgroundStyle = isModalOpen
    ? {
      visibility,
      opacity: 1,
      transform: 'scale(1)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
    }
    : {
      visibility,
      opacity: 0,
      transform: 'scale(0.95)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      pointerEvents: 'none',
    };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const getFieldMapping = () => {
    if (chartData && chartData.length > 0) {
      const keys = Object.keys(chartData[0]);
      return {
        xField: keys[0],
        yField: keys[1],
      };
    }
    return {};
  };

  return (
    <div
      role="button"
      id="popup-modal"
      tabIndex="-1"
      onClick={closeModal}
      style={modalBackgroundStyle}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-screen h-screen"
    >
      <div
        role="button"
        id="modalClick"
        tabIndex={0}
        className="relative p-4 w-max h-full max-w-[90vw] max-h-[90vh]"
        onClick={handleModalClick}
      >
        <div className="relative flex justify-center items-center bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-center items-center overflow-auto p-4 md:p-5">
            {chartData ? (
              <ScatterPlot chartData={chartData} {...getFieldMapping()} />
            ) : (
              <div>Loading chart data...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupModal;
