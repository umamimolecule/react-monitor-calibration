import React, { Component } from "react";
import T from "prop-types";

import "./InstructionsHeader.css";

export default class InstructionsHeader extends Component {
  render() {
    return <div className="InstructionsHeader">{this.props.text}</div>;
  }
}

InstructionsHeader.propTypes = {
  text: T.string
};
