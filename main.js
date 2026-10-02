var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ThemeStudioPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// src/controls.ts
var CATEGORIES = ["Colour", "Typography", "Shape & spacing", "Editor", "Navigation", "Advanced"];
var TEXT_FONTS = [
  { label: "System default", value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", description: "Clean, familiar, and available on every device" },
  { label: "Arial", value: "Arial, sans-serif", description: "Neutral and highly portable" },
  { label: "Helvetica", value: "Helvetica, Arial, sans-serif", description: "Crisp and restrained" },
  { label: "Verdana", value: "Verdana, Geneva, sans-serif", description: "Open and very readable at small sizes" },
  { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif", description: "Friendly with a little personality" },
  { label: "Avenir Next", value: "'Avenir Next', Avenir, sans-serif", description: "Geometric and polished; mainly Apple devices" },
  { label: "Gill Sans", value: "'Gill Sans', 'Gill Sans MT', sans-serif", description: "Humanist and elegant; availability varies" },
  { label: "Chalkboard SE", value: "'Chalkboard SE', Chalkboard, cursive", description: "Friendly handwritten lettering included with macOS" },
  { label: "Chalkboard", value: "Chalkboard, 'Chalkboard SE', cursive", description: "The original macOS chalk-style family" },
  { label: "Dreaming Outloud Pro", value: "'Dreaming Outloud Pro', 'Chalkboard SE', cursive", description: "Microsoft 365 cloud font; must also be available to Obsidian" },
  { label: "Dreaming Outloud Script Pro", value: "'Dreaming Outloud Script Pro', 'Dreaming Outloud Pro', 'Chalkboard SE', cursive", description: "Microsoft 365 script font; must also be available to Obsidian" },
  { label: "Atkinson Hyperlegible", value: "'Atkinson Hyperlegible', Arial, sans-serif", description: "Accessibility-focused; must be installed" },
  { label: "Georgia", value: "Georgia, serif", description: "Warm, sturdy, and designed for screens" },
  { label: "Palatino", value: "Palatino, 'Palatino Linotype', serif", description: "Bookish and spacious" },
  { label: "Baskerville", value: "Baskerville, Georgia, serif", description: "Literary and refined; availability varies" },
  { label: "Times New Roman", value: "'Times New Roman', Times, serif", description: "Traditional and highly portable" }
];
var CODE_FONTS = [
  { label: "System monospace", value: "'SFMono-Regular', Consolas, 'Liberation Mono', monospace", description: "Uses the device\u2019s dependable code font" },
  { label: "SF Mono", value: "'SFMono-Regular', Menlo, monospace", description: "Clean Apple code font; falls back to Menlo" },
  { label: "Menlo", value: "Menlo, Monaco, monospace", description: "Clear and compact; common on Apple devices" },
  { label: "Monaco", value: "Monaco, 'Courier New', monospace", description: "Classic Mac coding character" },
  { label: "Consolas", value: "Consolas, 'Liberation Mono', monospace", description: "Readable Windows code font" },
  { label: "Courier New", value: "'Courier New', Courier, monospace", description: "Typewriter-like and widely available" },
  { label: "Fira Code", value: "'Fira Code', monospace", description: "Modern coding font; must be installed" },
  { label: "JetBrains Mono", value: "'JetBrains Mono', monospace", description: "Spacious coding font; must be installed" }
];
var CONTROLS = [
  { id: "background-primary", label: "Note background", category: "Colour", cssVar: "--background-primary", kind: "color", description: "The main canvas behind notes and most panels.", lesson: "A theme starts with surfaces. In a light baseline this is usually the palest colour; in a dark baseline it is usually the darkest.", defaultLight: "#ffffff", defaultDark: "#1e1e1e" },
  { id: "background-secondary", label: "Sidebar background", category: "Colour", cssVar: "--background-secondary", kind: "color", description: "Sidebars, ribbons, and secondary surfaces.", lesson: "A small contrast from the note background creates hierarchy without adding borders everywhere.", defaultLight: "#f6f6f6", defaultDark: "#262626" },
  { id: "background-secondary-alt", label: "Raised sidebar surface", category: "Colour", cssVar: "--background-secondary-alt", kind: "color", description: "Headers and surfaces raised above sidebars.", lesson: "Use this as the third step in your surface ladder. Keep neighbouring steps distinguishable but calm.", defaultLight: "#e3e3e3", defaultDark: "#363636" },
  { id: "text-normal", label: "Body text", category: "Colour", cssVar: "--text-normal", kind: "color", description: "Normal reading and interface text.", lesson: "Body text needs your strongest sustained contrast. Pure black/white can feel harsh, so near-black or off-white often reads better.", defaultLight: "#222222", defaultDark: "#dadada" },
  { id: "text-muted", label: "Muted text", category: "Colour", cssVar: "--text-muted", kind: "color", description: "Metadata, inactive labels, and supporting text.", lesson: "Muted does not mean illegible. It still needs enough contrast for real information.", defaultLight: "#5a5a5a", defaultDark: "#bababa" },
  { id: "interactive-accent", label: "Accent", category: "Colour", cssVar: "--interactive-accent", kind: "color", description: "Primary buttons, toggles, and active elements.", lesson: "Accent is a promise: use it consistently for action and focus. Obsidian users can override it in Appearance settings.", defaultLight: "#705dcf", defaultDark: "#7f6df2" },
  { id: "text-accent", label: "Links and accent text", category: "Colour", cssVar: "--text-accent", kind: "color", description: "Links and textual emphasis.", lesson: "Text accents often need a different lightness from filled accent buttons to remain readable on the main surface.", defaultLight: "#5f4bb6", defaultDark: "#a99cf2" },
  { id: "border", label: "Borders", category: "Colour", cssVar: "--background-modifier-border", kind: "color", description: "Dividers, outlines, and panel boundaries.", lesson: "Borders are structural punctuation. Low contrast makes a soft theme; higher contrast makes a technical, explicit one.", defaultLight: "#e0e0e0", defaultDark: "#3f3f3f" },
  { id: "highlight", label: "Highlight", category: "Colour", cssVar: "--text-highlight-bg", kind: "color", description: "The background of ==highlighted text==.", lesson: "Highlights should be visible behind body text without reducing its contrast.", defaultLight: "#fff3a3", defaultDark: "#5c5323" },
  { id: "selection", label: "Text selection", category: "Colour", cssVar: "--text-selection", kind: "color", description: "The colour shown while selecting text.", lesson: "Selection is temporary state. Make it obvious, but not so opaque that selected words disappear.", defaultLight: "#cfe2ff", defaultDark: "#364c70" },
  { id: "font-interface", label: "Interface font", category: "Typography", cssVar: "--font-interface-override", kind: "font", description: "Choose the typeface used for buttons, tabs, and navigation, overriding the font selected in Obsidian Appearance.", lesson: "The dropdown writes the font stack for you. System default is the safest shared-theme choice; fonts marked \u2018must be installed\u2019 fall back when another reader does not have them.", defaultLight: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", scope: "shared", options: TEXT_FONTS },
  { id: "font-text", label: "Reading font", category: "Typography", cssVar: "--font-text-override", kind: "font", description: "Choose the typeface used in notes and reading view, overriding the font selected in Obsidian Appearance.", lesson: "Serifs can feel bookish and guide the eye through long prose; sans serifs often feel cleaner and more direct. Choose by reading the specimen, not by memorising names.", defaultLight: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", scope: "shared", options: TEXT_FONTS },
  { id: "font-monospace", label: "Code font", category: "Typography", cssVar: "--font-monospace-override", kind: "font", description: "Choose an equal-width typeface for code blocks and inline code, overriding the font selected in Obsidian Appearance.", lesson: "Every character in a monospace font occupies equal width. That alignment makes code structure easier to scan; the dropdown keeps a monospace fallback automatically.", defaultLight: "'SFMono-Regular', Consolas, 'Liberation Mono', monospace", scope: "shared", options: CODE_FONTS },
  { id: "font-size", label: "Base text size", category: "Typography", cssVar: "--font-text-size", kind: "range", description: "The default reading size in pixels.", lesson: "This is a root design decision: line length, spacing, and headings all feel different when body size changes.", defaultLight: "16px", scope: "shared", min: 13, max: 22, step: 1, unit: "px" },
  { id: "line-height", label: "Reading line height", category: "Typography", cssVar: "--line-height-normal", kind: "range", description: "Vertical breathing room between lines.", lesson: "Long-form reading usually benefits from 1.5\u20131.8. Dense interfaces can be tighter.", defaultLight: "1.6", scope: "shared", min: 1.2, max: 2, step: 0.05 },
  { id: "heading-weight", label: "Heading weight", category: "Typography", cssVar: "--heading-weight", kind: "range", description: "Boldness shared by note headings.", lesson: "Weight builds hierarchy without changing colour. Values depend on what the selected font actually supports.", defaultLight: "700", scope: "shared", min: 400, max: 900, step: 100 },
  { id: "h1-size", label: "Largest heading", category: "Typography", cssVar: "--h1-size", kind: "range", description: "Size of level-one headings in em units.", lesson: "em scales from the body size, making your type system coherent when the reader changes their base font.", defaultLight: "2em", scope: "shared", min: 1.4, max: 3, step: 0.1, unit: "em" },
  { id: "radius", label: "Corner roundness", category: "Shape & spacing", cssVar: "--radius-m", kind: "range", description: "Medium corners used across controls and panels.", lesson: "Repeated radii create a visual language: square feels precise, rounded feels soft, and pill-shaped feels playful.", defaultLight: "8px", scope: "shared", min: 0, max: 24, step: 1, unit: "px" },
  { id: "input-radius", label: "Input roundness", category: "Shape & spacing", cssVar: "--input-radius", kind: "range", description: "Corners on text fields and dropdowns.", lesson: "Component-specific variables let you make exceptions without changing the whole system.", defaultLight: "5px", scope: "shared", min: 0, max: 24, step: 1, unit: "px" },
  { id: "tab-radius", label: "Tab roundness", category: "Shape & spacing", cssVar: "--tab-radius-active", kind: "range", description: "Corners on the active tab.", lesson: "Tabs communicate containment. Their shape can connect them visually to the content below.", defaultLight: "6px", scope: "shared", min: 0, max: 20, step: 1, unit: "px" },
  { id: "divider-width", label: "Divider thickness", category: "Shape & spacing", cssVar: "--divider-width", kind: "range", description: "Width of pane dividers.", lesson: "One pixel is subtle; larger values turn layout boundaries into a design feature.", defaultLight: "1px", scope: "shared", min: 0, max: 6, step: 1, unit: "px" },
  { id: "content-width", label: "Readable line width", category: "Editor", cssVar: "--file-line-width", kind: "range", description: "Maximum width of readable-line-length notes.", lesson: "Line length strongly affects reading comfort. Around 60\u201380 characters is a useful starting range, expressed here as pixels.", defaultLight: "700px", scope: "shared", min: 480, max: 1100, step: 20, unit: "px" },
  { id: "paragraph-spacing", label: "Paragraph spacing", category: "Editor", cssVar: "--p-spacing", kind: "range", description: "Space after paragraphs.", lesson: "Spacing makes structure visible. Use either indentation or paragraph gaps deliberately rather than accumulating both by accident.", defaultLight: "1rem", scope: "shared", min: 0, max: 2, step: 0.1, unit: "rem" },
  { id: "code-size", label: "Code size", category: "Editor", cssVar: "--code-size", kind: "range", description: "Relative size of inline and block code.", lesson: "Code fonts often look larger or smaller than body fonts at the same numerical size, so tune optically.", defaultLight: "0.9em", scope: "shared", min: 0.7, max: 1.2, step: 0.05, unit: "em" },
  { id: "blockquote-border", label: "Quote marker colour", category: "Editor", cssVar: "--blockquote-border-color", kind: "color", description: "The rule beside block quotes.", lesson: "Small repeated markers are a good place to echo the accent colour without overwhelming reading.", defaultLight: "#705dcf", defaultDark: "#7f6df2" },
  { id: "code-background", label: "Code background", category: "Editor", cssVar: "--code-background", kind: "color", description: "Surface behind inline and fenced code.", lesson: "Code needs separation from prose, but a large contrast jump can interrupt reading flow.", defaultLight: "#f3f3f3", defaultDark: "#242424" },
  { id: "code-normal", label: "Code text", category: "Editor", cssVar: "--code-normal", kind: "color", description: "Default foreground inside code.", lesson: "Syntax colours decorate this foundation. Make the default readable before tuning individual tokens.", defaultLight: "#3a3a3a", defaultDark: "#d4d4d4" },
  { id: "bold-color", label: "Bold text colour", category: "Editor", cssVar: "--bold-color", kind: "color", description: "Optional colour for strong text.", lesson: "If bold has its own colour it gains two kinds of emphasis\u2014weight and hue. Use that extra force intentionally.", defaultLight: "#222222", defaultDark: "#dadada" },
  { id: "italic-color", label: "Italic text colour", category: "Editor", cssVar: "--italic-color", kind: "color", description: "Optional colour for emphasised text.", lesson: "Italics usually signal voice or nuance. A dramatic colour can change their semantic feeling.", defaultLight: "#5a5a5a", defaultDark: "#bababa" },
  { id: "table-border", label: "Table grid", category: "Editor", cssVar: "--table-border-color", kind: "color", description: "Lines dividing table cells.", lesson: "Tables already have strong geometry. Quiet grids often let the data remain dominant.", defaultLight: "#d4d4d4", defaultDark: "#3f3f3f" },
  { id: "table-header", label: "Table header surface", category: "Editor", cssVar: "--table-header-background", kind: "color", description: "Background behind table headings.", lesson: "A header surface makes column roles scannable without requiring bold borders.", defaultLight: "#f6f6f6", defaultDark: "#2a2a2a" },
  { id: "tag-background", label: "Tag background", category: "Editor", cssVar: "--tag-background", kind: "color", description: "Surface behind tags in notes.", lesson: "Tags are compact metadata. Their fill should distinguish them without competing with links and headings.", defaultLight: "#ebe7fb", defaultDark: "#352f52" },
  { id: "tag-color", label: "Tag text", category: "Editor", cssVar: "--tag-color", kind: "color", description: "Foreground used for tags.", lesson: "Treat a tag as a tiny button: its text and background need sufficient mutual contrast.", defaultLight: "#5f4bb6", defaultDark: "#b7aaf4" },
  { id: "checkbox-radius", label: "Checkbox roundness", category: "Editor", cssVar: "--checkbox-radius", kind: "range", description: "Corners of task checkboxes.", lesson: "Checkbox shape carries convention. Slight rounding feels familiar; a circle can read more like a radio button.", defaultLight: "3px", scope: "shared", min: 0, max: 10, step: 1, unit: "px" },
  { id: "link-decoration", label: "Link underline", category: "Editor", cssVar: "--link-decoration", kind: "select", description: "Whether links are underlined.", lesson: "Underlines make links identifiable without relying on colour alone, which improves accessibility.", defaultLight: "underline", scope: "shared", options: [{ label: "Underlined", value: "underline" }, { label: "No underline", value: "none" }] },
  { id: "nav-size", label: "Navigation text size", category: "Navigation", cssVar: "--nav-item-size", kind: "range", description: "Size of file and folder names.", lesson: "Navigation is scanned, not read linearly. Slightly smaller type can improve overview, but avoid making it strainful.", defaultLight: "13px", scope: "shared", min: 11, max: 18, step: 1, unit: "px" },
  { id: "nav-height", label: "Navigation row height", category: "Navigation", cssVar: "--nav-item-height", kind: "range", description: "Height of each file explorer row.", lesson: "Compact rows show more information; generous rows improve touch targets and calm the interface.", defaultLight: "30px", scope: "shared", min: 22, max: 48, step: 2, unit: "px" },
  { id: "nav-radius", label: "Navigation hover shape", category: "Navigation", cssVar: "--nav-item-radius", kind: "range", description: "Roundness of highlighted navigation rows.", lesson: "Hover and active states should look related to your buttons and inputs.", defaultLight: "5px", scope: "shared", min: 0, max: 20, step: 1, unit: "px" },
  { id: "icon-size", label: "Icon size", category: "Navigation", cssVar: "--icon-size", kind: "range", description: "Default size of interface icons.", lesson: "Icons must balance the surrounding type. Oversized icons dominate; undersized ones become hard to target.", defaultLight: "18px", scope: "shared", min: 14, max: 28, step: 1, unit: "px" },
  { id: "tab-text", label: "Inactive tab text", category: "Navigation", cssVar: "--tab-text-color", kind: "color", description: "Labels on tabs that are not active.", lesson: "Inactive does not mean unavailable. Reduce emphasis while keeping titles easy to scan.", defaultLight: "#707070", defaultDark: "#999999" },
  { id: "tab-text-active", label: "Active tab text", category: "Navigation", cssVar: "--tab-text-color-active", kind: "color", description: "Label on the current tab.", lesson: "The active tab needs a clear state difference using colour, weight, surface, or a combination.", defaultLight: "#222222", defaultDark: "#dadada" },
  { id: "ribbon-background", label: "Ribbon background", category: "Navigation", cssVar: "--ribbon-background", kind: "color", description: "The narrow icon rail at the edge of the app.", lesson: "The ribbon is part of your surface hierarchy. Matching it to the sidebar makes a unified navigation zone.", defaultLight: "#f6f6f6", defaultDark: "#262626" },
  { id: "status-background", label: "Status bar background", category: "Navigation", cssVar: "--status-bar-background", kind: "color", description: "Surface behind the bottom status bar.", lesson: "Peripheral chrome can recede into the workspace or become a deliberate frame.", defaultLight: "#ffffff", defaultDark: "#1e1e1e" },
  { id: "titlebar-background", label: "Title bar background", category: "Navigation", cssVar: "--titlebar-background", kind: "color", description: "Top window chrome when Obsidian draws it.", lesson: "A continuous title bar and sidebar creates a strong frame; separating them creates clearer regions.", defaultLight: "#f6f6f6", defaultDark: "#262626" },
  { id: "modal-radius", label: "Modal roundness", category: "Shape & spacing", cssVar: "--modal-radius", kind: "range", description: "Corners of dialogs and popovers.", lesson: "Large containers can tolerate a slightly larger radius than small controls while still feeling related.", defaultLight: "10px", scope: "shared", min: 0, max: 28, step: 1, unit: "px" },
  { id: "callout-radius", label: "Callout roundness", category: "Shape & spacing", cssVar: "--callout-radius", kind: "range", description: "Corners on note callouts.", lesson: "Callouts are content components. Their geometry can echo cards, inputs, or neither depending on the hierarchy you want.", defaultLight: "6px", scope: "shared", min: 0, max: 24, step: 1, unit: "px" },
  { id: "embed-radius", label: "Embed roundness", category: "Shape & spacing", cssVar: "--embed-block-radius", kind: "range", description: "Corners around embedded notes and media.", lesson: "Embeds are documents inside documents. A boundary and radius help communicate that nesting.", defaultLight: "6px", scope: "shared", min: 0, max: 24, step: 1, unit: "px" },
  { id: "custom-css", label: "Your first hand-written CSS", category: "Advanced", cssVar: "", kind: "text", description: "Optional CSS appended to the export; it is not live-applied for safety.", lesson: "This is the bridge out of the tool. Start with a selector, add a property inside braces, export, then inspect it in a test vault. Example: .markdown-rendered strong { color: var(--text-accent); }", defaultLight: "", scope: "shared" }
];

// src/view.ts
var import_obsidian = require("obsidian");

// src/theme.ts
var DEFAULT_DATA = {
  themeName: "My First Theme",
  author: "",
  mode: "light",
  livePreview: true,
  systemFonts: [],
  values: { light: {}, dark: {}, shared: {}, customCss: "" }
};
function cloneDefaults() {
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}
function mergeData(raw) {
  var _a, _b, _c, _d, _e;
  const defaults = cloneDefaults();
  if (!raw) return defaults;
  return {
    ...defaults,
    ...raw,
    systemFonts: Array.isArray(raw.systemFonts) ? raw.systemFonts.filter((font) => typeof font === "string") : [],
    values: {
      light: { ...defaults.values.light, ...(_a = raw.values) == null ? void 0 : _a.light },
      dark: { ...defaults.values.dark, ...(_b = raw.values) == null ? void 0 : _b.dark },
      shared: { ...defaults.values.shared, ...(_c = raw.values) == null ? void 0 : _c.shared },
      customCss: (_e = (_d = raw.values) == null ? void 0 : _d.customCss) != null ? _e : ""
    }
  };
}
function getValue(data, controlId, mode) {
  var _a, _b, _c;
  const control = CONTROLS.find((item) => item.id === controlId);
  if (!control) return "";
  if (control.id === "custom-css") return data.values.customCss;
  if (control.scope === "shared") return (_a = data.values.shared[control.id]) != null ? _a : control.defaultLight;
  const fallback = mode === "dark" ? (_b = control.defaultDark) != null ? _b : control.defaultLight : control.defaultLight;
  return (_c = data.values[mode][control.id]) != null ? _c : fallback;
}
function setValue(data, controlId, mode, value) {
  const control = CONTROLS.find((item) => item.id === controlId);
  if (!control) return;
  if (control.id === "custom-css") data.values.customCss = value;
  else if (control.scope === "shared") data.values.shared[control.id] = value;
  else data.values[mode][control.id] = value;
}
function declarations(values, mode) {
  return CONTROLS.filter((control) => control.cssVar && control.scope === "shared" === !mode).map((control) => {
    var _a, _b, _c;
    const value = mode ? (_b = values[mode][control.id]) != null ? _b : mode === "dark" ? (_a = control.defaultDark) != null ? _a : control.defaultLight : control.defaultLight : (_c = values.shared[control.id]) != null ? _c : control.defaultLight;
    return `  ${control.cssVar}: ${value};`;
  });
}
function generateThemeCss(data) {
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
${custom ? `
/* Hand-written CSS: your graduation layer */
${custom}
` : ""}`;
}
function generateThemeManifest(data) {
  return JSON.stringify({
    name: data.themeName.trim() || "Untitled Theme",
    version: "0.1.0",
    minAppVersion: "1.6.0",
    author: data.author.trim() || "Your name"
  }, null, 2) + "\n";
}
function contrastRatio(foreground, background) {
  const parse = (hex) => {
    const normalized = hex.replace("#", "");
    if (!/^[0-9a-f]{6}$/i.test(normalized)) return null;
    return [0, 2, 4].map((index) => parseInt(normalized.slice(index, index + 2), 16) / 255);
  };
  const luminance = (rgb) => rgb.map((channel) => channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4).reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
  const foregroundRgb = parse(foreground);
  const backgroundRgb = parse(background);
  if (!foregroundRgb || !backgroundRgb) return null;
  const lighter = Math.max(luminance(foregroundRgb), luminance(backgroundRgb));
  const darker = Math.min(luminance(foregroundRgb), luminance(backgroundRgb));
  return (lighter + 0.05) / (darker + 0.05);
}

// src/view.ts
var VIEW_TYPE_THEME_STUDIO = "theme-school-view";
var ThemeStudioView = class extends import_obsidian.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.category = "Colour";
    this.search = "";
    this.showLessons = true;
    this.showCss = true;
    this.mockCanvas = null;
    this.cssOutput = null;
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE_THEME_STUDIO;
  }
  getDisplayText() {
    return "Theme School";
  }
  getIcon() {
    return "palette";
  }
  async onOpen() {
    this.render();
  }
  render() {
    const root = this.contentEl;
    root.empty();
    root.addClass("theme-studio");
    this.renderHeader(root);
    this.renderProgress(root);
    const workspace = root.createDiv({ cls: "theme-studio__workspace" });
    this.renderSidebar(workspace);
    this.renderControls(workspace);
    this.renderPreview(workspace);
  }
  renderHeader(root) {
    const header = root.createDiv({ cls: "theme-studio__header" });
    const title = header.createDiv();
    title.createEl("h1", { text: "Theme School" });
    title.createEl("p", { text: "Learn the system. Shape both baselines. Export a theme that no longer needs this plugin." });
    const actions = header.createDiv({ cls: "theme-studio__header-actions" });
    this.button(actions, this.plugin.data.livePreview ? "eye" : "eye-off", this.plugin.data.livePreview ? "Live on" : "Live off", () => {
      this.plugin.data.livePreview = !this.plugin.data.livePreview;
      void this.saveAndRender();
    }, this.plugin.data.livePreview);
    this.button(actions, "download", "Export", (event) => this.showExportMenu(event));
  }
  renderProgress(root) {
    const changed = CONTROLS.filter((control) => {
      if (control.id === "custom-css") return this.plugin.data.values.customCss.length > 0;
      if (control.scope === "shared") return control.id in this.plugin.data.values.shared;
      return control.id in this.plugin.data.values.light || control.id in this.plugin.data.values.dark;
    }).length;
    const strip = root.createDiv({ cls: "theme-studio__progress" });
    strip.createSpan({ text: `Exploration map \xB7 ${changed} of ${CONTROLS.length} ideas touched` });
    const track = strip.createDiv({ cls: "theme-studio__progress-track" });
    const bar = track.createDiv({ cls: "theme-studio__progress-bar" });
    bar.style.width = `${Math.round(changed / CONTROLS.length * 100)}%`;
    strip.createSpan({ cls: "theme-studio__progress-note", text: changed < 8 ? "Start with colour, then type, then spacing." : changed < 20 ? "A visual system is emerging." : "You\u2019re ready to inspect the exported CSS." });
  }
  renderSidebar(workspace) {
    const sidebar = workspace.createEl("aside", { cls: "theme-studio__sidebar" });
    const modeBox = sidebar.createDiv({ cls: "theme-studio__mode-box" });
    modeBox.createEl("strong", { text: "Baseline" });
    modeBox.createEl("p", { text: "Design both. Good themes do not merely invert colours." });
    const modeSwitch = modeBox.createDiv({ cls: "theme-studio__segmented" });
    this.modeButton(modeSwitch, "sun", "Light", "light");
    this.modeButton(modeSwitch, "moon", "Dark", "dark");
    const preset = modeBox.createEl("select", { cls: "theme-studio__preset", attr: { "aria-label": "Choose a baseline palette" } });
    preset.createEl("option", { text: "Choose a starting palette\u2026", value: "" });
    preset.createEl("option", { text: "Obsidian neutral", value: "neutral" });
    preset.createEl("option", { text: "Warm paper", value: "warm" });
    preset.createEl("option", { text: "Cool slate", value: "cool" });
    preset.createEl("option", { text: "True black / OLED", value: "oled" });
    preset.onchange = () => {
      if (preset.value) {
        this.applyPreset(preset.value);
        void this.saveAndRender();
      }
    };
    const identity = sidebar.createDiv({ cls: "theme-studio__identity" });
    identity.createEl("label", { text: "Theme name" });
    const name = identity.createEl("input", { attr: { type: "text", placeholder: "My first theme" } });
    name.value = this.plugin.data.themeName;
    name.onchange = () => {
      this.plugin.data.themeName = name.value;
      void this.saveAndRender();
    };
    identity.createEl("label", { text: "Designer" });
    const author = identity.createEl("input", { attr: { type: "text", placeholder: "Your name" } });
    author.value = this.plugin.data.author;
    author.onchange = () => {
      this.plugin.data.author = author.value;
      void this.saveAndRender();
    };
    const search = sidebar.createEl("input", { cls: "theme-studio__search", attr: { type: "search", placeholder: "Find a possibility\u2026", "aria-label": "Search theme controls" } });
    search.value = this.search;
    search.addEventListener("input", () => {
      this.search = search.value;
      this.render();
    });
    const nav = sidebar.createEl("nav", { attr: { "aria-label": "Theme topics" } });
    CATEGORIES.forEach((category) => {
      const button = nav.createEl("button", { cls: `theme-studio__nav ${category === this.category ? "is-active" : ""}`, text: category });
      const count = CONTROLS.filter((control) => control.category === category).length;
      button.createSpan({ text: String(count) });
      button.onclick = () => {
        this.category = category;
        this.search = "";
        this.render();
      };
    });
    const lessonToggle = sidebar.createEl("label", { cls: "theme-studio__lesson-toggle" });
    const check = lessonToggle.createEl("input", { attr: { type: "checkbox" } });
    check.checked = this.showLessons;
    check.onchange = () => {
      this.showLessons = check.checked;
      this.render();
    };
    lessonToggle.createSpan({ text: "Show teaching notes" });
    const reset = sidebar.createEl("button", { cls: "theme-studio__reset", text: "Start with a blank slate" });
    reset.onclick = () => {
      this.plugin.data = { ...cloneDefaults(), author: this.plugin.data.author, systemFonts: this.plugin.data.systemFonts };
      void this.saveAndRender();
      new import_obsidian.Notice("Theme School is back to its neutral starting point. To remove an installed theme too, choose default in settings \u2192 appearance \u2192 themes.", 9e3);
    };
    sidebar.createEl("p", {
      cls: "theme-studio__reset-note",
      text: "This clears your Theme School choices. For a completely clean canvas, also select default under settings \u2192 appearance \u2192 themes."
    });
    this.renderInstallHelp(sidebar);
    const syllabus = sidebar.createDiv({ cls: "theme-studio__syllabus" });
    syllabus.createEl("strong", { text: "The route off this scaffold" });
    ["1. Make relationships visually", "2. Read the variable beside each choice", "3. Inspect your exported theme.css", "4. Add one selector in Advanced", "5. Uninstall the plugin; keep the theme"].forEach((step) => syllabus.createDiv({ text: step }));
  }
  renderControls(workspace) {
    const main = workspace.createEl("main", { cls: "theme-studio__controls" });
    const intro = main.createDiv({ cls: "theme-studio__section-intro" });
    intro.createEl("h2", { text: this.search ? `Results for \u201C${this.search}\u201D` : this.category });
    intro.createEl("p", { text: this.categoryIntro(this.category) });
    if (!this.search && this.category === "Typography") this.renderSystemFontImporter(main);
    const query = this.search.toLowerCase();
    const controls = CONTROLS.filter((control) => query ? `${control.label} ${control.description} ${control.lesson} ${control.cssVar}`.toLowerCase().includes(query) : control.category === this.category);
    if (!controls.length) main.createEl("p", { cls: "theme-studio__empty", text: "No controls match that search." });
    controls.forEach((control) => this.renderControl(main, control));
  }
  renderControl(main, control) {
    const card = main.createEl("section", { cls: "theme-studio__control-card" });
    const heading = card.createDiv({ cls: "theme-studio__control-heading" });
    const text = heading.createDiv();
    text.createEl("h3", { text: control.label });
    text.createEl("p", { text: control.description });
    if (control.cssVar) heading.createEl("code", { text: control.cssVar });
    const row = card.createDiv({ cls: "theme-studio__input-row" });
    const value = getValue(this.plugin.data, control.id, this.plugin.data.mode);
    this.createInput(row, control, value);
    if (control.scope === "shared") row.createSpan({ cls: "theme-studio__scope", text: "Both modes" });
    if (this.showLessons) {
      const lesson = card.createDiv({ cls: "theme-studio__lesson" });
      (0, import_obsidian.setIcon)(lesson.createSpan(), "graduation-cap");
      lesson.createEl("p", { text: control.lesson });
    }
    if (control.id === "text-normal") this.renderContrast(card);
  }
  createInput(row, control, value) {
    var _a;
    const update = (next) => {
      setValue(this.plugin.data, control.id, this.plugin.data.mode, next);
      this.refreshLiveOutputs();
      void this.saveAndRender(false);
    };
    if (control.id === "custom-css") {
      const textarea = row.createEl("textarea", { cls: "theme-studio__custom-css", attr: { rows: "8", spellcheck: "false", placeholder: ".markdown-rendered strong {\n  color: var(--text-accent);\n}" } });
      textarea.value = value;
      textarea.oninput = () => update(textarea.value);
      return;
    }
    if (control.kind === "color") {
      const picker = row.createEl("input", { attr: { type: "color", "aria-label": control.label } });
      picker.value = value;
      const hex = row.createEl("input", { cls: "theme-studio__hex", attr: { type: "text", "aria-label": `${control.label} hex value` } });
      hex.value = value;
      picker.oninput = () => update(picker.value);
      hex.onchange = () => {
        if (/^#[0-9a-f]{6}$/i.test(hex.value)) update(hex.value);
        else new import_obsidian.Notice("Use a six-digit hex colour such as #705dcf");
      };
    } else if (control.kind === "range") {
      const numeric = parseFloat(value);
      const range = row.createEl("input", { attr: { type: "range", min: String(control.min), max: String(control.max), step: String(control.step), "aria-label": control.label } });
      range.value = String(numeric);
      const output = row.createEl("output", { text: value });
      range.oninput = () => {
        var _a2;
        const next = `${range.value}${(_a2 = control.unit) != null ? _a2 : ""}`;
        output.textContent = next;
        update(next);
      };
    } else if (control.kind === "select") {
      const select = row.createEl("select", { attr: { "aria-label": control.label } });
      (_a = control.options) == null ? void 0 : _a.forEach((option) => select.createEl("option", { text: option.label, value: option.value }));
      select.value = value;
      select.onchange = () => update(select.value);
    } else if (control.kind === "font") {
      this.createFontPicker(row, control, value, update);
    } else {
      const input = row.createEl("input", { cls: "theme-studio__text-input", attr: { type: "text", "aria-label": control.label } });
      input.value = value;
      input.onchange = () => update(input.value);
    }
  }
  createFontPicker(row, control, value, update) {
    const picker = row.createDiv({ cls: "theme-studio__font-picker" });
    const select = picker.createEl("select", { attr: { "aria-label": control.label } });
    const options = this.fontOptions(control);
    const knownValue = options.some((option) => option.value === value);
    if (!knownValue) select.createEl("option", { text: "Existing custom font", value });
    options.forEach((option) => {
      var _a;
      const item = select.createEl("option", { text: `${option.label} \u2014 ${(_a = option.description) != null ? _a : ""}`, value: option.value });
      item.style.fontFamily = option.value;
    });
    select.value = value;
    const specimen = picker.createDiv({ cls: "theme-studio__font-specimen" });
    const sample = specimen.createDiv({ cls: "theme-studio__font-sample" });
    const explanation = specimen.createDiv({ cls: "theme-studio__font-description" });
    const refreshSpecimen = () => {
      var _a;
      const selected = options.find((option) => option.value === select.value);
      select.style.fontFamily = select.value;
      sample.style.fontFamily = select.value;
      sample.textContent = control.id === "font-monospace" ? "Aa 0123 { code }" : "Aa The shape of an idea";
      explanation.textContent = (_a = selected == null ? void 0 : selected.description) != null ? _a : "A custom font choice saved by an earlier version";
    };
    refreshSpecimen();
    select.onchange = () => {
      refreshSpecimen();
      update(select.value);
    };
  }
  fontOptions(control) {
    var _a;
    const builtIn = (_a = control.options) != null ? _a : [];
    const fallback = control.id === "font-monospace" ? "monospace" : "sans-serif";
    const imported = this.plugin.data.systemFonts.map((family) => ({
      label: family,
      value: `'${family.replace(/'/g, "\\'")}', ${fallback}`,
      description: this.describeImportedFont(family)
    }));
    const existing = new Set(builtIn.map((option) => option.label.toLocaleLowerCase()));
    return [...builtIn, ...imported.filter((option) => !existing.has(option.label.toLocaleLowerCase()))];
  }
  renderSystemFontImporter(main) {
    const panel = main.createDiv({ cls: "theme-studio__font-importer" });
    const copy = panel.createDiv();
    copy.createEl("strong", { text: "Fonts on this computer" });
    copy.createEl("p", { text: this.plugin.data.systemFonts.length ? `${this.plugin.data.systemFonts.length} font families imported. They are saved only in Theme School on this device.` : "Import the font families installed on this Mac or PC. Theme School records their names; it does not copy or share font files." });
    const actions = panel.createDiv({ cls: "theme-studio__font-import-actions" });
    const importButton = actions.createEl("button", { text: this.plugin.data.systemFonts.length ? "Refresh system fonts" : "Import system fonts" });
    importButton.onclick = () => void this.importSystemFonts();
    const manual = actions.createEl("input", { attr: { type: "text", placeholder: "Or enter a font family name", "aria-label": "Font family name" } });
    const add = actions.createEl("button", { text: "Add name" });
    add.onclick = () => void this.addFontName(manual.value);
    manual.onkeydown = (event) => {
      if (event.key === "Enter") void this.addFontName(manual.value);
    };
  }
  async importSystemFonts() {
    if (!import_obsidian.Platform.isDesktopApp) {
      new import_obsidian.Notice("Automatic font discovery is available in the desktop app. On mobile, enter a font family name manually.", 9e3);
      return;
    }
    try {
      const families = await this.discoverSystemFonts();
      if (!families.length) throw new Error("No fonts returned");
      this.plugin.data.systemFonts = families;
      await this.saveAndRender();
      new import_obsidian.Notice(`Imported ${this.plugin.data.systemFonts.length} font families from this computer.`);
    } catch (e) {
      new import_obsidian.Notice("Theme School could not read the system font list. You can still add a font family name manually.", 9e3);
    }
  }
  async discoverSystemFonts() {
    var _a;
    const nodeRequire = window.require;
    if (!nodeRequire) throw new Error("Desktop system access is unavailable");
    const execFile = nodeRequire("node:child_process").execFile;
    const run = (file, args) => new Promise((resolve, reject) => {
      execFile(file, args, { maxBuffer: 20 * 1024 * 1024 }, (error, stdout) => error ? reject(error) : resolve(stdout));
    });
    let families;
    if (import_obsidian.Platform.isMacOS) {
      const output = await run("/usr/sbin/system_profiler", ["SPFontsDataType", "-json", "-detailLevel", "mini"]);
      const report = JSON.parse(output);
      families = ((_a = report.SPFontsDataType) != null ? _a : []).flatMap((font) => {
        var _a2;
        return (_a2 = font.typefaces) != null ? _a2 : [];
      }).filter((face) => face.enabled !== "no").map((face) => {
        var _a2;
        return (_a2 = face.family) != null ? _a2 : "";
      });
    } else if (import_obsidian.Platform.isWin) {
      const script = "Add-Type -AssemblyName System.Drawing; (New-Object System.Drawing.Text.InstalledFontCollection).Families.Name";
      families = (await run("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", script])).split(/\r?\n/);
    } else {
      families = (await run("fc-list", [":", "family"])).split(/\r?\n/).flatMap((line) => line.split(","));
    }
    return [...new Set(families.map((family) => family.trim()).filter((family) => family && !family.startsWith(".")))].sort((a, b) => a.localeCompare(b));
  }
  describeImportedFont(family) {
    const name = family.toLocaleLowerCase();
    const includes = (words) => words.some((word) => name.includes(word));
    if (includes(["wingdings", "webdings", "symbol", "dingbat", "ornament", "braille", "emoji"])) {
      return "Symbols and pictograms rather than ordinary reading text";
    }
    if (includes(["mono", "monaco", "menlo", "courier", "andal\xE9", "andale"])) {
      return "Equal-width lettering suited to code, tables, and technical text";
    }
    if (includes(["script", "hand", "chancery", "noteworthy", "marker", "felt", "signpainter", "snell", "savoye", "zapfino", "bradley", "mishafi"])) {
      return "Handwritten or calligraphic lettering with an informal voice";
    }
    if (includes(["engraved", "ransom", "party", "phosphate", "papyrus", "luminari", "herculanum", "trattatello", "chalkduster", "copperplate"])) {
      return "Decorative display lettering best used for headings and accents";
    }
    if (includes(["arabic", "al bayan", "al nile", "al tarikh", "baghdad", "beirut", "damascus", "diwan", "farah", "farisi", "geeza", "kufi", "muna", "nadeem", "waseem", "naskh", "nastaliq"])) {
      return "Designed for Arabic-script text; appearance and coverage vary by language";
    }
    if (includes(["hebrew", "raanana", "peninim"])) return "Designed for Hebrew text and multilingual documents";
    if (includes(["devanagari", "bangla", "gurmukhi", "gujarati", "kannada", "malayalam", "oriya", "tamil", "telugu", "sinhala", "inai", "kailasa", "kohinoor", "shree"])) {
      return "Designed for South Asian scripts and multilingual documents";
    }
    if (includes(["hiragino", "pingfang", "songti", "heiti", "stsong", "gothic neo", "myungjo", "kefa", "kokonor"])) {
      return "Designed for East Asian scripts and multilingual documents";
    }
    if (includes(["khmer", "lao", "myanmar", "ayuthaya", "krungthep", "sukhumvit", "thonburi", "sathu", "silom"])) {
      return "Designed for Southeast Asian scripts and multilingual documents";
    }
    if (includes(["serif", "baskerville", "bodoni", "caslon", "charter", "cochin", "didot", "hoefler", "palatino", "plantagenet", "publico", "rockwell", "times"])) {
      return "Serif lettering with a traditional, bookish reading character";
    }
    if (includes(["sans", "arial", "avenir", "futura", "geneva", "helvetica", "impact", "optima", "proxima", "tahoma", "din", "lucida", "skia", "galvji"])) {
      return "Clean sans-serif lettering suited to interfaces and everyday reading";
    }
    if (includes(["rounded", "comic", "chalkboard"])) return "Rounded, friendly lettering with a playful character";
    if (includes(["condensed", "narrow"])) return "Space-saving letterforms useful for compact headings and navigation";
    return "A locally installed font\u2014use the specimen to judge its shape and reading feel";
  }
  async addFontName(rawName) {
    const name = rawName.trim();
    if (!name) {
      new import_obsidian.Notice("Enter the font family name shown in the font book or your system font settings.");
      return;
    }
    const names = new Set(this.plugin.data.systemFonts);
    names.add(name);
    this.plugin.data.systemFonts = [...names].sort((a, b) => a.localeCompare(b));
    await this.saveAndRender();
    new import_obsidian.Notice(`${name} added to the font choices.`);
  }
  renderContrast(card) {
    const mode = this.plugin.data.mode;
    const foreground = getValue(this.plugin.data, "text-normal", mode);
    const background = getValue(this.plugin.data, "background-primary", mode);
    const ratio = contrastRatio(foreground, background);
    if (!ratio) return;
    const pass = ratio >= 4.5;
    card.createDiv({ cls: `theme-studio__contrast ${pass ? "is-pass" : "is-warn"}`, text: `${ratio.toFixed(2)}:1 contrast \xB7 ${pass ? "Passes WCAG AA for normal text" : "Needs 4.5:1 for normal text"}` });
  }
  renderPreview(workspace) {
    const aside = workspace.createEl("aside", { cls: "theme-studio__preview" });
    const pocket = aside.createDiv({ cls: "theme-studio__preview-pocket" });
    const top = pocket.createDiv({ cls: "theme-studio__preview-top" });
    top.createEl("strong", { text: "Pocket preview" });
    top.createSpan({ text: this.plugin.data.mode === "light" ? "Light baseline" : "Dark baseline" });
    const canvas = pocket.createDiv({ cls: "theme-studio__mock", attr: { "data-mode": this.plugin.data.mode } });
    this.mockCanvas = canvas;
    this.applyMockVariables(canvas);
    const mockNav = canvas.createDiv({ cls: "theme-studio__mock-nav" });
    mockNav.createEl("b", { text: "My vault" });
    ["Inbox", "Ideas", "Reading notes"].forEach((name, index) => mockNav.createDiv({ cls: index === 1 ? "is-active" : "", text: name }));
    const note = canvas.createDiv({ cls: "theme-studio__mock-note" });
    note.createEl("small", { text: "Design note" });
    note.createEl("h1", { text: "A theme is a system" });
    note.createEl("p", { text: "Surfaces create depth. Type creates rhythm. Repetition turns choices into a visual language." });
    const quote = note.createEl("blockquote");
    quote.createSpan({ text: "Change one relationship at a time, then test both baselines." });
    const details = note.createEl("p");
    details.appendText("Follow a ");
    details.createEl("a", { href: "#" }).appendText("link");
    details.appendText(", mark an ");
    details.createEl("mark").appendText("important idea");
    details.appendText(", and notice what attracts your eye.");
    note.createEl("button", { text: "A primary action" });
    this.renderCssLesson(aside);
  }
  renderCssLesson(aside) {
    const lesson = aside.createEl("section", { cls: `theme-studio__css-live ${this.showCss ? "is-open" : "is-closed"}` });
    const toggle = lesson.createEl("button", {
      cls: "theme-studio__css-toggle",
      text: `${this.showCss ? "\u25BE" : "\u25B8"} Live theme code \xB7 changes as you choose`,
      attr: { "aria-expanded": String(this.showCss) }
    });
    toggle.onclick = () => {
      this.showCss = !this.showCss;
      this.render();
    };
    if (!this.showCss) return;
    const content = lesson.createDiv({ cls: "theme-studio__css-content" });
    content.createEl("p", { text: "Coders usually use colour pickers, design tools, and browser inspectors. They do not memorise every colour code." });
    const toolbar = content.createDiv({ cls: "theme-studio__css-toolbar" });
    toolbar.createSpan({ text: "Your complete standalone theme.css" });
    const copy = toolbar.createEl("button", { text: "Copy" });
    copy.onclick = () => void this.copy(generateThemeCss(this.plugin.data), "Live theme.css copied");
    this.cssOutput = content.createEl("code", { cls: "theme-studio__css-output" });
    this.cssOutput.textContent = generateThemeCss(this.plugin.data);
  }
  renderInstallHelp(aside) {
    const help = aside.createEl("details", { cls: "theme-studio__install-help" });
    help.createEl("summary", { text: "How to load my exported theme" });
    const list = help.createEl("ol");
    list.createEl("li", { text: "Export \u2192 create theme folder in this vault." });
    list.createEl("li", { text: "Open settings \u2192 appearance." });
    list.createEl("li", { text: "Restart the app so it discovers the new theme folder." });
    list.createEl("li", { text: "Choose your theme name from the themes dropdown." });
    help.createEl("p", { text: "The exported folder contains both theme.css and manifest.json and has the same name as your theme." });
  }
  applyMockVariables(canvas) {
    CONTROLS.filter((control) => control.cssVar).forEach((control) => {
      canvas.style.setProperty(control.cssVar, getValue(this.plugin.data, control.id, this.plugin.data.mode));
    });
  }
  refreshLiveOutputs() {
    if (this.mockCanvas) this.applyMockVariables(this.mockCanvas);
    if (this.cssOutput) this.cssOutput.textContent = generateThemeCss(this.plugin.data);
  }
  modeButton(parent, icon, label, mode) {
    const button = parent.createEl("button", { cls: this.plugin.data.mode === mode ? "is-active" : "" });
    (0, import_obsidian.setIcon)(button.createSpan(), icon);
    button.createSpan({ text: label });
    button.onclick = () => {
      this.plugin.data.mode = mode;
      void this.saveAndRender();
    };
  }
  button(parent, icon, label, callback, active = false) {
    const button = parent.createEl("button", { cls: `theme-studio__button ${active ? "is-active" : ""}` });
    (0, import_obsidian.setIcon)(button.createSpan(), icon);
    button.createSpan({ text: label });
    button.onclick = callback;
  }
  showExportMenu(event) {
    const menu = new import_obsidian.Menu();
    menu.addItem((item) => item.setTitle("Copy theme.css").setIcon("copy").onClick(() => void this.copy(generateThemeCss(this.plugin.data), "theme.css copied")));
    menu.addItem((item) => item.setTitle("Copy manifest.json").setIcon("braces").onClick(() => void this.copy(generateThemeManifest(this.plugin.data), "manifest.json copied")));
    menu.addSeparator();
    menu.addItem((item) => item.setTitle("Create theme folder in this vault").setIcon("folder-plus").onClick(() => void this.exportToVault()));
    menu.showAtMouseEvent(event);
  }
  async exportToVault() {
    const folderName = (this.plugin.data.themeName.trim() || "Untitled Theme").replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, " ").replace(/^\.+|\.+$/g, "") || "Untitled Theme";
    const themesFolder = `${this.app.vault.configDir}/themes`;
    const folder = `${themesFolder}/${folderName}`;
    const adapter = this.app.vault.adapter;
    if (!await adapter.exists(themesFolder)) await adapter.mkdir(themesFolder);
    if (!await adapter.exists(folder)) await adapter.mkdir(folder);
    await adapter.write(`${folder}/theme.css`, generateThemeCss(this.plugin.data));
    await adapter.write(`${folder}/manifest.json`, generateThemeManifest(this.plugin.data));
    new import_obsidian.Notice(`Theme saved in ${folder}. Restart Obsidian, then select \u201C${this.plugin.data.themeName || "My First Theme"}\u201D in settings \u2192 appearance \u2192 themes.`, 12e3);
  }
  async copy(content, message) {
    await navigator.clipboard.writeText(content);
    new import_obsidian.Notice(message);
  }
  async saveAndRender(render = true) {
    await this.plugin.persist();
    if (render) this.render();
  }
  categoryIntro(category) {
    const copy = {
      "Colour": "Build two intentional surface and contrast systems\u2014one that begins near white and one that begins near black.",
      "Typography": "Control voice, hierarchy, density, and reading rhythm without writing CSS.",
      "Shape & spacing": "Turn repeated measurements into a coherent visual grammar.",
      "Editor": "Tune the page where thinking and writing actually happen.",
      "Navigation": "Balance scanability, information density, and comfortable targets.",
      "Advanced": "Cross the bridge from variables to selectors. This is where the scaffold begins to disappear."
    };
    return copy[category];
  }
  applyPreset(name) {
    const mode = this.plugin.data.mode;
    const palettes = {
      neutral: {
        light: { "background-primary": "#ffffff", "background-secondary": "#f6f6f6", "background-secondary-alt": "#e3e3e3", "text-normal": "#222222", "text-muted": "#5a5a5a", "border": "#e0e0e0" },
        dark: { "background-primary": "#1e1e1e", "background-secondary": "#262626", "background-secondary-alt": "#363636", "text-normal": "#dadada", "text-muted": "#bababa", "border": "#3f3f3f" }
      },
      warm: {
        light: { "background-primary": "#fbf7ef", "background-secondary": "#f2eadc", "background-secondary-alt": "#e8dccb", "text-normal": "#332b24", "text-muted": "#75685d", "border": "#ded1bf", "interactive-accent": "#a34f32", "text-accent": "#8c4028" },
        dark: { "background-primary": "#211c19", "background-secondary": "#2a2420", "background-secondary-alt": "#382f29", "text-normal": "#eadfd2", "text-muted": "#b9a99a", "border": "#493c34", "interactive-accent": "#d27655", "text-accent": "#e59a7e" }
      },
      cool: {
        light: { "background-primary": "#f7f9fc", "background-secondary": "#edf1f6", "background-secondary-alt": "#dfe6ef", "text-normal": "#202a36", "text-muted": "#5d6d7e", "border": "#d5dde8", "interactive-accent": "#3f6f9f", "text-accent": "#315f8c" },
        dark: { "background-primary": "#171d24", "background-secondary": "#202832", "background-secondary-alt": "#2b3642", "text-normal": "#dce5ee", "text-muted": "#a8b5c2", "border": "#394654", "interactive-accent": "#6597c8", "text-accent": "#8db8df" }
      },
      oled: {
        light: { "background-primary": "#ffffff", "background-secondary": "#f5f5f5", "background-secondary-alt": "#e8e8e8", "text-normal": "#111111", "text-muted": "#555555", "border": "#d8d8d8" },
        dark: { "background-primary": "#000000", "background-secondary": "#090909", "background-secondary-alt": "#151515", "text-normal": "#eeeeee", "text-muted": "#aaaaaa", "border": "#292929", "interactive-accent": "#9a83ff", "text-accent": "#b9a9ff" }
      }
    };
    Object.assign(this.plugin.data.values[mode], palettes[name][mode]);
  }
};

