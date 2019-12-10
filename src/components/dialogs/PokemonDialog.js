import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'

import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import Chip from '@material-ui/core/Chip'
import LinearProgress from '@material-ui/core/LinearProgress'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Typography from '@material-ui/core/Typography'
import PropTypes from "prop-types";

const TYPE_COLORS = {
  normal: 'A8A77A',
  fire: 'EE8130',
  water: '6390F0',
  electric: 'F7D02C',
  grass: '7AC74C',
  ice: '96D9D6',
  fighting: 'C22E28',
  poison: 'A33EA1',
  ground: 'E2BF65',
  flying: 'A98FF3',
  psychic: 'F95587',
  bug: 'A6B91A',
  rock: 'B6A136',
  ghost: '735797',
  dragon: '6F35FC',
  dark: '705746',
  steel: 'B7B7CE',
  fairy: 'D685AD'
}

// ===================================================================================================================
//      CLASS
// ===================================================================================================================

class PokemonDialog extends Component {
  handleFavoriteClick() {
    this.props.onFavoriteClick()
    this.props.onClose()
  }

  render() {
    const { classes, data, onClose, open, isFavorite } = this.props

    const name = this.props.name && this.props.name.slice(0, 1).toUpperCase() + this.props.name.slice(1, this.props.name.length)
    let id = data && data.id && new Array(4 - (data.id + '').length).join('0') + data.id
    const imgUrl = data && `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`

    const types = data && data.types.sort((a, b) => (a.slot > b.slot) ? 1 : -1).map(t => {
      return (
        <Chip size="small" className={classes.chip} label={t.type.name} style={{ backgroundColor: `#${TYPE_COLORS[t.type.name]}` }} key={t.slot}/>
      )
    })

    const stats = data && data.stats.map(s => {
      return (
        <Grid container key={s.stat.name} alignItems="center" className={classes.stat}>
          <Grid item xs={4}>
            <span>{s.stat.name}</span>
          </Grid>
          <Grid item xs={8}>
            <LinearProgress variant="determinate" className={classes.progress} value={s.base_stat}/>
          </Grid>
        </Grid>
      )
    })

    const DialogTitle = withStyles(styles)(props => {
      const { children, classes, onClose, ...other } = props
      return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
          <Typography variant="h6">{children}</Typography>
          <div className={classes.actions}>
            <IconButton aria-label="favorite" className={classes.favoriteButton} onClick={() => this.handleFavoriteClick()}>
              {isFavorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
            </IconButton>
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
              <CloseIcon/>
            </IconButton>
          </div>
        </MuiDialogTitle>
      )
    })

    return (
      <Dialog onClose={onClose} fullWidth={true} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title" onClose={onClose}>
          {name}
        </DialogTitle>
        <div className={classes.content}>
          {data ? (<>
            <img src={imgUrl} alt={name} width="200"/>
            <div className={classes.infos}>
              <div className={classes.types}>
                {types}
              </div>
              <Grid className={classes.measures} container>
                <Grid item xs={6}>
                  <div>height: {data && data.height / 10} m</div>
                </Grid>
                <Grid item xs={6}>
                  <div>weight: {data && data.weight / 10} kg</div>
                </Grid>
              </Grid>
              {stats}
            </div>
          </>) : (<CircularProgress/>)}
        </div>
      </Dialog>
    )
  }
}

// ===================================================================================================================
//      PROPTYPES
// ===================================================================================================================

PokemonDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  open: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool,
  name: PropTypes.string
}

// ===================================================================================================================
//      STYLES
// ===================================================================================================================

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    color: theme.palette.grey[500],
  },
  actions: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1)
  },
  content: {
    padding: '0 20px 20px',
    minHeight: '240px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      marginRight: '30px'
    }
  },
  infos: {
    width: '100%'
  },
  types: {
    marginBottom: '15px'
  },
  chip: {
    marginRight: '5px',
    color: 'white'
  },
  measures: {
    marginBottom: '15px'
  },
  stat: {
    padding: '2px 0'
  },
  progress: {
    height: '8px'
  }
})

export default withStyles(styles)(PokemonDialog)