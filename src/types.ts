export type Mode = "light" | "dark";
export type Category = "Colour" | "Typography" | "Shape & spacing" | "Editor" | "Navigation" | "Advanced";
export type ControlKind = "color" | "range" | "select" | "text" | "toggle";

export interface ThemeValueSet {
  light: Record<string, string>;
  dark: Record<string, string>;
  shared: Record<string, string>;
  customCss: string;
}

export interface StudioData {
  themeName: string;
  author: string;
  mode: Mode;
  livePreview: boolean;
  values: ThemeValueSet;
}

export interface ThemeControl {
  id: string;
  label: string;
  category: Category;
  cssVar: string;
  kind: ControlKind;
  description: string;
  lesson: string;
  defaultLight: string;
  defaultDark?: string;
  scope?: "mode" | "shared";
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: Array<{ label: string; value: string }>;
}
