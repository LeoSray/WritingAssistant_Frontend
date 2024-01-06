import { Inter } from 'next/font/google'
import { ThemeProvider } from '../theme-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { AuthProvider } from "../../Providers";
import { UploadDataProvider } from "../../../context/UploadDataContext"
import '../../globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Data Driven Stories',
  description: '',
}

export default async function RootLayout({ children }) {
  // const session = await getServerSession(authOptions);
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider  attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
