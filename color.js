import { converter, formatHex, samples, toGamut } from "https://esm.sh/culori";

export const to_okhsl = converter("okhsl");

export const to_okhsl_gamut = toGamut("okhsl");

export const random_color = () => {
  const rgb = Array.from({ length: 3 })
    .map(() => Math.floor(Math.random() * 256))
    .join(", ");
  return formatHex(`rgb(${rgb})`);
};

export const init_color = () => {
  let c = decodeURIComponent(window.location.hash.substring(1)).trim();
  if (/^[0-9a-z]{3}|[0-9a-z]{6}$/i.test(c)) c = `#${c}`;
  if (to_okhsl(c)) return c;
  return random_color();
};

const pallet_hue_deltas = [
  ["Base", [0]],
  ["Complementary", [180]],
  ["Split Complementary", [150, 210]],
  ["Triadic", [120, 240]],
  ["Tetradic", [90, 180, 270]],
  ["Analogous", [30, 60]],
];

const adjust_hue = (base, hue) => {
  const h = (base.h + hue) % 360;
  return { ...base, h };
};

const shade_samples = (() => {
  const samps = samples(11);
  samps[0] = 0.05;
  samps[10] = 0.95;
  return samps.map((s) => 1 - s * 0.8);
})();

export const shade_levels = () => {
  const samps = samples(11);
  samps[0] = 0.05;
  samps[10] = 0.95;
  return samps.map((i) => i * 1000);
};

const mk_shades = (okhsl_color) =>
  shade_samples.map((l) => formatHex({ ...okhsl_color, l }));

export const mk_shade_groups = (okhsl_color) =>
  pallet_hue_deltas.map(([title, hues]) => [
    title,
    hues.map((h) => mk_shades(adjust_hue(okhsl_color, h))),
  ]);
