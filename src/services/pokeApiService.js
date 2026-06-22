// Serviço para integração com PokéAPI com cache e descrições inteligentes

const CACHE_KEY = 'pokemon_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 horas

// Descrições de habilidades baseadas em padrões da IA
const abilityDescriptions = {
  'static': 'Pode paralisar ao tocar o Pokémon.',
  'lightning-rod': 'Atrai ataques elétricos e aumenta o Ataque Esp.',
  'volt-absorb': 'Absorve ataques elétricos e recupera HP.',
  'water-absorb': 'Absorve ataques de água e recupera HP.',
  'torrent': 'Aumenta o poder de ataques de água quando em dificuldade.',
  'blaze': 'Aumenta o poder de ataques de fogo quando em dificuldade.',
  'overgrow': 'Aumenta o poder de ataques de grama quando em dificuldade.',
  'swift-swim': 'Dobra a velocidade em chuva.',
  'chlorophyll': 'Dobra a velocidade sob luz solar.',
  'sand-stream': 'Cria uma tempestade de areia ao entrar em batalha.',
  'drought': 'Causa luz solar intensa ao entrar em batalha.',
  'rain-dish': 'Recupera HP em chuva.',
  'solar-power': 'Aumenta o Ataque Esp. sob luz solar, mas perde HP.',
  'intimidate': 'Reduz o Ataque do inimigo ao entrar em batalha.',
  'pressure': 'Força o inimigo a usar mais PP dos movimentos.',
  'trace': 'Copia a habilidade do inimigo.',
  'synchronize': 'Transmite status do Pokémon para o inimigo.',
  'compound-eyes': 'Aumenta a precisão de movimentos.',
  'keen-eye': 'Impede redução de precisão.',
  'magic-bounce': 'Reflete movimentos de status para o inimigo.',
};

// Descrições de movimentos baseadas em padrões
const moveDescriptions = {
  'thunderbolt': 'Um raio poderoso que pode paralisar o alvo.',
  'quick-attack': 'Ataque rápido que sempre vai primeiro.',
  'tackle': 'Investida básica com o corpo inteiro.',
  'thunder': 'Um raio devastador com chance de paralisia.',
  'thunder-wave': 'Gera uma onda elétrica que paralisa o alvo.',
  'electric-terrain': 'Cria um terreno elétrico que potencia ataques.',
  'water-gun': 'Dispara um jato de água contra o alvo.',
  'hydro-pump': 'Um poderoso jato de água que causa grande dano.',
  'surf': 'Cria uma onda gigante para atacar todos ao redor.',
  'ember': 'Dispara chamas que podem queimar o alvo.',
  'flamethrower': 'Dispara um fluxo de fogo poderoso.',
  'fire-blast': 'Uma explosão de fogo devastadora.',
  'vine-whip': 'Usa videiras para atacar o adversário.',
  'solar-beam': 'Absorve energia solar e dispara um raio poderoso.',
  'razor-leaf': 'Dispara folhas afiadas contra o alvo.',
  'psychic': 'Ataque psíquico que pode reduzir a Defesa Esp.',
  'confusion': 'Confunde o alvo com ondas psíquicas.',
  'shadow-ball': 'Dispara uma esfera de sombra contra o alvo.',
  'dark-pulse': 'Emite uma onda de energia sombria.',
  'bite': 'Morde o alvo com força.',
  'crunch': 'Morde com força e pode reduzir a Defesa.',
  'stone-edge': 'Dispara fragmentos de pedra afiados.',
  'earthquake': 'Causa um tremor que afeta todos ao redor.',
  'dig': 'Se esconde e ataca no turno seguinte.',
  'fly': 'Voa para atacar no turno seguinte.',
  'ice-beam': 'Dispara um raio de gelo que pode congelar.',
  'blizzard': 'Uma nevasca que afeta todos ao redor.',
  'dragon-claw': 'Ataca com garras de dragão.',
  'dragon-pulse': 'Dispara uma onda de energia de dragão.',
};

