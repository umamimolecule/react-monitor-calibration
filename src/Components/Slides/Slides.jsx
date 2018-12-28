import React, { Component } from "react";

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
