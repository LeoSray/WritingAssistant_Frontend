import { Inter } from 'next/font/google'
import { ThemeProvider } from '../theme-provider'
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { AuthProvider } from "../../Providers";
import {SelectedColumnProvider} from "../../../context/SelectedColumnContext";
import {HypothesisDataProvider} from "../../../context/HypothesisDataContext"
import {InsightsDataProvider} from '../../../context/InsightsDataContext';
import '../../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Data Driven Stories',
  description: '',
}
export default async function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider  attribute="class" defaultTheme="light" enableSystem>
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
