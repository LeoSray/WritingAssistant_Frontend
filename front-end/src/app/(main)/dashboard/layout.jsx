import React from 'react';
import { ThemeProvider } from '../theme-provider';
import { AuthProvider } from '../../Providers';
import { SelectedColumnProvider } from '../../../context/SelectedColumnContext';
import { HypothesisDataProvider } from '../../../context/HypothesisDataContext';
import { InsightsDataProvider } from '../../../context/InsightsDataContext';
import '../../globals.css';

export const metadata = {
  title: 'Data Driven Stories',
  description: '',
};

export default async function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <SelectedColumnProvider>
              <InsightsDataProvider>
                <HypothesisDataProvider>
                  {children}
                </HypothesisDataProvider>
              </InsightsDataProvider>
            </SelectedColumnProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
