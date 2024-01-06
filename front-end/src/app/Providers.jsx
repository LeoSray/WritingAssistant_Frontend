'use client';

import { SessionProvider } from 'next-auth/react';

export const AuthProvider = ({children}) => {
// export const AuthProvider = ({ children }: AuthContextProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};