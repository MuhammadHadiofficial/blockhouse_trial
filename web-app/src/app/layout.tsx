import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/ui/themes";
import { Toaster } from 'sonner'
import ReactQueryProvider from '@/react-query';

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Coinbase',
  description: 'Track your cryptocurrency portfolio and get alerts when prices change.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en">
        <body className={`${manrope.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange

          >
          <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
  )
}