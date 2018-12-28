import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import T from "prop-types";

import "./Slides.css";

import Slide from "../Slide/Slide";
import Header from "../Header/Header";

class Slides extends Component {
  render() {
    return (
      <div>
        <Header />
        <Slide />
      </div>
    );
  }
}

Slides.propTypes = {
  slides: T.arrayOf(
    T.shape({
      colors: T.arrayOf(T.string.isRequired).isRequired
    })
  ),
  showNextSlide: T.func.isRequired,
  showPreviousSlide: T.func.isRequired
};

const mapStateToProps = state => ({
  slides: state.slides
});

export default connect(mapStateToProps)(Slides);
