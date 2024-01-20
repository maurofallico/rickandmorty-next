'use client'

import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { useEffect, useState } from "react";
import SearchBar from './components/SearchBar/SearchBar'
import Cards from './components/Cards/Cards.jsx'
import axios from "axios";

export default function Home(){
  const [characters, setCharacters] = useState([]);
  const [charPage, setCharPage] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

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
        if (characters.length===0){
          const response = await axios.get(`/api/characters`);
          setCharacters(response.data);
        }   
    } catch (error) {
      console.log(error)
    }
  }

  function paginarDatos(){
    if (characters.length === 0){
      setMaxPage(1)
    } 
    else{
      setMaxPage(Math.ceil(characters.length / 14))
    }
    setCharPage(characters?.slice((page-1)*14, 14*page))
    }

 /*  useEffect(() => {
    characters.sort((a, b) => a.id - b.id);
  }, []); */

  useEffect(() => {
    cargarDatos();
    }, []);

  useEffect(() => {
    paginarDatos();
  }, [characters, page]);


  function nextPage() {
     if (page !== maxPage) setPage(page + 1);
  }

  function prevPage() {
    if (page !== 1) setPage(page - 1);
  }
  

  return (
    <>
    <div className="bg-cyan-600 h-12 flex justify-center items-center gap-32 py-8">
            <SearchBar characters={characters}/>
    </div>
    <Cards charPage={charPage} addFav={addFav} removeFav={removeFav} />
    <div className="flex flex-row items-center justify-center mt-12 gap-6 text-2xl">
          <button
            className="bg-white rounded-xl p-3 hover:bg-gray-200"
            onClick={prevPage}
          >
            <AiOutlineArrowLeft />
          </button>
          <p className="bg-cyan-600 px-4 p-2 rounded-xl">PAGE:{page}/{maxPage}</p>
          <button
            className="bg-white rounded-xl p-3 hover:bg-gray-200"
            onClick={nextPage}
          >
            <AiOutlineArrowRight />
          </button>

      </div>
    </>
  )
}
