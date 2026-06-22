import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'pokemon_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar favoritos ao montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addFavorite = (pokemon) => {
    setFavorites((prev) => {
      const updated = [...prev];
      if (!updated.find((p) => p.id === pokemon.id)) {
        updated.push(pokemon);
      }
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Erro ao salvar favorito:', error);
      }
      return updated;
    });
  };

  const removeFavorite = (pokemonId) => {
    setFavorites((prev) => {
      const updated = prev.filter((p) => p.id !== pokemonId);
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Erro ao remover favorito:', error);
      }
      return updated;
    });
  };

  const isFavorite = (pokemonId) => {
    return favorites.some((p) => p.id === pokemonId);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite, isLoading };
};
