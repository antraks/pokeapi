const initState = {
  pokemons: []
}

const rootReducer = (state = initState, action) => {
  if (action.type === 'SET_POKEMONS') {
    return { ...state, pokemons: action.data }
  }

  if (action.type === 'INVERT_POKEMON_FAVORITE') {
    const pokemons = [...state.pokemons]
    const pokemon = pokemons.find(p => p.name === action.name)
    pokemon.isFavorite = !!pokemon.isFavorite ? !pokemon.isFavorite : true
    return { ...state, pokemons }
  }

  return state
}

export default rootReducer