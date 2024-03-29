import NavLink from 'next/link'


export default function NavBar (){
    return (
        <>
        <div className="bg-cyan-600 h-16 flex justify-center items-center gap-16 sm:gap-32 text-black">
            <NavLink href="/" className='bg-white rounded-md px-2 py-1 hover:bg-gray-200'>Home</NavLink>
            <NavLink href="/favorites" className='bg-white rounded-md px-2 py-1 hover:bg-gray-200'>Favorites</NavLink>
        </div>
        </>
    )
}