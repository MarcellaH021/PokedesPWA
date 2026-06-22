import { useState } from 'react';
import CartaPokemon from '../components/CartaPokemon';
import { useFavorites } from '../hooks/useFavorites';
import '../styles/pages.scss';

function Favorites({ onNavigate }) {
  const { favorites, removeFavorite, isLoading } = useFavorites();
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  if (isLoading) {
    return <div className="page-favorites"><p>Carregando...</p></div>;
  }

  return (
    <div className="page-favorites">
      <div className="page-header">
        <h1>⭐ Meus Favoritos</h1>
        <nav className="page-nav">
          <button className="nav-btn" onClick={() => onNavigate('home')}>
            Home
          </button>
          <button className="nav-btn active">Favoritos</button>
        </nav>
      </div>

      {favorites.length > 0 ? (
        <div className="favorites-container">
          {selectedPokemon ? (
            <div className="favorites-detail">
              <button
                className="back-btn"
                onClick={() => setSelectedPokemon(null)}
              >
                ← Voltar
              </button>
              <CartaPokemon
                nome={selectedPokemon.name}
                onFavoriteToggle={() => {
                  removeFavorite(selectedPokemon.id);
                  setSelectedPokemon(null);
                }}
                isFavorited={true}
              />
            </div>
          ) : (
            <div className="favorites-grid">
              {favorites.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="favorite-card"
                  onClick={() => setSelectedPokemon(pokemon)}
                >
                  <img
                    src={pokemon.sprites?.front_default}
                    alt={pokemon.name}
                    className="favorite-image"
                  />
                  <h3>{pokemon.name}</h3>
                  <p>#{pokemon.id}</p>
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(pokemon.id);
                    }}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <p>⭐ Você ainda não tem Pokémon favoritos</p>
          <button
            className="nav-btn"
            onClick={() => onNavigate('home')}
          >
            Voltar para Home
          </button>
        </div>
      )}
    </div>
  );
}

export default Favorites;
