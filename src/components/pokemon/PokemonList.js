import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Typography from "@material-ui/core/Typography"

import '../../App.css'

import PokemonTile from './PokemonTile'

// ===================================================================================================================
//      CLASS
// ===================================================================================================================

class PokemonList extends Component {
  render() {
    const { classes, pokemons, showDialog } = this.props

    const list = pokemons && pokemons.map(p => {
      return (
        <Grid item xs={6} sm={3} key={p.name}>
          <PokemonTile
            name={p.name}
            url={p.url}
            isFavorite={p.isFavorite}
            onClick={() => showDialog(p.name)}
          />
        </Grid>
      )
    })

    return (
      <div className={classes.root}>
        {pokemons && pokemons.length ?
          <Grid container spacing={3}>
            {list}
          </Grid> :
          <Typography className={classes.notFound} variant="h6" noWrap>
            Aucun pokemon trouvé !
          </Typography>}
      </div>
    )
  }
}

// ===================================================================================================================
//      PROPTYPES
// ===================================================================================================================

PokemonList.propTypes = {
  classes: PropTypes.object.isRequired,
  pokemons: PropTypes.array.isRequired,
  showDialog: PropTypes.func.isRequired
}

// ===================================================================================================================
// STYLES
// ===================================================================================================================

const styles = () => ({
  notFound: {
    fontFamily: 'PokemonFont',
    textAlign: 'center',
    marginTop: '40px'
  }
})

export default withStyles(styles)(PokemonList)