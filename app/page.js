'use client'

import { useEffect, useState } from "react";
import SearchBar from './components/SearchBar/SearchBar'
import Cards from './components/Cards/Cards.jsx'
import axios from "axios";

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1)

  const addFav = async (id) => {
    try {
      // Actualiza localmente el estado de fav
      setCharacters((prevCharacters) =>
        prevCharacters.map((char) =>
          char.id === id ? { ...char, fav: true } : char
        )
      );

      // Realiza la solicitud al backend
      const response = await axios.put(`/api/characters`, {
        id,
        fav: true,
      });
    } catch (error) {
      console.error('Error adding fav:', error);
    }
  };

  const removeFav = async (id) => {
    try {
      // Actualiza localmente el estado de fav
      setCharacters((prevCharacters) =>
        prevCharacters.map((char) =>
          char.id === id ? { ...char, fav: false } : char
        )
      );

      // Realiza la solicitud al backend
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
        const response = await axios.get(`/api/characters?page=${page}`);
        setCharacters(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <>
    <div className="bg-cyan-600 h-12 flex justify-center items-center gap-32 py-8">
            <SearchBar />
    </div>
    <Cards characters={characters} addFav={addFav} removeFav={removeFav} />
    </>
  )
}
