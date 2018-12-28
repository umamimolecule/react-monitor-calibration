import React, { Component } from "react";
import T from "prop-types";

import "./ColorBar.css";

export default class ColorBar extends Component {
  render() {
    return (
      <div className="ColorBar" style={{ backgroundColor: this.props.color }} />
    );
  }
}

ColorBar.propTypes = {
  color: T.string.isRequired
};
