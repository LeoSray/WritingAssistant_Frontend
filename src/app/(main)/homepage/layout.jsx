import React from 'react';
import { ThemeProvider } from '../theme-provider';
import { AuthProvider } from '../../Providers';
import '../../globals.css';

export const metadata = {
  title: 'Data Driven Stories',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
