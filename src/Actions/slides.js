export const SHOW_NEXT_SLIDE = "SHOW_NEXT_SLIDE";
export const SHOW_PREVIOUS_SLIDE = "SHOW_PREVIOUS_SLIDE";

export function showNextSlide() {
  return { type: SHOW_NEXT_SLIDE };
}

export function showPreviousSlide() {
  return { type: SHOW_PREVIOUS_SLIDE };
}
