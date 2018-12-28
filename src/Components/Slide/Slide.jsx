import React, { Component } from "react";
import { connect } from "react-redux";
import T from "prop-types";

import "./Slide.css";
import ColorBar from "./ColorBar";
import { showNextSlide, showPreviousSlide } from "../../Actions/slides";

class Slide extends Component {
  onKeyPress = e => {
    if (e.keyCode === 37) {
      this.props.showPreviousSlide();
    } else {
      this.props.showNextSlide();
    }
  };

  onClick = () => {
    this.props.showNextSlide();
  };

  componentDidMount() {
    document.addEventListener("keypress", this.onKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.onKeyPress);
  }

  render() {
    return (
      <div className="Slide" onClick={this.onClick}>
        {this.props.colors.map((color, index) => {
          return <ColorBar key={index} color={color} />;
        })}
      </div>
    );
  }
}

Slide.propTypes = {
  colors: T.arrayOf(T.string.isRequired).isRequired
};

const mapStateToProps = state => ({
  colors: state.slides.currentSlide.colors
});

const mapDispatchToProps = dispatch => ({
  showNextSlide: () => {
    dispatch(showNextSlide());
  },

  showPreviousSlide: () => {
    dispatch(showPreviousSlide());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slide);
