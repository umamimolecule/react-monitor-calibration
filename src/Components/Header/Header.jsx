import React, { Component } from "react";

import "./Header.css";
import CurrentSlideHeader from "./CurrentSlideHeader";
import InstructionsHeader from "./InstructionsHeader";
import WhatIsThis from "./WhatIsThis";

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <CurrentSlideHeader />
        <div class="Header-columns">
          <WhatIsThis />
          <InstructionsHeader
            text={
              "Click on window or press any key to jump to the next slide, or use arrow keys to go back and forward"
            }
          />
        </div>
      </div>
    );
  }
}
