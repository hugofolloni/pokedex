import React, { useState } from "react"
import pokedexPNG from "./assets/pokedexPNG.png"

const Catch = () => {
    const [name, setName] = useState("")
    const [pokeImage, setPokeImage] = useState(null)

    var pokeList = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

    const handleRandom = () => {
        const randomizer = Math.floor(Math.random() * pokeList.length)
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeList[randomizer].toLowerCase()}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
            console.log(data.species.name)
            const string = data.species.name
            setName(string[0].toUpperCase(0) + string.slice(1))
            setPokeImage(data.sprites.front_default)
        })
    }

    const handleCatch = (perc) => {
        const randomNumber = Math.random()
        console.log(randomNumber, perc)
        if(randomNumber <= perc){
            window.alert(`Você capturou o Pokemon ${name}!`);
            const singlePokemon = {name, pokeImage };
            fetch('http://localhost:8000/pokemons', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(singlePokemon)
            })
            .then(() => {
                window.alert(`${name} foi adicionado a pokedex!`);
                searching()
            })
        }
        else{
            window.alert(`O Pokemon ${name} fugiu! Vamos procurar outro!`)
            searching()
        }
    }

    const searching = () => {
        setName("Buscando...")
        setPokeImage(pokedexPNG)
        setTimeout(() => {
            handleRandom()
        },  (Math.floor(Math.random() * (8000 - 4000)) + 4000))
    }

    window.addEventListener('load', () => {handleRandom()})

    return ( 
        <div className="catch">
            <h3>{ name }</h3>
            <div className="pokeballCenter">
                 <img src={pokeImage} alt="pokeImage" width="250px"/>
            </div>
            <div className="balls">
                <button onClick = {() => handleCatch(0.3) }>Pokeball</button>
                <button onClick = { () => handleCatch(0.6) }>Greatball</button>
                <button onClick = { () => handleCatch(0.9) }>Ultraball</button>
            </div>
            <div className="red"/>
        </div>
     );
}
 
export default Catch;