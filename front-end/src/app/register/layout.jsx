import '../globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../(main)/theme-provider';
// import ToggleTheme from '../../components/ToggleTheme';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Data Driven Stories',
    description: '',
  }
  
  export default async function RootLayout({ children }) {
    return (
        <html suppressHydrationWarning>
            <body>
                <ThemeProvider  attribute="class" defaultTheme="system" enableSystem>
                {/* <ToggleTheme/> */}
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
