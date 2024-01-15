'use client';

import React, { useEffect, useState, useRef } from 'react';
import HypothesisBox from './HypothesisBox';
import InsightsBox from './InsightsBox';

function ToggleButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Function to close the sidebar if the window size is larger than the medium breakpoint
  const handleResize = () => {
    const mdBreakpoint = 768; // Define the medium breakpoint (in pixels)
    if (window.innerWidth >= mdBreakpoint && isOpen) {
      setIsOpen(false); // Close the sidebar
    }
  };

  // Add event listener for window resize
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Initial check and set state based on current window size
    handleResize();

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);
  return (
    <div className="md:hidden text-center">
      <button onClick={toggleDropdown} className="text-white font-medium rounded-lg text-sm" type="button" aria-label="toggle dropdown button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>

      </button>

      <div id="drawer-navigation" className={`${isOpen ? 'translate-x-0' : 'translate-x-full'} fixed top-0 right-0 z-40 w-full h-screen p-4 overflow-y-auto transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800`} tabIndex="-1" aria-labelledby="drawer-navigation-label">
        <button onClick={toggleDropdown} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 left-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <HypothesisBox />
            </li>
            <li>
              <InsightsBox />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ToggleButton;
