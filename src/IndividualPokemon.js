const IndividualPokemon = (props) => {

    const myPokemons = props.myPokemons

    return ( 
        <div className="list">
            { myPokemons.map( (myPokemons ) => (
                <div className="individual-pokemon">
                    <div className="principal">
                        <p className='name-p'>{myPokemons.name}</p>
                        <img src={ myPokemons.pokeImage } alt="" />
                    </div>
                    <p className='power-p'>Power: {myPokemons.pokeData.powerLevel}</p>
                    <div className="data-abt">
                        <p className="type-p">Type: {myPokemons.pokeData.type}</p>
                        <p className="hp-p">HP: {myPokemons.pokeData.hp}</p>
                    </div>
                    <div className="data-abt">
                        <p className="attack-p">Attack: {myPokemons.pokeData.attack}</p>
                        <p className="defense-p">Defense: {myPokemons.pokeData.defense}</p>
                    </div>
                    <div className="date">
                        <p className='date-p'>Found in: {myPokemons.day}</p>
                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default IndividualPokemon;