'use client';
import Image from 'next/image';
import React, {useState} from 'react';
import { SignOutButton } from './SignOutButton';
import logo from '../../public/logo.png';
import { signOut } from 'next-auth/react';
import { HomeIcon, SettingIcon, ProfileIcon} from './Icons';

export default function HomeSideNav() {
  const [active, setActive] = useState('Dashboard');

  const handleActiveButton = (itemName) => {
    setActive(itemName);
  };

  return (
      <div>
        <aside id="default-sidebar" className="relative left-0 top-0 z-40 h-screen w-full -translate-x-full transition-transform sm:translate-x-0" aria-label="Sidebar">
          <div className="flex h-full flex-col overflow-y-auto bg-black py-4">
            <a href="" className="mb-9 mt-7 flex items-center">
              <Image
                src={logo}
                width={180}
                height={71}
                alt="Journey AI logo"
                className="flex shrink-0 px-6"
              />
              <span className="block text-xl font-bold text-white dark:text-white">Journey AI</span>
            </a>
            <ul className="flex flex-col justify-center space-y-3 font-medium overflow-hidden">
              <li>
                <div className="flex flex-col w-full group p-4 mx-5 items-center space-y-3">
                  <span className="block text-lg font-bold text-white dark:text-white">Welcome, Talha!</span>
                  <span className="block text-md text-white dark:text-white">Talha@journeyAI.com</span>
                </div>
              </li>
                
              <li>
                <button className="flex w-full items-center text-violet-200 group hover:text-white hover:bg-[#3A3958] rounded-lg">
                  <a href="#" className="group mx-5 flex items-center p-4 hover:bg-[#3A3958]">
                    <HomeIcon/>
                    <span className="ms-3">Home</span>
                  </a>
                </button>
              </li>
              <li>
                <button className="flex w-full items-center text-violet-200 group hover:text-white hover:bg-[#3A3958] rounded-lg">
                  <a href="#" className="group mx-5 flex items-center rounded-lg p-4 hover:bg-[#3A3958]">
                    <SettingIcon/>
                    <span className="ms-3 flex-1 whitespace-nowrap">Account Settings</span>
                  </a>
                </button>
              </li>
              <li>
                <button className="flex w-full items-center text-violet-200 group hover:text-white hover:bg-[#3A3958] rounded-lg">
                  <a href="#" className="group mx-5 flex items-center rounded-lg p-4 hover:bg-[#3A3958]">
                    <ProfileIcon/>
                    <span className="ms-3 flex-1 whitespace-nowrap">Profile</span>
                  </a>
                </button>
              </li>
              {/* <li> */}
                {/* <button className="flex w-full items-center text-violet-200 group hover:text-white hover:bg-[#3A3958] rounded-lg">
                  <a href="#" className="group mx-5 flex items-center rounded-lg p-4 hover:bg-[#3A3958]">
                    <svg className="h-5 w-5 shrink-0 text-violet-200 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z"/>
                      <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z"/>
                    </svg>
                    <span className="ms-3 flex-1 whitespace-nowrap">Wallet</span>
                  </a>
                </button> */}
              {/* </li> */}
              {/* <li> */}
                {/* <button className="flex w-full items-center text-violet-200 group hover:text-white hover:bg-[#3A3958] rounded-lg">
                  <a href="#" className="group mx-5 flex items-center rounded-lg p-4 hover:bg-[#3A3958]">
                    <svg className="h-5 w-5 shrink-0 text-violet-200 transition duration-75  group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                      <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                    </svg>
                    <span className="ms-3 flex-1 whitespace-nowrap">Transfers</span>
                  </a>
                </button> */}
              {/* </li> */}
            </ul>
            <button className="absolute bottom-0 flex items-center w-full mb-8 text-base text-violet-200 group hover:text-white transition duration-75 hover:bg-[#3A3958] rounded-lg  dark:text-white dark:hover:bg-gray-700" type="button" onClick={() => signOut()}>
              <a href="#" className="flex items-center p-4 mx-5 rounded-lg group">
                <svg className="flex-shrink-0 w-6 h-6 transition duration-75"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                <span className='ms-3 flex-1 whitespace-nowrap font-medium' onClick={() => signOut}>Sign Out</span>
              </a>   
            </button>
          </div>
        </aside>
      </div>
  );
}