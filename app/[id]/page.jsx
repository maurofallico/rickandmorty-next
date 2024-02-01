'use client'

import axios from 'axios'
import {useEffect, useState} from 'react'

export default function Page ({params}){

    const [name, setName] = useState('')


    const id = params.id

    async function loadDetail(){
        const response = await axios.get(`/api/characters?id=${id}`)
        console.log(response.data[0].name)
    }
    
    useEffect(()=> {
        loadDetail()
    }, [])


        return(
        <div>
        {/* <h1 className="text-gray-50">{params.id}</h1> */}
        </div>
    )
}