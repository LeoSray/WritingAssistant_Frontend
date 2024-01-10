'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { signOut } from 'next-auth/react';
import { HomeIcon, SettingIcon, ProfileIcon } from './Icons';

export default function HomeSideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(); // Create a ref for the sidebar

  // Function to toggle the sideNav state
  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Function to close the sidebar if a click is detected outside of it
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false); // Close the sidebar
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]); // Only re-run if isOpen changes

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="absolute top-0 left-0 lg:hidden items-center p-2 ms-1 text-sm hover:bg-gray-200 rounded-lg"
        type="button"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-7 h-7" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
        </svg>
      </button>
      <aside ref={sidebarRef} className={`relative z-40 h-screen w-full transition-transform ${isOpen ? 'translate-x-0 w-[300px]' : '-translate-x-full'} lg:translate-x-0`} aria-label="Sidebar">

        <div className="flex h-full flex-col overflow-y-auto bg-black py-4">
          <span
            onClick={toggleSidebar}
            className="text-white absolute right-0 pr-3 lg:hidden"
            role="button"
            tabIndex="0"
            aria-label="Toggle Sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </span>

          <div className="flex flex-row justify-center items-center mb-9 mt-7">
            <a href="/homepage" className="flex">
              <Image
                src={"/logo.png"}
                width={180}
                height={71}
                alt="Journey AI logo"
                className="flex w-full"
              />
            </a>
            <span className="flex w-full mr-3 text-xl font-bold text-white dark:text-white">Journey AI</span>

          </div>

          <ul className="flex flex-col space-y-3 font-medium overflow-hidden">
            <li>
              <div className="flex justify-center items-center flex-col md:flex-col w-full group p-4 mx-5 space-y-3">
                <span className="block text-md md:text-lg font-bold text-white dark:text-white">Welcome, Talha!</span>
                <span className="block text-sm md:text-md text-white dark:text-white">Talha@journeyAI.com</span>

              </div>
            </li>

            <li>
              <button
                className="flex w-full items-center text-white group hover:text-violet-200 hover:bg-[#3A3958] rounded-lg"
                type="button"
              >
                <a href="/homepage" className="group mx-5 flex items-center p-4 hover:bg-[#3A3958]">
                  <HomeIcon />
                  <span className="ms-3">Home</span>
                </a>
              </button>
            </li>
            <li>
              <button
                className="flex w-full items-center text-white group hover:text-violet-200 hover:bg-[#3A3958] rounded-lg"
                type="button"
              >
                <a href="/Settings" className="group mx-5 flex items-center rounded-lg p-4 hover:bg-[#3A3958]">
                  <SettingIcon />
                  <span className="ms-3 flex-1 whitespace-nowrap">Account Settings</span>
                </a>
              </button>
            </li>
            <li>
              <button
                className="flex w-full items-center text-white group hover:text-violet-200 hover:bg-[#3A3958] rounded-lg"
                type="button"
              >
                <a href="/profile" className="group mx-5 flex items-center rounded-lg p-4 hover:bg-[#3A3958]">
                  <ProfileIcon />
                  <span className="ms-3 flex-1 whitespace-nowrap">Profile</span>
                </a>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full mb-8 text-base text-white group hover:text-violet-200 transition duration-75 hover:bg-[#3A3958] rounded-lg  dark:text-white dark:hover:bg-gray-700" type="button" onClick={() => signOut()}>
                <div href="#" className="flex items-center p-4 mx-5 rounded-lg group">
                  <svg className="flex-shrink-0 w-6 h-6 transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                  <div
                    role="button"
                    tabIndex="0"
                    className="ms-3 flex-1 whitespace-nowrap font-medium"
                    onClick={() => signOut}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        signOut();
                      }
                    }}
                  >
                    Sign Out
                  </div>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
