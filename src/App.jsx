import { useState } from 'react';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Details from './pages/Details';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleNavigate = (page, pokemon = null) => {
    setCurrentPage(page);
    if (pokemon) {
      setSelectedPokemon(pokemon);
    }
  };

  const handleBack = () => {
    setCurrentPage('home');
    setSelectedPokemon(null);
  };

  return (
    <div className="container">
      {currentPage === 'home' && (
        <Home onNavigate={handleNavigate} />
      )}
      {currentPage === 'favorites' && (
        <Favorites onNavigate={handleNavigate} />
      )}
      {currentPage === 'details' && selectedPokemon && (
        <Details
          pokemonName={selectedPokemon}
          onNavigate={handleNavigate}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;
