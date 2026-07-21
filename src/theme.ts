import { CONTROLS } from "./controls";
import type { Mode, StudioData, ThemeValueSet } from "./types";

export const DEFAULT_DATA: StudioData = {
  themeName: "My First Theme",
  author: "",
  mode: "light",
  livePreview: true,
  values: { light: {}, dark: {}, shared: {}, customCss: "" }
};

export function cloneDefaults(): StudioData {
  return JSON.parse(JSON.stringify(DEFAULT_DATA)) as StudioData;
}

export function mergeData(raw: Partial<StudioData> | null): StudioData {
  const defaults = cloneDefaults();
  if (!raw) return defaults;
  return {
    ...defaults,
    ...raw,
    values: {
      light: { ...defaults.values.light, ...raw.values?.light },
      dark: { ...defaults.values.dark, ...raw.values?.dark },
      shared: { ...defaults.values.shared, ...raw.values?.shared },
      customCss: raw.values?.customCss ?? ""
    }
  };
}

export function getValue(data: StudioData, controlId: string, mode: Mode): string {
  const control = CONTROLS.find((item) => item.id === controlId);
  if (!control) return "";
  if (control.id === "custom-css") return data.values.customCss;
  if (control.scope === "shared") return data.values.shared[control.id] ?? control.defaultLight;
  const fallback = mode === "dark" ? control.defaultDark ?? control.defaultLight : control.defaultLight;
  return data.values[mode][control.id] ?? fallback;
}

export function setValue(data: StudioData, controlId: string, mode: Mode, value: string): void {
  const control = CONTROLS.find((item) => item.id === controlId);
  if (!control) return;
  if (control.id === "custom-css") data.values.customCss = value;
  else if (control.scope === "shared") data.values.shared[control.id] = value;
  else data.values[mode][control.id] = value;
}

function declarations(values: ThemeValueSet, mode?: Mode): string[] {
  return CONTROLS.filter((control) => control.cssVar && (control.scope === "shared") === !mode).map((control) => {
    const value = mode
      ? values[mode][control.id] ?? (mode === "dark" ? control.defaultDark ?? control.defaultLight : control.defaultLight)
      : values.shared[control.id] ?? control.defaultLight;
    return `  ${control.cssVar}: ${value};`;
  });
}

export function generateThemeCss(data: StudioData): string {
  const safeName = data.themeName.trim() || "Untitled Theme";
  const author = data.author.trim() || "Your name";
  const shared = declarations(data.values);
  const light = declarations(data.values, "light");
  const dark = declarations(data.values, "dark");
  const custom = data.values.customCss.trim();
  return `/*
 * ${safeName}
 * Designed by ${author} with Theme School.
 * This file is standalone: Theme School can now be disabled or removed.
 */

body {
${shared.join("\n")}
}

.theme-light {
${light.join("\n")}
}

.theme-dark {
${dark.join("\n")}
}
${custom ? `\n/* Hand-written CSS: your graduation layer */\n${custom}\n` : ""}`;
}

export function generateThemeManifest(data: StudioData): string {
  return JSON.stringify({
    name: data.themeName.trim() || "Untitled Theme",
    version: "0.1.0",
    minAppVersion: "1.6.0",
    author: data.author.trim() || "Your name"
  }, null, 2) + "\n";
}

export function contrastRatio(foreground: string, background: string): number | null {
  const parse = (hex: string): number[] | null => {
    const normalized = hex.replace("#", "");
    if (!/^[0-9a-f]{6}$/i.test(normalized)) return null;
    return [0, 2, 4].map((index) => parseInt(normalized.slice(index, index + 2), 16) / 255);
  };
  const luminance = (rgb: number[]): number => rgb.map((channel) => channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
    .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
  const foregroundRgb = parse(foreground);
  const backgroundRgb = parse(background);
  if (!foregroundRgb || !backgroundRgb) return null;
  const lighter = Math.max(luminance(foregroundRgb), luminance(backgroundRgb));
  const darker = Math.min(luminance(foregroundRgb), luminance(backgroundRgb));
  return (lighter + 0.05) / (darker + 0.05);
}
