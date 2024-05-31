import { html } from "https://esm.sh/@arrow-js/core";
import { color_store } from "./store.js";

export const export_ui = () =>
  html`<div class="export">
    <h2>Export</h2>
    <textarea value="${color_store.pretty_json}" />
  </div>`;
