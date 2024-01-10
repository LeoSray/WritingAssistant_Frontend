'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="border border-gray-700 rounded-2xl h-10 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {theme === 'light' ? (
          <SunIcon className="h-6 w-11  cursor-pointer stroke-1 text-cyan-400" aria-hidden="true" /> // Sun icon
        ) : (
          <MoonIcon className="h-6 w-11  cursor-pointer stroke-1" aria-hidden="true" /> // Moon icon
        )}
      </button>
    </div>
  );
}

export default ThemeSwitcher;
