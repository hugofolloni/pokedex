const Home = () => {
    return ( 
        <div className="home">
            <h2>Minha Pokedex</h2>
            <button onClick={ () => { window.location.href='http://localhost:3000/catch'}} >Começar</button>
            <div className="red"></div>
        </div>
     );
}
 
export default Home;