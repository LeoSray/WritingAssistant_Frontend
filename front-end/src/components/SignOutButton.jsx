'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button className="absolute bottom-0 flex items-center w-full mb-3 text-base text-white transition duration-75 rounded-lg group hover:bg-gray-800 dark:text-white dark:hover:bg-gray-700" type="button" onClick={() => signOut()}>
      <a href="#" className="flex items-center p-4 mx-5 rounded-lg group">
        <svg className="flex-shrink-0 w-6 h-6 transition duration-75"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
        <span className='ms-6 flex-1 whitespace-nowrap font-medium'>Sign Out</span>
      </a>   
    </button>
  );
}