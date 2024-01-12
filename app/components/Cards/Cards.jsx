"use client";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function Cards() {
  const [characters, setCharacters] = useState([]);
  const [fav, setFav] = useState("false");

  const changeFav = (id) => {
      setFav((prevButtons) => {
        if (prevButtons.includes(id)) {
          // Button was favorited, remove it
          const response = axios.put(`/api/characters`, {
            id,
            fav: false
          })
          return prevButtons.filter((buttonId) => buttonId !== id);
        } else {
          // Button wasn't favorited, add it
          const response = axios.put(`/api/characters`, {
            id,
            fav: true
          })
          return [...prevButtons, id];
        }
  });
}

  async function cargarDatos() {
    const response = await axios.get("/api/characters");
    setCharacters(response.data);
  }

  useEffect(() => {
    cargarDatos();
   }, []);

  useEffect(() => {
    characters.sort((a, b) => a.id - b.id);
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center justify-center mt-20 gap-10 ">
        {characters.map(

            ({ id, name, species, gender, image, status, origin }) => {
              let size = "";
              if (name.length < 14) size = "text-3xl";
              if (name.length > 13 && name.length < 31) size = "text-2xl";
              if (name.length > 30) size = "text-xl";
              return (
                <div
                  key={id}
                  className="w-60 h-[350px] bg-cyan-600 rounded-3xl text-white flex flex-col items-center text-center py-2"
                >
                  {/* {!fav? (<button name={id} onClick={changeFav} className="flex self-end mx-4 text-2xl "><FaRegHeart /></button>) :
              (<button name={id} onClick={changeFav} className="flex self-end mx-4 text-2xl "><FaHeart/></button>)} */}
                  <button
                    key={id}
                    name={id}
                    onClick={() => changeFav(id)}
                    className={`flex self-end mx-4 text-2xl ${
                      fav.includes(id) ? "text-red-500" : ""
                    }`}
                  >
                    <FaHeart />
                  </button>

                  <p
                    className={`text-balance mt-0 h-24 flex items-center px-4 py-0 ${size}`}
                  >
                    {name}
                  </p>
                  <div className="w-full h-full items-end flex justify-center">
                    <Image
                      src={image}
                      width={200}
                      height={200}
                      alt="characterImage"
                      style={{ objectFit: "cover" }}
                      className="flex mb-2 "
                    />
                  </div>
                </div>
              );
            }
        )}
      </div>
    </>
  );
}
