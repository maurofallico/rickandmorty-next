import SearchBar from '../components/SearchBar/SearchBar.jsx'

export default function About({characters}) {
    return (
        <>
        <div className="bg-cyan-600 h-12 flex justify-center items-center gap-32 py-8">
            <SearchBar characters={characters} />
        </div>
        <div className="flex justify-center mt-8 text-white text-6xl">
        <p className="">ABOUT</p>
        </div>
        </>
    )
}