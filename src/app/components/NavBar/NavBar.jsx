import Link from 'next/link'
import SearchBar from '../SearchBar/SearchBar'

export default function NavBar (){
    return (
        <>
        <div className="bg-cyan-600 h-16 flex justify-center items-center gap-32">
            <Link href="/" className='bg-white rounded-md px-2 py-1 hover:bg-gray-200'>Home</Link>
            <Link href="/" className='bg-white rounded-md px-2 py-1 hover:bg-gray-200'>Favorites</Link>
            <Link href="/" className='bg-white rounded-md px-2 py-1 hover:bg-gray-200'>About</Link>
        </div>
        <div className="bg-cyan-600 h-12 flex justify-center items-center gap-32 py-8">
            <SearchBar />
        </div>
        </>
    )
}