'use client';

import React, { useEffect, useState } from 'react';
import { HomeIcon } from '@heroicons/react/24/solid';
import SideNav from './SideNav';
import DocumentTitle from './DocumentTitle';
import OptionsMenu from './OptionsMenu';
import ToggleButton from './ToggleButton';
import ThemeSwitcher from './ThemeSwitcher';

import '../app/globals.css';

function NavBar({ userId, sessionId }) {
  const [title, setTitle] = useState('');
  const [columns, setColumns] = useState({});

  useEffect(() => {
    // Function to update state based on localStorage data
    const updateFromLocalStorage = () => {
      const storedDataString = localStorage.getItem('dataSetInfo');
      if (storedDataString) {
        const storedData = JSON.parse(storedDataString);
        setTitle(storedData.title);
        setColumns(storedData.column_names);
      }
    };
    // Call once to initialize state
    updateFromLocalStorage();

    // Event listener for storage changes
    const handleStorageChange = (event) => {
      if (event.key === 'dataSetInfo') {
        updateFromLocalStorage();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    // Cleanup event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="bg-neutral-900 w-screen p-3">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row justify-content items-center align-center border border-gray-700 ml-2 pl-2 pr-2 rounded-2xl bg-white dark:bg-neutral-900">
          <a href="/homepage">
            <button type="button" className="p-2 rounded-lg hover:text-bgLight hover:bg-gray-200 dark:hover:bg-gray-700">
              <HomeIcon className="w-7 h-7" aria-label="Home" />
            </button>
          </a>
          <SideNav />
        </div>

        <div>
          <DocumentTitle title={title} />
        </div>

        {/* DropDown Menu */}
        <div className="flex justify-center lg:justify-end lg:pl-4 mr-3 w-full">
          <OptionsMenu columns={columns} sessionId={sessionId} />
        </div>

        <div className="md:hidden">
          <ToggleButton />
        </div>

        <div className="hidden md:col-span-2 md:flex md:justify-end flex-grow items-center w-full pl-3 pr-5">
          {/* <div className="hidden lg:flex flex-grow justify-end mx-6">
                        DateTime
                    </div> */}
          <div className="hidden lg:flex flex-grow justify-end">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
