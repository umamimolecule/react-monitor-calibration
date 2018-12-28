import React, { Component } from "react";
import { connect } from "react-redux";

import "./Header.css";
import CurrentSlideHeader from "./CurrentSlideHeader";
import InstructionsHeader from "./InstructionsHeader";
import WhatIsThis from "./WhatIsThis";
import { showNextSlide, showPreviousSlide } from "../../Actions/slides";

class Header extends Component {
  onPreviousClick = () => {
    this.props.showPreviousSlide();
  };

  onNextClick = () => {
    this.props.showNextSlide();
  };

  render() {
    return (
      <div className="Header">
        <CurrentSlideHeader />
        <div className="Previous" onClick={this.onPreviousClick} />
        <div className="Header-columns">
          <WhatIsThis />
          <InstructionsHeader
            text={
              "Click on window or press any key to jump to the next slide, or use arrow keys to go back and forward"
            }
          />
        </div>
        <div className="Next" onClick={this.onNextClick} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showNextSlide: () => {
    dispatch(showNextSlide());
  },

  showPreviousSlide: () => {
    dispatch(showPreviousSlide());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Header);
