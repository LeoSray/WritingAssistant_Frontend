'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

export function AuthProvider({ children }) {
// export const AuthProvider = ({ children }: AuthContextProps) => {
  return <SessionProvider>{children}</SessionProvider>;
}
