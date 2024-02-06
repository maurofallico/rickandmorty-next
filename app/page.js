'use client'
import { BiFirstPage } from "react-icons/bi"; 
import { MdNavigateBefore } from "react-icons/md"; 
import { MdNavigateNext } from "react-icons/md"; 
import { BiLastPage } from "react-icons/bi"; 

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
  const [input, setInput] = useState('')
  const [filtered, setFiltered] = useState([])
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

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
          const response = await axios.get(`/api/characters`);
          setCharacters(response.data);
          setFiltered(response.data)
          if (response) setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }


  function paginarDatos(){
    if (filtered.length === 0){
      setMaxPage(1)
    } 
    else{
      setMaxPage(Math.ceil(filtered.length / 14))
      
    }
      setCharPage(filtered.slice((page-1)*14, 14*page))
    }

  useEffect(() => {
    filtered.sort((a, b) => a.id - b.id);
  }, []);

  useEffect(() => {
    cargarDatos();
    }, [input]);

  useEffect(() => {
    paginarDatos();
  }, [filtered, page]);

  useEffect(() => {
    setPage(1)
  }, [filtered]);



  function nextPage() {
    if (page !== maxPage) setPage(page + 1);
  }

  function prevPage() {
    if (page !== 1) setPage(page - 1);
  }

  function lastPage() {
    setPage(maxPage);
  }

  function firstPage() {
    setPage(1);
  }
  

  return (
    <>
    
    <div className="bg-cyan-600 h-12 flex justify-center items-center gap-32 py-8">
    
            <SearchBar characters={characters} setFiltered={setFiltered} />
    </div>
    
    {windowWidth < 400? (<div className="flex text-black flex-row items-center justify-center mt-6 gap-2 text-lg">
    <button
            className="bg-white rounded-lg hover:bg-gray-200 w-9 h-9 flex items-center justify-center text-3xl"
            onClick={firstPage}
          >
            <BiFirstPage />
          </button>
          <button
            className="bg-white rounded-lg hover:bg-gray-200 w-9 h-9 flex items-center justify-center text-3xl"
            onClick={prevPage}
          >
            <MdNavigateBefore />
          </button>
          <p className="bg-cyan-600 px-4 pb-0.5 sm:w-[150px] h-9 flex justify-center items-center rounded-xl">PAGE:{page}/{maxPage}</p>
          <button
            className="bg-white rounded-lg hover:bg-gray-200 w-9 h-9 flex items-center justify-center text-3xl"
            onClick={nextPage}
          >
            <MdNavigateNext />
          </button>
          <button
            className="bg-white rounded-lg hover:bg-gray-200 w-9 h-9 flex items-center justify-center text-3xl"
            onClick={lastPage}
          >
            <BiLastPage />
          </button>

      </div>) : (null)}
    {!loading? (<Cards windowWidth={windowWidth} cardId={cardId} setCardId={setCardId} charPage={charPage} addFav={addFav} removeFav={removeFav} isOpen={isOpen} setIsOpen={setIsOpen} />)
    : (<div className="text-5xl text-gray-50 flex flex-col items-center justify-center gap-24 py-12">
    <span className="text-cyan-600 w-[80px] sm:w-[120px] loading loading-spinner "></span>
    </div>)}
    {isOpen? (<Detail cardId={cardId} setIsOpen={setIsOpen} />) : (null)}
    {!loading? (<div className="flex text-black flex-row items-center justify-center mb-4 mt-12 sm:gap-4 sm:text-2xl gap-2 text-lg">
    <button
            className="bg-white rounded-lg hover:bg-gray-200 w-9 h-9 flex items-center justify-center text-3xl"
            onClick={firstPage}
          >
            <BiFirstPage />
          </button>
          <button
            className="bg-white rounded-lg hover:bg-gray-200 w-9 h-9 flex items-center justify-center text-3xl"
            onClick={prevPage}
          >
            <MdNavigateBefore />
          </button>
          <p className="bg-cyan-600 px-4 pb-0.5 sm:w-[150px]  h-9 flex justify-center items-center rounded-xl">PAGE:{page}/{maxPage}</p>
          <button
            className="bg-white rounded-lg hover:bg-gray-200 w-9 h-9 flex items-center justify-center text-3xl"
            onClick={nextPage}
          >
            <MdNavigateNext />
          </button>
          <button
            className="bg-white rounded-lg hover:bg-gray-200 w-9 h-9 flex items-center justify-center text-3xl"
            onClick={lastPage}
          >
            <BiLastPage />
          </button>

      </div>) : (null)}
    </>
  )
}
