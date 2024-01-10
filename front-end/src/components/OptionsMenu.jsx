'use client';

import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import { SelectedColumnContext } from '../context/SelectedColumnContext';

function OptionsMenu({ sessionId }) {
  // State to keep track of whether the dropdown is open
  const [isOpen, setIsOpen] = useState(false);
  const { selectedColumn, setSelectedColumn } = useContext(SelectedColumnContext);
  const [dataColumns, setDataColumns] = useState([]);
  const dropdownRef = useRef(null); // Ref for the dropdown

  // Function to toggle the dropdown state
  const toggleDropdown = () => setIsOpen(!isOpen);

  const setValue = (column) => {
    setSelectedColumn(column);
    setIsOpen(false); // This will close the dropdown
  };
  //   const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  useEffect(() => {
    console.log('Updated selected: ', selectedColumn);
  }, [selectedColumn]);

  // Function to handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    // call API for all options in the dropdown menu
    // use the setValue function to set the selected column
    const getColumnNames = async () => {
      try {
        console.log('in columns ', sessionId);
        const response = await fetch('http://127.0.0.1:8080/get_column_names', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            session_id: sessionId,
          }),
        });
        const data = await response.json();

        // Check if the response is ok
        if (response.ok) {
          // Capitalize first letter of each element in the array
          const dataColumns = await data.column_names.map((column) => column);
          setDataColumns(dataColumns);
        } else {
          // Handle HTTP errors
          console.error('Failed to fetch:', data);
        }
      } catch (error) {
        // Handle network errors
        console.error('Network error:', error);
      }
    };
    getColumnNames();
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="relative focus:outline-none
                font-medium rounded-2xl px-5 py-2.5 border border-gray-700 text-center inline-flex items-center
                w-auto sm:min-w-[200px] md:min-w-[400px] md:text-md lg:min-w-[600px]
                text-black bg-white hover:bg-gray-100 dark:bg-[#030712] dark:text-gray-200 dark:hover:bg-gray-800"
      >
        Tell me about:
        <span className="pl-2 font-normal truncate max-w-[150px] sm:max-w-[300px] md:max-w-[150px] md:pr-0 lg:max-w-full">
          {selectedColumn}
        </span>
        <svg className="w-2.5 h-2.5 ms-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      <div className={`z-10 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition ease-in-out duration-300 absolute rounded-xl bg-white divide-y divide-gray-100 shadow w-full dark:bg-gray-800`}>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          {dataColumns.map((column, index) => (
            <li key={index}>
              <button type="button" onClick={() => setValue(column)} href="#" className="flex w-full justify-start px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">{column}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OptionsMenu;
