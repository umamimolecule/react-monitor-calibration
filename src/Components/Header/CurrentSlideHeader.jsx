import React, { Component } from "react";
import { connect } from "react-redux";
import T from "prop-types";

import "./CurrentSlideHeader.css";

class CurrentSlideHeader extends Component {
  render() {
    return (
      <div className="CurrentSlideHeader">
        Slide {this.props.currentSlide} of {this.props.totalSlideCount}
      </div>
    );
  }
}

CurrentSlideHeader.propTypes = {
  currentSlide: T.number.isRequired,
  totalSlideCount: T.number.isRequired
};

const mapStateToProps = state => ({
  currentSlide: state.slides.currentSlideIndex + 1,
  totalSlideCount: state.slides.slides.length
});

export default connect(mapStateToProps)(CurrentSlideHeader);
