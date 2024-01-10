'use client';

import React, { useState, useEffect, useRef } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SignOutButton } from './SignOutButton';

function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(); // Create a ref for the sidebar
  const router = useRouter();
  // Function to toggle the dropdown state
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Function to close the sidebar if a click is detected outside of it
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false); // Close the sidebar
      }
    };

    // Add event listener when the component is mounted
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener when the component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]); // Only re-run if isOpen changes

  const handleSignOut = async () => {
    console.log('SignOut');
    await signOut({ redirect: true, callbackUrl: '/login' });
    await fetch('http://127.0.0.1:8080/signout');
  };

  return (
    <div>
      <button
        onClick={toggleDropdown}
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 ms-1 text-sm hover:text-bgLight hover:bg-gray-200 rounded-lg focus:outline-none dark:hover:bg-gray-700"
      >

        <span className="sr-only">Open sidebar</span>
        <svg className="w-7 h-7" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
        </svg>
      </button>

      <aside ref={sidebarRef} id="sidebar-multi-level-sidebar" className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} absolute top-0 left-0 z-40 w-[220px] h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar`}>
        <div className="relative h-screen flex-col overflow-y-auto py-4 bg-gray-50 dark:bg-gray-800">
          <ul className="flex flex-col justify-center space-y-3 font-medium">
            <li>
              <button className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700" type="button" onClick={() => signOut()}>
                <a href="/home" className="flex items-center p-4 mx-5 rounded-lg group">
                  <svg className="flex-shrink-0 w-6 h-6 transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                  <span className="ms-6 flex-1 whitespace-nowrap font-medium">Home</span>
                </a>
              </button>
            </li>
          </ul>
          <SignOutButton />
        </div>
      </aside>
    </div>
  );
}

export default SideNav;
