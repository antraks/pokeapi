import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import Slider from "@material-ui/core/Slider"

// ===================================================================================================================
//      CLASS
// ===================================================================================================================

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 1
    }
  }

  handleChange(val) {
    this.setState({ value: val })
  }

  componentDidUpdate(prevProps) {
    if (this.props.reset !== prevProps.reset) {
      this.setState({ value: 1 })
    }
  }

  render() {
    const { classes, max } = this.props

    return (
      <>
        <Slider
          className={classes.slider}
          defaultValue={1}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          onChange={(e, val) => this.handleChange(val)}
          onChangeCommitted={(e, val) => this.props.onSelect(val)}
          step={1}
          marks
          min={1}
          max={max}
          value={this.state.value}
        />
      </>
    )
  }
}

// ===================================================================================================================
//      PROPTYPES
// ===================================================================================================================

Pagination.propTypes = {
  classes: PropTypes.object.isRequired,
  reset: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
}

// ===================================================================================================================
//      STYLES
// ===================================================================================================================

const styles = () => ({
  slider: {
    marginTop: '30px'
  }
})

export default withStyles(styles)(Pagination)