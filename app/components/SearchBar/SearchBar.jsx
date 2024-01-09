'use client'

import {useState} from 'react'

export default function SearchBar() {

    const [value, setValue] = useState()

    function handleChange(e){
        setValue(e.target.value)
    }


    return (
        <>
        <div>
            <input
            className='px-1 h-8 rounded-md'
            type="search"
            placeholder="Find a character..."
            value={value}
            onChange={handleChange}
            />
        </div>
        </>
    )
}