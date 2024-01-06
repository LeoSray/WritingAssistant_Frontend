'use client';
import React, {useState} from "react";
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { signOut } from 'next-auth/react';
import ThemeSwitcher from "./ThemeSwitcher";

const UserMenu = () => {
    const [isHidden, setIsHidden] = useState(true);

    const toggleVisibility = () => {
      setIsHidden(!isHidden);
    };
    
    const handleSignOut = async () => {
      console.log("SignOut");
      await signOut({ redirect: true, callbackUrl: '/login' });
      await fetch("https://journeyai.azurewebsites.net/signout");
  
    }
    return (
    <div className="relative">
        <button onClick={toggleVisibility} type="button" className="flex  mr-3 text-sm bg-gray-200 rounded-full md:mr-0 " id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <UserCircleIcon className='w-10 h-10 rounded-full bg-white'/>
        {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"/> */}
        </button>
        <div className={`right-0 ${isHidden ? 'hidden' : ''} absolute z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
        <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">User 1</span>
            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">user1@journey.com</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
            </li>
            <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
            </li>
            <li>
            <a href="#" onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
            </li>
            <li>
              <ThemeSwitcher/>
            </li>
        </ul>
        </div>
    </div>
    );
}

export default UserMenu;
