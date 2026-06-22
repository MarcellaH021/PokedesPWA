import { useState, useEffect } from 'react';
import { fetchPokemonData } from '../services/pokeApiService';
import { useFavorites } from '../hooks/useFavorites';
import '../styles/pages.scss';

function Details({ pokemonName, onNavigate, onBack }) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!pokemonName) return;

    setCarregando(true);
    setErro(null);

    fetchPokemonData(pokemonName.toLowerCase())
      .then((data) => {
        setDados(data);
        setCarregando(false);
      })
      .catch(() => {
        setErro('Erro ao buscar Pokémon');
        setCarregando(false);
      });
  }, [pokemonName]);

  const handleFavoriteToggle = () => {
    if (dados) {
      if (isFavorite(dados.id)) {
        removeFavorite(dados.id);
      } else {
        addFavorite(dados);
      }
    }
  };

  if (carregando) return <div className="page-details"><p>Carregando...</p></div>;
  if (erro) return <div className="page-details"><p>{erro}</p></div>;
  if (!dados) return null;

  const tipo = dados.types[0]?.type.name || 'normal';
  const hp = dados.stats.find((s) => s.stat.name === 'hp')?.base_stat || 0;

  return (
    <div className="page-details">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>
          ← Voltar
        </button>
        <h1>{dados.name}</h1>
        <button
          className={`favorite-btn ${isFavorite(dados.id) ? 'favorited' : ''}`}
          onClick={handleFavoriteToggle}
        >
          {isFavorite(dados.id) ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="details-container">
        <div className="details-image">
          <img
            src={dados.sprites.front_default}
            alt={dados.name}
            className="detail-image"
          />
          {dados.sprites.front_shiny && (
            <div className="shiny-preview">
              <p>Shiny:</p>
              <img
                src={dados.sprites.front_shiny}
                alt="shiny"
                className="detail-image-shiny"
              />
            </div>
          )}
        </div>

        <div className="details-info">
          <div className="info-section">
            <h2>Informações</h2>
            <p><strong>ID:</strong> #{dados.id}</p>
            <p><strong>Tipo:</strong> {tipo}</p>
            <p><strong>Altura:</strong> {(dados.height / 10).toFixed(1)}m</p>
            <p><strong>Peso:</strong> {(dados.weight / 10).toFixed(1)}kg</p>
          </div>

          <div className="info-section">
            <h2>Estatísticas</h2>
            {dados.stats.slice(0, 6).map((stat) => (
              <div key={stat.stat.name} className="stat-bar">
                <span className="stat-name">{stat.stat.name}</span>
                <div className="stat-bar-bg">
                  <div
                    className="stat-bar-fill"
                    style={{ width: `${Math.min(stat.base_stat / 2, 100)}%` }}
                  />
                </div>
                <span className="stat-value">{stat.base_stat}</span>
              </div>
            ))}
          </div>

          <div className="info-section">
            <h2>Habilidades</h2>
            {dados.abilities.map((ability, i) => (
              <div key={i} className="ability-item">
                <strong>{ability.ability.name}</strong>
                <p>{ability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
