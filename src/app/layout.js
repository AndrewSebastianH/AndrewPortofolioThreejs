import { Inter } from 'next/font/google'
import './global.sass'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Andrew's Portofolio",
  description: "Andrew Sebastian Hardianta's self made portofolio",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-metropolis`}>{children}</body>
    </html>
  )
}
