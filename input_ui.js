import "https://esm.sh/simple-hue-picker";
import { html } from "https://esm.sh/@arrow-js/core";
import { random_color } from "./color.js";
import { input_store, color_store } from "./store.js";

const handle_input_change = (e) => {
  input_store.value = e.currentTarget.value;
};

const handle_hue_change = (e) => {
  input_store.update_with_hue(e.detail);
};

const handle_random_color = (_e) => {
  input_store.value = random_color();
};

export const input_ui = () =>
  html` <section class="input-section">
    <div class="input-wrap">
      <div
        class="current-color"
        style="${() => `
           background: ${color_store.base};
           border-color: ${color_store.base}`}"
      ></div>
      <input
        class="${() => (input_store.indicates_error ? "input error" : "input")}"
        placeholder="#hex, rgb, hsl etc."
        type="text"
        value="${() => input_store.value}"
        @input="${handle_input_change}"
      />
      <button type="button" @click="${handle_random_color}">🎲</button>
    </div>
    <div class="hue-picker">
      ${() =>
        html`<hue-picker
          value="${color_store.hue()}"
          @change="${handle_hue_change}"
        />`}
    </div>
  </section>`;
