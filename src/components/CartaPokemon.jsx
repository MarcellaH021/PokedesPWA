import { useState, useEffect } from 'react';
import { fetchPokemonData, getTypeColor, getMoveDescription, getMoveDamage } from '../services/pokeApiService';
import '../styles/cartaPok.scss';

function CartaPokemon({ nome, onFavoriteToggle, isFavorited }) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const classeTipo = (tipo) => {
    return `type-${tipo}`;
  };

  const vida = (stats) => {
    const hp = stats.find((s) => s.stat.name === 'hp');
    return hp ? hp.base_stat : 0;
  };

  const formatarNome = (nome) => {
    return nome
      .split('-')
      .map((p) => p[0].toUpperCase() + p.slice(1))
      .join(' ');
  };

  const pegarAtaques = (moves) => {
    return moves.slice(0, 2).map((m) => m.move.name);
  };

  useEffect(() => {
    if (!nome) return;

    setCarregando(true);
    setErro(null);

    fetchPokemonData(nome.toLowerCase())
      .then((data) => {
        setDados(data);
        setCarregando(false);
      })
      .catch(() => {
        setErro('Erro ao buscar Pokémon');
        setCarregando(false);
      });
  }, [nome]);

  if (carregando) return <p style={{ color: 'white' }}>Carregando...</p>;
  if (erro) return <p style={{ color: '#ff6b6b' }}>{erro}</p>;
  if (!dados) return null;

  const tipo = dados.types[0]?.type.name || 'normal';
  const classe = classeTipo(tipo);
  const hp = vida(dados.stats);
  const ataques = pegarAtaques(dados.moves);

  return (
    <div className="cards-wrapper">
      {/* Carta normal */}
      <div className={`tcg-card ${classe}`}>
        <div className="card-header">
          <div>
            <h2 className="card-name">{dados.name}</h2>
            <span className="card-type-badge">{tipo}</span>
          </div>
          <div className="card-hp">
            <span className="card-hp-icon">❤️</span>
            <span>{hp}</span>
          </div>
        </div>

        {/* Imagem do Pokémon */}
        <div className="card-image-section">
          <img
            src={dados.sprites.front_default}
            alt={dados.name}
            className="card-image"
          />
        </div>

        {/* Habilidades com descrição de IA */}
        <div className="ability-section">
          <div className="ability-title">Habilidade</div>
          <div className="ability-name">
            {formatarNome(dados.abilities[0]?.ability.name || 'Padrão')}
          </div>
          <div className="ability-description">
            {dados.abilities[0]?.description ||
              (dados.abilities[0]?.is_hidden
                ? '(Habilidade Oculta)'
                : 'Habilidade Normal')}
          </div>
        </div>

        {/* Ataques com descrição de IA */}
        <div className="moves-section">
          {ataques.map((nomeAtaque, i) => (
            <div key={i} className="move">
              <div className="move-cost">
                <div className={`energy-icon energy-${tipo}`}>⚡</div>
              </div>

              <div className="move-info">
                <div className="move-name">
                  {formatarNome(nomeAtaque)}
                  <span className="move-damage">
                    {getMoveDamage(nomeAtaque, dados.stats)}
                  </span>
                </div>

                <div className="move-description">
                  {getMoveDescription(nomeAtaque)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão de favorito */}
        <div className="card-footer">
          <span className="card-number">#{dados.id}</span> • Carta Pokémon
          {onFavoriteToggle && (
            <button
              className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
              onClick={() => onFavoriteToggle(dados)}
              title={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              {isFavorited ? '❤️' : '🤍'}
            </button>
          )}
        </div>
      </div>

      {/* Carta Shiny */}
      <div className="shiny-card-section">
        <div className="shiny-label">Versão Shiny ✨</div>
        <div className={`tcg-card-shiny ${classe}`}>
          <div className="card-header">
            <h2 className="card-name">{dados.name}</h2>
          </div>
          {/* Imagem Shiny */}
          <div className={`card-image-section-shiny ${classe}`}>
            {dados.sprites.front_shiny ? (
              <img
                src={dados.sprites.front_shiny}
                alt="shiny"
                className="card-image-shiny"
              />
            ) : (
              <div style={{ color: '#999', padding: '2rem' }}>
                Versão Shiny não disponível
              </div>
            )}
          </div>
          <div className="card-footer">#{dados.id} • Shiny</div>
        </div>
      </div>
    </div>
  );
}

export default CartaPokemon;
