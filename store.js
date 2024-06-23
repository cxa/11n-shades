import { formatHex } from "https://esm.sh/culori";
import { reactive } from "https://esm.sh/@arrow-js/core";
import {
  init_color,
  mk_shade_groups,
  shade_levels,
  to_okhsl,
  to_okhsl_gamut,
} from "./color.js";

export const input_store = reactive({
  value: "",
  should_show_error: () => {
    const trim = input_store.value.trim();
    const is_empty = trim.length === 0;
    if (is_empty) false;
    return !!to_okhsl(trim);
  },

  update_with_hue: (hue) => {
    const l = Math.max(60, Math.random() * 80);
    const c = Math.random() * 0.2;
    const color = formatHex(to_okhsl_gamut(`oklch(${l}% ${c} ${hue})`));
    input_store.value = color;
  },
});

export const color_store = reactive({
  base: "",
  hue: () => color_store.base && to_okhsl(color_store.base).h,
  // [["title", [[shades...], [shades...], ...]]]
  shades: () =>
    color_store.base ? mk_shade_groups(to_okhsl(color_store.base)) : [],

  pretty_json: () => {
    const json = {};
    const levels = shade_levels();
    for (const [title, shade_groups] of color_store.shades()) {
      let key = title.split(/\s/).join(".").toLowerCase();
      json[key] = shade_groups.map((group) =>
        Object.fromEntries(group.map((shade, i) => [levels[i], shade])),
      );
      if (json[key].length == 1) json[key] = json[key][0];
      else
        json[key] = Object.fromEntries(json[key].map((v, i) => ["abc"[i], v]));
    }

    return JSON.stringify(json, null, 2);
  },
});

input_store.$on("value", (input_color) => {
  const okhsl_color = to_okhsl(input_color);
  // update only if we can get valid color from input
  if (okhsl_color) color_store.base = formatHex(okhsl_color);
});

input_store.value = init_color();
