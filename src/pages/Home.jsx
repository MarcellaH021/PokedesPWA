import { useState } from 'react';
import CartaPokemon from '../components/CartaPokemon';
import { useFavorites } from '../hooks/useFavorites';
import '../styles/pages.scss';

function Home({ onNavigate }) {
  const [nomePokemon, setNomePokemon] = useState('');
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavoriteToggle = (pokemon) => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return (
    <div className="page-home">
      <div className="page-header">
        <h1>🔍 Buscar Pokémon</h1>
        <nav className="page-nav">
          <button className="nav-btn active">Home</button>
          <button className="nav-btn" onClick={() => onNavigate('favorites')}>
            ⭐ Favoritos
          </button>
        </nav>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Digite o nome ou ID do Pokémon..."
          value={nomePokemon}
          onChange={(e) => setNomePokemon(e.target.value)}
          className="search-input"
        />
      </div>

      {nomePokemon ? (
        <CartaPokemon
          nome={nomePokemon}
          onFavoriteToggle={handleFavoriteToggle}
          isFavorited={isFavorite(nomePokemon)}
        />
      ) : (
        <div className="empty-state">
          <p>🎮 Digite um Pokémon para começar a exploração</p>
        </div>
      )}
    </div>
  );
}

export default Home;
