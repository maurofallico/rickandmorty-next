import Image from 'next/image'
import background from '../../public/rickandmorty-background.jpg'
import NavBar from './components/NavBar/NavBar.jsx'

export default function Home() {
  return (
    <>
    <div className='fixed [zIndex:-1]'>
    <Image src={background} width={1920} height={1080} priority={true} alt='background-image' objectFit='cover' className='w-screen' />
    </div>
    <NavBar />
    </>
  )
}
