import Cards from '../components/Cards/Cards.jsx'

export default function Favorites({characters}) {

    return (
        <div className="flex flex-col items-center justify-center mt-8 text-6xl">
        <p className="text-white">FAVORITES</p>
            <Cards characters = {characters}/>
        </div>
    )
}