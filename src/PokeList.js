import React, { useState, useEffect } from "react"
import IndividualPokemon from "./IndividualPokemon"

const PokeList = () => {

    const [ myPokemons, setMyPokemons ] = useState(null)

    const url = 'http://localhost:8000/pokemons'

    useEffect(() => {
        setInterval(() => {
            fetch(url)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setMyPokemons(data)
            })
        }, 5000)
    }, [url])

    return ( 
        <div className="pokelist">
            <h1>PokeList</h1>
            <h4>Essa é a sua lista com todos os seus Pokemons!</h4>
            <h5>Pokemons</h5>
            { myPokemons && <IndividualPokemon myPokemons = { myPokemons }/> }
        </div>
     );
}
 
export default PokeList;