import React, { Component } from "react";
import { connect } from "react-redux";

import "./Header.css";
import CurrentSlideHeader from "./CurrentSlideHeader";
import InstructionsHeader from "./InstructionsHeader";
import WhatIsThis from "./WhatIsThis";
import { showNextSlide, showPreviousSlide } from "../../Actions/slides";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth };
  }

  onPreviousClick = () => {
    this.props.showPreviousSlide();
  };

  onNextClick = () => {
    this.props.showNextSlide();
  };

  onWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentWillMount() {
    window.addEventListener("resize", this.onWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowSizeChange);
  }

  renderNormal() {
    return (
      <div className="Header-normal-container">
        <div className="Header-normal">
          <CurrentSlideHeader />
          <div className="Previous-normal" onClick={this.onPreviousClick} />
          <div className="Header-normal-columns">
            <WhatIsThis />
            <InstructionsHeader
              text={
                "Click on window or press any key to jump to the next slide, or use arrow keys to go back and forward"
              }
            />
          </div>
          <div className="Next-normal" onClick={this.onNextClick} />
        </div>
      </div>
    );
  }

  renderCompact() {
    return (
      <div>
        <div className="Header-compact-container">
          <div className="Header-compact">
            <div className="Previous-compact" onClick={this.onPreviousClick} />
            <CurrentSlideHeader />
            <div className="Next-compact" onClick={this.onNextClick} />
          </div>
        </div>
        <div className="Footer-compact">
          <WhatIsThis compact={true} />
        </div>
      </div>
    );
  }

  render() {
    if (this.state.width <= 1000) {
      return this.renderCompact();
    } else {
      return this.renderNormal();
    }
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
