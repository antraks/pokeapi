import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import axios from 'axios'
import './App.css'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import SearchAppBar from "./components/layout/SearchAppBar"
import PokemonList from './components/pokemon/PokemonList'
import PokemonDialog from './components/dialogs/PokemonDialog'
import Pagination from './components/pagination/Pagination'

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon'
const TILES_BY_PAGE = 24

// ===================================================================================================================
//      CLASS
// ===================================================================================================================

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogOpen: false,
      selectedPokemon: null,
      selectedPokemonName: null,
      page: 0
    }
  }

  async componentDidMount() {
    const { data } = await axios.get(`${POKEAPI_URL}?offset=0&limit=10000`)
    this.props.setPokemons(data)
  }

  async showDialog(name) {
    this.setState({ dialogOpen: true, selectedPokemon: null, selectedPokemonName: name })
    const { data } = await axios.get(`${POKEAPI_URL}/${name}`)
    this.setState({ selectedPokemon: data })
  }

  handleClose(value) {
    this.setState({ dialogOpen: false })
  }

  render() {
    const { classes, pokemons } = this.props
    const { dialogOpen, selectedPokemon, selectedPokemonName } = this.state

    return (
      <>
        <CssBaseline/>
        <SearchAppBar/>
        <Container className={classes.container}>
          <PokemonList pokemons={pokemons && pokemons.results && pokemons.results.slice(this.state.page * TILES_BY_PAGE, (this.state.page + 1) * TILES_BY_PAGE)} showDialog={e => this.showDialog(e)}/>
          <Pagination
            max={pokemons && pokemons.count && (Math.ceil(pokemons.count / TILES_BY_PAGE))}
            onSelect={(e) => this.setState({ page: e - 1 })}
          />

          <PokemonDialog data={selectedPokemon} name={selectedPokemonName} selected={selectedPokemon} open={dialogOpen} onClose={() => this.handleClose()}/>
        </Container>
      </>
    )
  }
}

// ===================================================================================================================
//      GETTERS
// ===================================================================================================================

const mapStateToProps = state => {
  return {
    pokemons: state.pokemons
  }
}

// ===================================================================================================================
//      ACTIONS
// ===================================================================================================================

const mapDispatchToProps = dispatch => {
  return {
    setPokemons: data => {dispatch({ type: 'SET_POKEMONS', data: data })}
  }
}

// ===================================================================================================================
//      STYLES
// ===================================================================================================================

const styles = theme => ({
  '@global': {
    body: {
      padding: '0'
    }
  },
  container: {
    padding: '100px 40px 0'
  }
})


App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
  withStyles(styles, { name: 'App' }),
  connect(mapStateToProps, mapDispatchToProps)
)(App)
