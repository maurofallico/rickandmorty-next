'use client'

import SearchBar from './components/SearchBar/SearchBar'
import Cards from './components/Cards/Cards.jsx'

export default function Home() {

  return (
    <>
    <div className="bg-cyan-600 h-12 flex justify-center items-center gap-32 py-8">
            <SearchBar />
    </div>
    /* <Cards /> */
    </>
  )
}