// src/main.ts
var ThemeStudioPlugin = class extends import_obsidian2.Plugin {
  constructor() {
    super(...arguments);
    this.originalInlineValues = /* @__PURE__ */ new Map();
  }
  async onload() {
    this.data = mergeData(await this.loadData());
    this.registerView(VIEW_TYPE_THEME_STUDIO, (leaf) => new ThemeStudioView(leaf, this));
    this.addRibbonIcon("palette", "Open Theme School", () => void this.activateView());
    this.addCommand({ id: "open-theme-studio", name: "Open studio", callback: () => void this.activateView() });
    this.addCommand({ id: "toggle-theme-preview", name: "Toggle live theme preview", callback: () => {
      this.data.livePreview = !this.data.livePreview;
      void this.persist();
      new import_obsidian2.Notice(`Theme School preview ${this.data.livePreview ? "on" : "off"}`);
    } });
    const themeObserver = new MutationObserver(() => {
      if (this.data.livePreview) this.applyPreview();
    });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    this.register(() => themeObserver.disconnect());
    if (this.data.livePreview) this.applyPreview();
  }
  onunload() {
    this.removePreview();
  }
  async activateView() {
    const existing = this.app.workspace.getLeavesOfType(VIEW_TYPE_THEME_STUDIO)[0];
    const leaf = existing != null ? existing : this.app.workspace.getLeaf("tab");
    if (!existing) await leaf.setViewState({ type: VIEW_TYPE_THEME_STUDIO, active: true });
    this.app.workspace.setActiveLeaf(leaf, { focus: true });
  }
  async persist() {
    await this.saveData(this.data);
    if (this.data.livePreview) this.applyPreview();
    else this.removePreview();
  }
  applyPreview() {
    const mode = document.body.hasClass("theme-dark") ? "dark" : "light";
    CONTROLS.filter((control) => control.cssVar).forEach((control) => {
      if (!this.originalInlineValues.has(control.cssVar)) {
        this.originalInlineValues.set(control.cssVar, {
          value: document.body.style.getPropertyValue(control.cssVar),
          priority: document.body.style.getPropertyPriority(control.cssVar)
        });
      }
      document.body.style.setProperty(control.cssVar, getValue(this.data, control.id, mode));
    });
  }
  removePreview() {
    this.originalInlineValues.forEach(({ value, priority }, property) => {
      if (value) document.body.style.setProperty(property, value, priority);
      else document.body.style.removeProperty(property);
    });
    this.originalInlineValues.clear();
  }
};
