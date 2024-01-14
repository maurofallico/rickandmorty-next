"use client";

import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";


export default function Cards({ charPage, addFav, removeFav }) {

  /*

  function nextPage() {
    if (page !== 52) setPage(page + 1);
  }

  function prevPage() {
    if (page !== 1) setPage(page - 1);
  } */
  

  return (
    <>
      <div className="flex flex-wrap items-center justify-center mt-12 gap-10 ">
        {charPage?.map(
          ({ id, name, species, gender, image, status, origin, fav }) => {
            let size = "";
            if (name.length < 14) size = "text-3xl";
            if (name.length > 13 && name.length < 31) size = "text-2xl";
            if (name.length > 30) size = "text-xl";
            return (
              <div
                key={id}
                className="w-52 h-[290px] bg-cyan-600 rounded-3xl text-white flex flex-col items-center text-center py-2"
              >
                <button
                  key={id}
                  name={id}
                  onClick={() => (fav ? removeFav(id) : addFav(id))}
                  className={`flex self-end mx-4 text-2xl ${
                    fav ? "text-red-500" : ""
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
                    width={160}
                    height={160}
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
      {/* <div className="flex flex-row items-center justify-center mt-12 gap-6 text-2xl">
          <button
            className="bg-white rounded-xl p-3 hover:bg-gray-200"
            onClick={prevPage}
          >
            <AiOutlineArrowLeft />
          </button>
          <p className="bg-cyan-600 px-4 p-2 rounded-xl">PAGE:{page}</p>
          <button
            className="bg-white rounded-xl p-3 hover:bg-gray-200"
            onClick={nextPage}
          >
            <AiOutlineArrowRight />
          </button>

      </div> */}
    </>
  );
}
