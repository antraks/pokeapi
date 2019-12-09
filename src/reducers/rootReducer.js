const initState = {
  pokemons: []
}

const rootReducer = (state = initState, action) => {
  if (action.type === 'SET_POKEMONS') {
    return { ...state, pokemons: action.data }
  }

  return state
}

export default rootReducer