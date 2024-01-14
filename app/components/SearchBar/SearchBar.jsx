'use client'

import {useState, useEffect} from 'react'

export default function SearchBar( {characters }) {
    const [hidden, setHidden] = useState('true')

    const [value, setValue] = useState()

    function handleChange(e){
        setValue(e.target.value)
    }

    useEffect(() => {
        if (characters && characters.length > 0){
            setHidden(false)
        }
        else{
            setHidden(true)
        }
      }, [characters]);



    return (
        <>
        <div>
            <input
            className='px-1 h-8 rounded-md'
            type="search"
            placeholder="Find a character..."
            value={value}
            onChange={handleChange}
            hidden={hidden}
            />
        </div>
        </>
    )
}