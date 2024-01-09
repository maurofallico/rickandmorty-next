import Image from 'next/image'
import background from '../../public/rickandmorty-background.jpg'

export default function Home() {
  return (
    <>
    <div className='fixed'>
    <Image src={background} width={1920} height={1080} priority={true} alt='background-image' objectFit='cover' className='w-screen' />
    </div>
    </>
  )
}
