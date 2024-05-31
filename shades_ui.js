import { html } from "https://esm.sh/@arrow-js/core";
import { color_store } from "./store.js";
import { export_ui } from "./export_ui.js";

export const shades_ui = () =>
  html`<section>
    ${() =>
      // [["title", [[shades...], [shades...], ...]]]
      color_store.shades().map(([title, groups], i) =>
        html`<div class="shade-group">
          <h2>${title}</h2>
          ${groups.map((shades, j) =>
            html`<div class="shades">
              ${shades.map((s, k) =>
                html`<div
                  style="background: ${s}"
                  class="${() => (k > 3 ? "fg-light" : "fg-dark")}"
                ></div>`.key(s),
              )}
            </div>`.key(JSON.stringify(shades)),
          )}
        </div>`.key(JSON.stringify(groups)),
      )}
    ${export_ui}
  </section>`;
