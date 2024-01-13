"use client"

import Cards from '../components/Cards/Cards.jsx'

export default function Favorites() {

    return (
        <div className="flex flex-col items-center justify-center mt-8 text-6xl">
        <p className="text-white">FAVORITES</p>
            <Cards />
        </div>
    )
}