"use client"

import Cards from '../components/Cards/Cards.jsx'
import { useEffect, useState } from "react";
import axios from "axios";

export default function Favorites() {

    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1)
    
      const removeFav = async (id) => {
        try {
          const response = await axios.put(`/api/characters`, {
            id,
            fav: false,
          });
        } catch (error) {
          console.error('Error removing fav:', error);
        }
      };

      async function cargarDatos() {
        try {
            const response = await axios.get(`/api/favorites?page=${page}`);
            console.log("Favorites Response:" ,response.data)
            setCharacters(response.data);
        } catch (error) {
          console.log(error)
        }
      }
    
      useEffect(() => {
        cargarDatos();
      }, [removeFav]);


    return (
        <div className="flex flex-col items-center justify-center mt-8 text-6xl">
        <p className="text-white">FAVORITES</p>
        <Cards characters={characters} removeFav={removeFav} />
        </div>
    )
}