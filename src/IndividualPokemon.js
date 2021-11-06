const IndividualPokemon = (props) => {

    const myPokemons = props.myPokemons

    return ( 
        <div className="list">
            { myPokemons.map( (myPokemons ) => (
                <div className="individual-pokemon">
                    <p>{myPokemons.name}</p>
                    <img src={myPokemons.pokeImage} alt="" />
                </div>
            ))}
        </div>
     );
}
 
export default IndividualPokemon;