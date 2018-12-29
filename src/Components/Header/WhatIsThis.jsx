import React, { Component } from "react";

import "./WhatIsThis.css";

export default class WhatIsThis extends Component {
  render() {
    const className = this.props.compact ? "WhatIsThis-compact" : "WhatIsThis";
    const contentClassName = this.props.compact
      ? "WhatIsThis-link-content-compact"
      : "";
    const linkContent = this.props.compact ? "" : "Monitor Calibration Helper";
    return (
      <div className={className}>
        <a
          href="https://github.com/umamimolecule/react-monitor-calibration"
          target="__blank"
        >
          <div className={contentClassName}>{linkContent}</div>
        </a>
      </div>
    );
  }
}
