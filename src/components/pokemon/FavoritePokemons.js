import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'

import '../../App.css'

// ===================================================================================================================
//      CLASS
// ===================================================================================================================

class FavoritePokemons extends Component {
  handleDelete(name) {
    this.props.invertPokemonFavorite(name)
  }

  render() {
    const { classes, pokemons } = this.props

    const favorites = pokemons && pokemons.filter(p => p.isFavorite)

    const list = favorites && favorites.map(p => {
      const index = p.url && p.url.split('/')[p.url.split('/').length - 2]
      const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`

      return (
        <Chip
          className={classes.chip}
          key={p.name}
          avatar={<Avatar alt={p.name} src={imgUrl}/>}
          label={p.name}
          onDelete={() => this.handleDelete(p.name)}
        />
      )
    })

    return (
      <>
        {favorites && favorites.length ?
          <div className={classes.root}>
            <Typography variant="h6" className={classes.favoritesTitle}>Favoris</Typography>
            {list}
          </div> : null
        }
      </>
    )
  }
}

// ===================================================================================================================
//      PROPTYPES
// ===================================================================================================================

FavoritePokemons.propTypes = {
  classes: PropTypes.object.isRequired
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
    invertPokemonFavorite: data => {dispatch({ type: 'INVERT_POKEMON_FAVORITE', name: data })}
  }
}

// ===================================================================================================================
// STYLES
// ===================================================================================================================

const styles = theme => ({
  root: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: '30px',
    padding: '20px'
  },
  favoritesTitle: {
    color: 'white',
    marginBottom: '10px'
  },
  chip: {
    margin: theme.spacing(0.5)
  }
})

export default compose(
  withStyles(styles, { name: 'FavoritePokemons' }),
  connect(mapStateToProps, mapDispatchToProps)
)(FavoritePokemons)