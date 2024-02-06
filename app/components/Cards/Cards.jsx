"use client";


import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import {useState, useEffect} from 'react'


export default function Cards({ windowWidth, cardId, setCardId, isOpen, setIsOpen, charPage, addFav, removeFav }) {
  /* const [windowWidth, setWindowWidth] = useState(0);

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
  }, []); */


  return (
    <>
      <div className="flex flex-wrap items-center justify-center mt-12 gap-3 sm:gap-10 ">
        {charPage?.map(
          ({ id, name, species, gender, image, status, origin, fav }) => {
            let size = "";
            if (name.length < 14) size = "text-lg sm:text-3xl";
            if (name.length > 13 && name.length < 31) size = "text-sm sm:text-2xl";
            if (name.length > 30) size = "text-xs sm:text-xl";
            return (
              <div
              onClick={() => {
                setCardId(id);
                setIsOpen(true)
              }}
                key={id}
                className="w-32 sm:w-52 hover:scale-105 transition-all duration-500 cursor-pointer h-[178px] sm:h-[290px] bg-cyan-600 rounded-xl sm:rounded-3xl text-white flex flex-col items-center justify-between text-center py-2"
              >
                <button
                  key={id}
                  name={id}
                  onClick={() => (fav ? removeFav(id) : addFav(id))}
                  className={`flex self-end  mx-2 sm:mx-4 text-lg sm:text-2xl ${
                    fav ? "text-red-500" : ""
                  }`}
                >
                  <FaHeart />
                </button>

                <p
                  className={`text-balance leading-tight h-fit sm:h-12 flex items-center px-2 sm:px-4 mb-1 ${size}`}
                >
                  {name}
                </p>
                
                <div className="flex w-fit ">
                  <Image
                    src={image}
                    width={windowWidth < 400? 90 : 180}
                    height={windowWidth < 400? 90  : 180}
                    alt="characterImage"
                    style={{ objectFit: "cover" }}
                    className="flex "
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
