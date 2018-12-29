import React, { Component } from "react";

import "./WhatIsThis.css";

export default class WhatIsThis extends Component {
  render() {
    const className = this.props.compact ? "WhatIsThis-compact" : "WhatIsThis";
    const linkText = this.props.compact ? " " : "Monitor Calibration Helper";
    return (
      <div className={className}>
        <a
          href="https://github.com/umamimolecule/react-monitor-calibration"
          target="__blank"
        >
          {linkText}
        </a>
      </div>
    );
  }
}
