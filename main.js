import { html } from "https://esm.sh/@arrow-js/core";
import { input_ui } from "./input_ui.js";
import { shades_ui } from "./shades_ui.js";
import { color_store } from "./store.js";

const main = () => {
  color_store.$on("base", (color) => {
    window.location = color;
  });
  const mainEl = document.querySelector("main");
  mainEl.innerHTML = "";
  html`${input_ui()} ${shades_ui()}`(mainEl);
};

main();
