import React, { useState } from "react";
import pokedexPNG from "./assets/pokedexPNG.png";
import infinitySymbol from "./assets/infinitySymbol.png";

const Catch = () => {
    const [name, setName] = useState('Searching...');
    const [pokeImage, setPokeImage] = useState(pokedexPNG);
    const [type, setType] = useState(null);
    const [hp, setHp] = useState(null);
    const [attack, setAttack] = useState(null);
    const [defense, setDefense] = useState(null);
    const [powerLevel, setPowerLevel] = useState(null);

    const [greatballNumber, setGreatballNumber] = useState(localStorage.getItem('greatball') || 25);
    const [ultraballNumber, setUltraballNumber] = useState(localStorage.getItem('ultraball') || 5);

    const [showButtons, setShowButtons] = useState(false);

    var pokeList = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

    const handleRandom = () => {
        setShowButtons(true)
        const randomizer = Math.floor(Math.random() * pokeList.length);
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeList[randomizer].toLowerCase()}`)
        .then(res => {
            return res.json();
        })
        .then(data => {

            const string = data.species.name;
            setName(string[0].toUpperCase(0) + string.slice(1));
            
            setPokeImage(data.sprites.front_default);
            
            const typeString = data.types[0].type.name;
            setType(typeString[0].toUpperCase(0) + typeString.slice(1));

            setHp(data.stats[0].base_stat);
            setAttack(data.stats[1].base_stat);
            setDefense(data.stats[2].base_stat);

            // To calculate the powerLevel, I used base_experience and create a multiplier, that could be at least the base experience, 70% of chance to be between base experience and 2 * base experience and the other 30% is to be the second number * 2
            const baseExperience = data.base_experience;
            const powerLevelCalc = Math.floor(Math.random() *  baseExperience) + baseExperience;
            if(Math.random() > 0.7){
                setPowerLevel(powerLevelCalc * 2);
            }
            else{
                setPowerLevel(powerLevelCalc);
            }

        })
    }

    const handleCatch = (perc) => {
        const randomNumber = Math.random();
        console.log(randomNumber, perc);
        if(randomNumber <= perc){
            window.alert(`Gotcha! You've got the pokemon ${name}!`);
            const data = new Date();
            const day = data.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ':' + data.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ' - ' + data.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '/' + (data.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '/' + data.getFullYear();
            const pokeData = { type, hp, attack, defense, powerLevel };
            const singlePokemon = { name, pokeImage, day, pokeData };
            fetch('http://localhost:8000/pokemons', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(singlePokemon)
            })
            .then(() => {
                window.alert(`${name} was added to your Pokedex!`);
                searching();
            })
        }
        else{
            window.alert(`${name} ran away! Let's search for another!`);
            searching();
        }
    }

    const searching = () => {
        setName("Buscando...");
        setPokeImage(pokedexPNG);
        setShowButtons(false);
        setTimeout(() => {
            handleRandom();
        },  (Math.floor(Math.random() * (8000 - 4000)) + 4000));
    }

    window.addEventListener('load', () => {handleRandom()});

    return ( 
        <div className="catch">
            <div className='redirect-to-pokelist'>
                <div className="to-space">
                    <a href='/pokelist'>Pokedex</a>
                </div>           
            </div>
            <h3>{ name }</h3>
            <div className="pokeballCenter">
                 <img src={pokeImage} alt="pokeImage" width="250px" height='250px'/>
            </div>
            {showButtons && <div id='balls' className="balls">
                <button onClick = { () => 
                    {
                        if(Math.random() > 0.95){
                            localStorage.setItem('greatball', Number(greatballNumber) + 20);
                            localStorage.setItem('ultraball', Number(ultraballNumber) + 4);
                            setGreatballNumber(Number(greatballNumber) + 20)
                            setUltraballNumber(Number(ultraballNumber) + 4)
                            window.alert("Congratulations! You've earned 20 Greatballs and 4 Ultraballs!");
                        }
                        handleCatch(0.3);
                    }
                }> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="" /><img src={infinitySymbol} alt="" width='25px' className='infinity'/></button>
                <button onClick = { () => 
                    {
                        setGreatballNumber(greatballNumber - 1);
                        localStorage.setItem('greatball', Number(greatballNumber) - 1);
                        console.log(localStorage.getItem('greatball'));
                        handleCatch(0.6)
                    }
                }> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png" alt="" />{greatballNumber} </button>
                <button onClick = { () => 
                    {
                        setUltraballNumber(ultraballNumber - 1);
                        localStorage.setItem('ultraball', Number(ultraballNumber) - 1);
                        console.log(localStorage.getItem('greatball'));
                        handleCatch(0.9)
                     }  
                }> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png" alt="ultraBall" width='35px'/>{ultraballNumber}</button>
            </div>}
            <div className="red"/>
            <div className="skip">
                <p onClick={() => searching()}> → </p>
            </div>
        </div>
     );
}
 
export default Catch;