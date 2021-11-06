import React, { useState } from "react"

const Catch = () => {
    const [name, setName] = useState("")
    const [pokeImage, setPokeImage] = useState(null)

    var pokeList = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

    const handleRandom = () => {
        const randomizer = Math.ceil(Math.random() * pokeList.length)
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeList[randomizer].toLowerCase()}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
            console.log(data.species.name)
            setName(data.species.name)
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
            })
        }
        else{
            window.alert(`O Pokemon ${name} fugiu! Vamos procurar outro!`)
            setName("Buscando...")
            setTimeout(() => {
                handleRandom()
            }, 3000)
        }
    }

    

    return ( 
        <div className="pokemon-gerado">
            <h1>Pokedex da Luh</h1>
            <p>{ name }</p>
            <img src={pokeImage} alt="pokeImage" width="300px"/>
            <button onClick = { handleRandom }> Gerar </button>
            <button onClick = {() => handleCatch(0.3) }>Bola padrão</button>
            <button onClick = { () => handleCatch(0.6) }>Bola super</button>
            <button onClick = { () => handleCatch(0.9) }>Bola suprema</button>
        </div>
     );
}
 
export default Catch;