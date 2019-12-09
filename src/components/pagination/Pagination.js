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
    // Typical usage (don't forget to compare props):
    // if (this.props.userID !== prevProps.userID) {
    //   this.fetchData(this.props.userID);
    // }
    if (this.props.reset !== prevProps.reset) {
      this.setState({ value: 1 })
    }
  }

  render() {
    const { classes, max, reset } = this.props

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