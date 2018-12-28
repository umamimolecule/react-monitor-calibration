import React, { Component } from "react";
import T from "prop-types";

import "./InstructionsHeader.css";

export default class InstructionsHeader extends Component {
  openInNewWindow = () => {
    window.open(window.location.href, "_blank");
  };

  render() {
    return (
      <div className="InstructionsHeader-container">
        <div
          className="InstructionsHeader-newwindow"
          onClick={this.openInNewWindow}
        >
          Click here to open page in another window
        </div>
        <div className="InstructionsHeader">{this.props.text}</div>
      </div>
    );
  }
}

InstructionsHeader.propTypes = {
  text: T.string
};
