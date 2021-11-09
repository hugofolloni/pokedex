import Catch from "./Catch";
import PokeList from "./PokeList";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/catch' element={<Catch/>} />
          <Route exact path='/list' element={<PokeList/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
