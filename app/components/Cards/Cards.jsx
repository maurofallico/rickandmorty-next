"use client";
import { useEffect, useState } from "react";
import Image from 'next/image'
import axios from "axios";

export default function Cards() {

    const [characters, setCharacters] = useState([])

    async function cargarDatos() {
        const response = await axios.get("/api/characters");
        setCharacters(response.data)
      }

  useEffect(() => {
    cargarDatos();
  }, []);

 

  return (
    <>
      <div className="flex flex-wrap items-center justify-center mt-20 gap-10 ">
      {characters.map(({id, name, species, gender, image, status, origin}) => {
         return (
            <div className="w-64 h-[375px] bg-cyan-600 rounded-3xl text-white flex flex-col items-center text-center text-3xl py-2">
            <p className="text-balance mt-1 h-24 flex items-center px-4 py-12">{name}</p>
            <div className="w-full h-full items-end flex justify-center">
            <Image src={image} width={200} height={400} className="flex mb-6" />
            </div>
            </div>
         )
         })}
      </div>
    </>
  );
}
