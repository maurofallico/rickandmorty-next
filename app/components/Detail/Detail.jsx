"use client";

import { CgClose } from "react-icons/cg";
import axios from "axios";
import {useState, useEffect} from 'react'
import Image from 'next/image'

export default function Detail({ setIsOpen, cardId }) {

    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [species, setSpecies] = useState('')
    const [gender, setGender] = useState('')
    const [origin, setOrigin] = useState('')
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDetail()
    }, [])

    async function loadDetail() {
        try {
          const response = await axios.get(`/api/characters?id=${cardId}`);
          
          await new Promise(resolve => setTimeout(resolve, 500));
      
          setName(response.data[0].name);
          setStatus(response.data[0].status);
          setSpecies(response.data[0].species);
          setGender(response.data[0].gender);
          setOrigin(response.data[0].origin);
          setImage(response.data[0].image);
          
          if (response) setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
  

  return (
    <>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className="justify-center sm:h-fit pb-8 sm:w-fit min-h-[150px] min-w-[450px] max-w-[600px] bg-blue-50 shadow-2xl border-2 border-slate-700 p-3 sm:rounded-3xl flex flex-col items-center gap-2 w-screen">
            <button onClick={() => setIsOpen(false)} className="flex self-end sm:px-0 px-6">
              <CgClose className="hover:text-red-600 text-xl " />
            </button>
            {!loading? (<div className="flex flex-col gap-3 justify-center items-center sm:text-lg text-sm">
            <p className="text-center text-4xl mb-4">{name}</p>
            <Image src={image} width={250} height={250} className="border border-black" />
            <p>Status: {status}</p>
            <p>Species: {species}</p>
            <p>Gender: {gender}</p>
            <p>Origin: {origin}</p>
            </div>) : (<div className="flex flex-col items-center justify-center gap-8 py-2">
                <p>LOADING...</p>
                <span className="loading loading-spinner loading-lg scale-125"></span>
                </div>)}
          </div>
        </div>
    </>
  );
}