// Função para obter descrição de habilidade com fallback inteligente
export const getAbilityDescription = (abilityName) => {
  const normalized = abilityName.toLowerCase().replace(/\s+/g, '-');
  return abilityDescriptions[normalized] || 
    `${abilityName}: Habilidade especial que afeta o desempenho em batalha.`;
};

// Função para obter descrição de movimento com fallback inteligente
export const getMoveDescription = (moveName) => {
  const normalized = moveName.toLowerCase().replace(/\s+/g, '-');
  return moveDescriptions[normalized] || 
    `${moveName}: Movimento que causa dano ao adversário.`;
};

// Função para calcular dano estimado do movimento
export const getMoveDamage = (moveName, baseStats) => {
  const normalized = moveName.toLowerCase().replace(/\s+/g, '-');
  
  const damageMap = {
    'thunderbolt': 90,
    'quick-attack': 40,
    'tackle': 40,
    'thunder': 110,
    'thunder-wave': 0,
    'electric-terrain': 0,
    'water-gun': 40,
    'hydro-pump': 110,
    'surf': 90,
    'ember': 40,
    'flamethrower': 90,
    'fire-blast': 110,
    'vine-whip': 45,
    'solar-beam': 120,
    'razor-leaf': 55,
    'psychic': 90,
    'confusion': 50,
    'shadow-ball': 80,
    'dark-pulse': 80,
    'bite': 60,
    'crunch': 80,
    'stone-edge': 100,
    'earthquake': 100,
    'dig': 80,
    'fly': 90,
    'ice-beam': 90,
    'blizzard': 110,
    'dragon-claw': 80,
    'dragon-pulse': 85,
  };
  
  return damageMap[normalized] || 60;
};

// Função para obter cor do tipo
export const getTypeColor = (type) => {
  const colors = {
    'normal': '#A8A878',
    'bug': '#A8B820',
    'grass': '#78C850',
    'fairy': '#EE99AC',
    'water': '#6890F0',
    'fire': '#F08030',
    'electric': '#F8D030',
    'psychic': '#F85888',
    'fighting': '#C03028',
    'flying': '#A890F0',
    'poison': '#A040A0',
    'ground': '#E0C068',
    'rock': '#B8A038',
    'ice': '#98D8D8',
    'dragon': '#7038F8',
    'ghost': '#705898',
    'dark': '#705848',
    'steel': '#B8B8D0',
  };
  return colors[type?.toLowerCase()] || '#A8A878';
};

// Cache local com expiração
const getCache = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
};

const saveCache = (cache) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.warn('Erro ao salvar cache:', error);
  }
};

const isCacheValid = (timestamp) => {
  return Date.now() - timestamp < CACHE_EXPIRY;
};

// Função principal para buscar Pokémon com cache
export const fetchPokemonData = async (nameOrId) => {
  const cache = getCache();
  const cacheKey = String(nameOrId).toLowerCase();

  // Verificar cache local
  if (cache[cacheKey] && isCacheValid(cache[cacheKey].timestamp)) {
    return cache[cacheKey].data;
  }

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nameOrId}`
    );

    if (!response.ok) {
      throw new Error('Pokémon não encontrado');
    }

    const data = await response.json();

    // Enriquecer dados com descrições de IA
    const enrichedData = {
      ...data,
      abilities: data.abilities.map((ability) => ({
        ...ability,
        description: getAbilityDescription(ability.ability.name),
      })),
      moves: data.moves.slice(0, 4).map((move) => ({
        ...move,
        description: getMoveDescription(move.move.name),
        damage: getMoveDamage(move.move.name, data.stats),
      })),
    };

    // Salvar no cache
    cache[cacheKey] = {
      data: enrichedData,
      timestamp: Date.now(),
    };
    saveCache(cache);

    return enrichedData;
  } catch (error) {
    console.error('Erro ao buscar Pokémon:', error);
    throw error;
  }
};

// Função para buscar lista de Pokémon
export const fetchPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar lista');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro ao buscar lista:', error);
    throw error;
  }
};
