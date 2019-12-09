import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import '../../App.css'

import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'

// ===================================================================================================================
//      CLASS
// ===================================================================================================================

class PokemonTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      name: null,
      url: null
    }
  }

  render() {
    const { classes } = this.props

    const name = this.props.name.slice(0, 1).toUpperCase() + this.props.name.slice(1, this.props.name.length)
    const url = this.props.url
    const index = url && url.split('/')[url.split('/').length - 2]
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`

    return (
      <Card
        className={classes.card}
        onClick={() => this.props.onClick()}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="avatar" className={classes.avatar}>
              <img src={imgUrl} alt={name} height="40" width="40"/>
            </Avatar>
          }
          title={name}
        />
      </Card>
    )
  }
}

// ===================================================================================================================
//      STYLES
// ===================================================================================================================

const styles = theme => ({
  card: {
    userSelect: 'none',
    cursor: 'pointer',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    fontFamily: 'PokemonFont, sans-serif',
    fontSize: '20px',
    '&:hover': {
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
    }
  }
})

PokemonTile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PokemonTile)