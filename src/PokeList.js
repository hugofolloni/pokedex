import React, { useState, useEffect } from "react"
import IndividualPokemon from "./IndividualPokemon"

const PokeList = () => {

    const [ myPokemons, setMyPokemons ] = useState(null)
    const [ isLoading, setLoading ] = useState(true);

    const url = 'http://localhost:8000/pokemons'

    useEffect(() => {
        fetch(url)
        .then(res => {
            return res.json()
        })
        .then(data => {
            setMyPokemons(data)
            setLoading(false)
        })
    }, [url])

    return ( 
        <div className="pokelist">
            <div className="header">
                <h1>PokeList</h1>
                <div className='redirect-to-pokelist'>
                    <div className="to-space">
                    <a href='/catch'>Search</a>
                    </div>           
                </div>
            </div>
            { isLoading && <div> <p className='loading'> Opening Pokedex... </p> </div>}
            { myPokemons && <IndividualPokemon myPokemons = { myPokemons }/> }
        </div>
     );
}
 
export default PokeList;