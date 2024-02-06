import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import NavBar from './components/NavBar/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rick & Morty',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <div className='fixed [zIndex:-1]'>
    <img src="rickandmorty-background.jpg" width={1920} height={1080}
     loading='lazy' alt='background-image' className='w-screen h-screen object-cover' />
    </div>
      <NavBar />
      {children}
      </body>
    </html>
  )
}
