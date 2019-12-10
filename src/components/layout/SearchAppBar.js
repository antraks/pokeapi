import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Badge from '@material-ui/core/Badge'

import '../../App.css'

import { fade, withStyles } from '@material-ui/core/styles'

// ===================================================================================================================
//      CLASS
// ===================================================================================================================

class SearchAppBar extends Component {
  render() {
    const { classes, pokemons } = this.props

    const favorites = pokemons && pokemons.filter(p => p.isFavorite)

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon/>
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              PokeAPI
            </Typography>
            {favorites && favorites.length > 0 ?
              <Badge badgeContent={favorites.length} className={classes.badge} color="secondary">
                <FavoriteIcon/>
              </Badge> : null
            }
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <InputBase
                placeholder="Chercher…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={e => this.props.onChange(e.target.value)}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

// ===================================================================================================================
//      PROPTYPES
// ===================================================================================================================

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
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
//      STYLES
// ===================================================================================================================

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    fontFamily: 'PokemonFont',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  badge: {
    marginRight: '20px'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
})

export default compose(
  withStyles(styles, { name: 'SearchAppBar' }),
  connect(mapStateToProps)
)(SearchAppBar)