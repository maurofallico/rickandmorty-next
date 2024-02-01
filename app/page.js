'use client'

import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { useEffect, useState } from "react";
import SearchBar from './components/SearchBar/SearchBar'
import Cards from './components/Cards/Cards.jsx'
import Detail from './components/Detail/Detail.jsx'
import axios from "axios";

export default function Home(){
  const [characters, setCharacters] = useState([]);
  const [charPage, setCharPage] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [cardId, setCardId] = useState('')
  const [loading, setLoading] = useState(true)

  const addFav = async (id) => {
      try {
        setCharacters((prevCharacters) =>
          prevCharacters.map((char) =>
            char.id === id ? { ...char, fav: true } : char
          )
        );
  
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
      setCharacters((prevCharacters) =>
        prevCharacters.map((char) =>
          char.id === id ? { ...char, fav: false } : char
        )
      );

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
          if (response) setLoading(false)
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
    setCharPage(characters.slice((page-1)*14, 14*page))
    }

  useEffect(() => {
    characters.sort((a, b) => a.id - b.id);
  }, []);

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
    
    {!loading? (<Cards cardId={cardId} setCardId={setCardId} charPage={charPage} addFav={addFav} removeFav={removeFav} isOpen={isOpen} setIsOpen={setIsOpen} />)
    : (<div className="text-5xl text-gray-50 flex flex-col items-center justify-center gap-24 py-12">
    <p>LOADING CHARACTERS...</p>
    <span className="text-cyan-600 w-[150px] loading loading-spinner "></span>
    </div>)}
    {isOpen? (<Detail cardId={cardId} setIsOpen={setIsOpen} />) : (null)}
    {!loading? (<div className="flex flex-row items-center justify-center mt-12 gap-6 text-2xl">
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

      </div>) : (null)}
    </>
  )
}
