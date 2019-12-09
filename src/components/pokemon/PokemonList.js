import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'

import PokemonTile from './PokemonTile'

// ===================================================================================================================
//      CLASS
// ===================================================================================================================

class PokemonList extends Component {
  render() {
    const { classes } = this.props

    const list = this.props.pokemons && this.props.pokemons.map(p => {
      return (
        <Grid item xs={6} sm={3} md={2} key={p.name}>
          <PokemonTile
            name={p.name}
            url={p.url}
            onClick={() => this.props.showDialog(p.name)}
          />
        </Grid>
      )
    })

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          {list}
        </Grid>
      </div>
    )
  }
}

// ===================================================================================================================
//      STYLES
// ===================================================================================================================

const styles = theme => ({
  root: {}
})

PokemonList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PokemonList)