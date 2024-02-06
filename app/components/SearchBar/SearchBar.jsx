'use client'

export default function SearchBar( {setFiltered, characters }) {

    function handleChange(e){
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm === "") setFiltered(characters);
        const filteredCharacters = characters.filter(
            (char) => char.name.toLowerCase().includes(searchTerm)
        );

        setFiltered(filteredCharacters);
    }




    return (
        <>
        <div>
            <input
            className='px-1 h-8 rounded-md bg-gray-50 text-black'
            type="search"
            placeholder="Find a character..."
            onChange={handleChange}
            />
        </div>
        </>
    )
}