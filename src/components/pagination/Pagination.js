import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import Slider from "@material-ui/core/Slider"

// ===================================================================================================================
//      CLASS
// ===================================================================================================================

class Pagination extends Component {
  render() {
    const { classes } = this.props

    // const buttons = [...Array(this.props.max)].map((e, i) => <Button variant="contained" key={i} onClick={() => this.props.onSelect(i)}>{i + 1}</Button>)

    return (
      <>
        <Slider
          className={classes.slider}
          defaultValue={1}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          onChangeCommitted={(e, val) => this.props.onSelect(val)}
          step={1}
          marks
          min={1}
          max={this.props.max}
        />
      </>
    )
  }
}

// ===================================================================================================================
//      STYLES
// ===================================================================================================================

const styles = theme => ({
  slider: {
    marginTop: '30px'
  }
})

Pagination.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Pagination)