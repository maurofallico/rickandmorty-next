"use client";

import Cards from "../components/Cards/Cards.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Detail from "../components/Detail/Detail.jsx"

export default function Favorites() {
  const [characters, setCharacters] = useState([]);
  const [charPage, setCharPage] = useState([]);
  const [gender, setGender] = useState('all');
  const [loading, setLoading] = useState(true)
  const [cardId, setCardId] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [favs, setFavs] = useState([]);
 


  const removeFav = async (id) => {
    try {
      await axios.put(`/api/characters`, {
        id,
        fav: false,
      });
      await cargarDatos();
    } catch (error) {
      console.error("Error removing fav:", error);
    }
  };

  const cargarDatos = async () => {
    try {
      const response = await axios.get(`/api/favorites`);
      const responseData = response.data;
      setCharacters(responseData);
      setFavs(responseData.map((char) => char.id));
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const filtrarDatos = async () => {
    try {
      const response = await axios.get(`/api/favorites?gender=${gender}`);
      const responseData = response.data;
      setCharPage(responseData);
      if (response) setLoading(false)
    } catch (error) {
      console.error("Error filtering data:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []); 

  useEffect(() => {
    filtrarDatos();
  }, [gender, characters]); 

  return (
    <>
      <div className="bg-cyan-600 h-12 flex justify-center items-center gap-32 py-8">
        <div className="flex gap-4">
          <span className="underline font-bold">Gender:</span>
          <select onChange={(e) => setGender(e.target.value)} value={gender} className="">
            <option value="all">All</option>
            {Array.from(new Set(characters?.map((char) => char.gender))).map((gender, index) => (
              <option key={index}>{gender}</option>
            ))}
          </select>
        </div>
      </div>
      {!loading? (<Cards favs={favs} isOpen={isOpen} setIsOpen={setIsOpen} cardId={cardId} setCardId={setCardId} charPage={charPage} characters={characters} removeFav={removeFav} /> ):
      (<div className="text-5xl text-gray-50 flex flex-col items-center justify-center gap-24 py-12">
      <span className="text-cyan-600 w-[80px] sm:w-[120px] loading loading-spinner "></span>
      </div>)}
      {isOpen? (<Detail cardId={cardId} setIsOpen={setIsOpen} />) : (null)}
    </>
  );
}