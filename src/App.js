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
      search: null,
      selectedPage: 0,
      resetPage: 0
    }
  }

  async componentDidMount() {
    const { data } = await axios.get(`${POKEAPI_URL}?offset=0&limit=10000`)
    this.props.setPokemons(data.results.filter(p => {
      const index = p.url && p.url.split('/')[p.url.split('/').length - 2]
      return index < 1000
    }))
  }

  async showDialog(name) {
    this.setState({ dialogOpen: true, selectedPokemon: null, selectedPokemonName: name })
    const { data } = await axios.get(`${POKEAPI_URL}/${name}`)
    this.setState({ selectedPokemon: data })
  }

  handleClose() {
    this.setState({ dialogOpen: false })
  }

  handlePaginationSelect(val) {
    this.setState({ selectedPage: val })
    // this.setState({ pokemons: this.props.pokemons.results.slice(page * TILES_BY_PAGE, (page + 1) * TILES_BY_PAGE) })
  }

  handlePaginationChange(val) {
    this.setState({ resetPage: false })
  }

  handleSearch(val) {
    // const pokemons = this.props.pokemons.results.filter(p => p.name.includes(val))
    this.setState({ search: val, selectedPage: 0, resetPage: true })
  }

  filteredPokemons() {
    return this.props.pokemons && this.props.pokemons
      .filter(p => p.name.includes(this.state.search || ''))
  }

  pokemonsToShow() {
    return this.filteredPokemons().slice(this.state.selectedPage * TILES_BY_PAGE, (this.state.selectedPage + 1) * TILES_BY_PAGE)
  }

  numberOfPages() {
    return this.filteredPokemons() && Math.ceil(this.filteredPokemons().length / TILES_BY_PAGE)
  }

  render() {
    const { classes, pokemons } = this.props
    const { dialogOpen, selectedPokemon, selectedPokemonName, resetPage } = this.state

    return (
      <>
        <CssBaseline/>
        <SearchAppBar onChange={e => this.handleSearch(e)}/>
        <Container className={classes.container}>
          <PokemonList pokemons={this.pokemonsToShow()} showDialog={e => this.showDialog(e)}/>
          {this.numberOfPages() > 1 ?
            <Pagination
              max={this.numberOfPages()}
              onChange={(e) => this.handlePaginationChange(e - 1)}
              onSelect={(e) => this.handlePaginationSelect(e - 1)}
              reset={resetPage}
            /> : null}

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
