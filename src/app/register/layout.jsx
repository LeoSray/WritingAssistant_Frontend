import React from 'react';
import '../globals.css';
import { ThemeProvider } from '../(main)/theme-provider';

export const metadata = {
  title: 'Data Driven Stories',
  description: '',
};

export default async function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
