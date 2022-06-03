import './App.css';
import React from 'react';
import {Routes,Route} from 'react-router-dom'

// COMPONENTES
import Home from "./components/Home/Home"
import LandingPage from './components/Landing/LandingPage';
import CreatePokemon from "./components/CreatePokemon/CreatePokemon"
import DetailPokemon from "./components/DetailPokemon/DetailPokemon"
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
  return (
    <div className="App">
      <Routes>
        
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/home/createPokemon' element={<CreatePokemon />} />
        <Route path='/home/:id' element={<DetailPokemon />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
  