import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import T from "prop-types";

import "./Slides.css";

import Slide from "../Slide/Slide";
import Header from "../Header/Header";

export default class Slides extends Component {
  render() {
    return (
      <div>
        <Header />
        <Slide />
      </div>
    );
  }
}
