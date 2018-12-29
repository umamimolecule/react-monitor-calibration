import React, { Component } from "react";
import { connect } from "react-redux";
import T from "prop-types";

import "./Slide.css";
import ColorBar from "./ColorBar";
import {
  showNextSlide,
  showPreviousSlide,
  gotoSlide
} from "../../Actions/slides";

class Slide extends Component {
  onKeyDown = e => {
    console.log(e);
    if (e.keyCode === 37) {
      this.props.showPreviousSlide();
    } else {
      this.props.showNextSlide();
    }
  };

  onClick = () => {
    this.props.showNextSlide();
  };

  synchroniseWithOtherPages = () => {
    var syncData = JSON.parse(window.localStorage.getItem("syncdata"));
    if (
      syncData &&
      syncData.id !== this.props.uniqueId &&
      syncData.slideIndex !== this.props.currentSlideIndex
    ) {
      this.props.gotoSlide(syncData.slideIndex, true);
    }
    setTimeout(this.synchroniseWithOtherPages, 200);
  };

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
    setTimeout(this.synchroniseWithOtherPages, 1000);
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
  uniqueId: state.slides.uniqueId,
  colors: state.slides.currentSlide.colors,
  currentSlideIndex: state.slides.currentSlideIndex
});

const mapDispatchToProps = dispatch => ({
  showNextSlide: () => {
    dispatch(showNextSlide());
  },

  showPreviousSlide: () => {
    dispatch(showPreviousSlide());
  },

  gotoSlide: index => {
    dispatch(gotoSlide(index));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slide);
