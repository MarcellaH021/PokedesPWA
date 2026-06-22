import { useState, useEffect } from 'react';
import './cartaPok.scss';

function CartaPokemon({ nome }) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  // define a classe do tipo pra mudar cor da carta
  const classeTipo = (tipo) => {
    return `type-${tipo}`;
  };

  // mostra a vidinha do pokemon
  const vida = (stats) => {
    const hp = stats.find((s) => s.stat.name === 'hp');
    return hp ? hp.base_stat : 0;
  };

  // Nomes das Habilidadezinhas
  const formatarNome = (nome) => {
    return nome
      .split('-')
      .map((p) => p[0].toUpperCase() + p.slice(1))
      .join(' ');
  };

  // descrição fake dos ataques (só pra ficar bonito)
  const descricaoAtaque = (nome) => {
    const desc = {
      'thunderbolt': 'Um raio poderoso.',
      'quick-attack': 'Ataque rápido que vem primeiro.',
      'tackle': 'Investida básica.',
    };
    return desc[nome] || 'Ataque Pokémon.';
  };

  // dano fake dos ataques
  const danoAtaque = (nome) => {
    const dano = {
      'thunderbolt': 90,
      'quick-attack': 40,
      'tackle': 40,
    };
    return dano[nome] || 50;
  };

  // pega só 2 ataques
  const pegarAtaques = (moves) => {
    return moves.slice(0, 2).map((m) => m.move.name);
  };

  useEffect(() => {
    if (!nome) return;

    setCarregando(true);
    setErro(null);

    fetch(`https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Pokémon não encontrado');
        return res.json();
      })
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

      {/* carta normal */}
      <div className={`tcg-card ${classe}`}>
        <div className="card-header">
          <div>
            <h2 className="card-name">{dados.name}</h2>
            <span className="card-type-badge">{tipo}</span>
          </div>
          <div className="card-hp">
            <span className="card-hp-icon"></span>
            <span>{hp}</span>
          </div>
        </div>

        {/* imagem do pokemon */}
        <div className="card-image-section">
          <img
            src={dados.sprites.front_default}
            alt={dados.name}
            className="card-image"
          />
        </div>

        {/* habilidade */}
        <div className="ability-section">
          <div className="ability-title">Habilidade</div>
          <div className="ability-name">
            {formatarNome(dados.abilities[0]?.ability.name || 'Padrão')}
          </div>
          <div className="ability-description">
            {dados.abilities[0]?.is_hidden
              ? '(Habilidade Oculta)'
              : 'Habilidade Normal'}
          </div>
        </div>

        {/* ataques */}
        <div className="moves-section">
          {ataques.map((nomeAtaque, i) => (
            <div key={i} className="move">

              <div className="move-cost">
                <div className={`energy-icon energy-${tipo}`}>Energy: </div>
              </div>

              <div className="move-info">
                <div className="move-name">
                  {formatarNome(nomeAtaque)}
                  <span className="move-damage">
                    {danoAtaque(nomeAtaque)}
                  </span>
                </div>

                <div className="move-description">
                  {descricaoAtaque(nomeAtaque)}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* rodapé */}
        <div className="card-footer">
          <span className="card-number">#{dados.id}</span> • Carta Pokémon
        </div>
      </div>

      {/* carta shiny */}
      <div className="shiny-card-section">
        <div className="shiny-label">Versão Shiny</div>
        <div className={`tcg-card-shiny ${classe}`}>
          <div className="card-header">
            <h2 className="card-name">{dados.name}</h2>
          </div>
          {/* imagem shiny */}
          <div className={`card-image-section-shiny ${classe}`}>
            <img
              src={dados.sprites.front_shiny}
              alt="shiny"
              className="card-image-shiny"
            />
          </div>
          <div className="card-footer">
            #{dados.id} • Shiny
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartaPokemon;