import uuidv4 from "uuid/v4";

import {
  SHOW_NEXT_SLIDE,
  SHOW_PREVIOUS_SLIDE,
  GOTO_SLIDE
} from "../Actions/slides";

const black = "#000000";
const red = "#ff0000";
const green = "#00ff00";
const blue = "#0000ff";
const grey1 = "#3f3f3f";
const grey2 = " #7f7f7f";
const grey3 = "#c4c4c4";
const white = "#ffffff";
const blue1 = "#3f3fff";
const blue2 = "#7070FF";
const blue3 = "#9E9EFF";
const blue4 = "#c4c4ff";
const green1 = "#3f7f3f";
const green2 = "#52A552";
const green3 = "#66CC66";
const green4 = "#7FFF7F";
const red1 = "#ff1f1f";
const red2 = "#FF6060";
const red3 = "#FF9696";
const red4 = "#FFC1C1";

const slidesArray = [
  {
    colors: [red, green, blue, white]
  },
  {
    colors: [grey1, grey2, grey3, white]
  },
  {
    colors: [black]
  },
  {
    colors: [grey1]
  },
  {
    colors: [grey2]
  },
  {
    colors: [grey3]
  },
  {
    colors: [white]
  },
  {
    colors: [red1, red2, red3, red4]
  },
  {
    colors: [green1, green2, green3, green4]
  },
  {
    colors: [blue1, blue2, blue3, blue4]
  }
];

export const initialSlidesState = {
  currentSlideIndex: 0,
  currentSlide: slidesArray[0],
  slides: slidesArray,
  uniqueId: uuidv4()
};

export default function slides(state = initialSlidesState, action) {
  switch (action.type) {
    case SHOW_NEXT_SLIDE:
      const nextSlideIndex =
        (state.currentSlideIndex + 1) % state.slides.length;
      updateLocalStorage(nextSlideIndex, state.uniqueId);
      return {
        ...state,
        currentSlideIndex: nextSlideIndex,
        currentSlide: state.slides[nextSlideIndex]
      };
    case SHOW_PREVIOUS_SLIDE:
      const previousSlideIndex =
        (state.currentSlideIndex - 1 + state.slides.length) %
        state.slides.length;
      updateLocalStorage(previousSlideIndex, state.uniqueId);
      return {
        ...state,
        currentSlideIndex: previousSlideIndex,
        currentSlide: state.slides[previousSlideIndex]
      };
    case GOTO_SLIDE:
      let index = action.index;
      if (index < 0 || index >= state.slides.length) {
        index = 0;
      }
      return {
        ...state,
        currentSlideIndex: index,
        currentSlide: state.slides[index]
      };
    default:
      return state;
  }
}

function updateLocalStorage(currentSlideIndex, uniqueId) {
  var payload = {
    id: uniqueId,
    slideIndex: currentSlideIndex,
    date: Date.now()
  };
  window.localStorage.setItem("syncdata", JSON.stringify(payload));
}
