import { ItemView, Menu, Notice, Platform, WorkspaceLeaf, setIcon } from "obsidian";
import type ThemeStudioPlugin from "./main";
import { CATEGORIES, CONTROLS } from "./controls";
import { cloneDefaults, contrastRatio, generateThemeCss, generateThemeManifest, getValue, setValue } from "./theme";
import type { Category, Mode, ThemeControl } from "./types";

export const VIEW_TYPE_THEME_STUDIO = "theme-school-view";

type ExecFile = (
  file: string,
  args: string[],
  options: { maxBuffer: number },
  callback: (error: unknown, stdout: unknown) => void
) => void;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export class ThemeStudioView extends ItemView {
  private plugin: ThemeStudioPlugin;
  private category: Category = "Colour";
  private search = "";
  private showLessons = true;
  private showCss = true;
  private mockCanvas: HTMLElement | null = null;
  private cssOutput: HTMLElement | null = null;

  constructor(leaf: WorkspaceLeaf, plugin: ThemeStudioPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string { return VIEW_TYPE_THEME_STUDIO; }
  getDisplayText(): string { return "Theme School"; }
  getIcon(): string { return "palette"; }

  async onOpen(): Promise<void> { this.render(); }

  private render(): void {
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

  private renderHeader(root: HTMLElement): void {
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

  private renderProgress(root: HTMLElement): void {
    const changed = CONTROLS.filter((control) => {
      if (control.id === "custom-css") return this.plugin.data.values.customCss.length > 0;
      if (control.scope === "shared") return control.id in this.plugin.data.values.shared;
      return control.id in this.plugin.data.values.light || control.id in this.plugin.data.values.dark;
    }).length;
    const strip = root.createDiv({ cls: "theme-studio__progress" });
    strip.createSpan({ text: `Exploration map · ${changed} of ${CONTROLS.length} ideas touched` });
    const track = strip.createDiv({ cls: "theme-studio__progress-track" });
    const bar = track.createDiv({ cls: "theme-studio__progress-bar" });
    bar.style.width = `${Math.round((changed / CONTROLS.length) * 100)}%`;
    strip.createSpan({ cls: "theme-studio__progress-note", text: changed < 8 ? "Start with colour, then type, then spacing." : changed < 20 ? "A visual system is emerging." : "You’re ready to inspect the exported CSS." });
  }

  private renderSidebar(workspace: HTMLElement): void {
    const sidebar = workspace.createEl("aside", { cls: "theme-studio__sidebar" });
    const modeBox = sidebar.createDiv({ cls: "theme-studio__mode-box" });
    modeBox.createEl("strong", { text: "Baseline" });
    modeBox.createEl("p", { text: "Design both. Good themes do not merely invert colours." });
    const modeSwitch = modeBox.createDiv({ cls: "theme-studio__segmented" });
    this.modeButton(modeSwitch, "sun", "Light", "light");
    this.modeButton(modeSwitch, "moon", "Dark", "dark");
    const preset = modeBox.createEl("select", { cls: "theme-studio__preset", attr: { "aria-label": "Choose a baseline palette" } });
    preset.createEl("option", { text: "Choose a starting palette…", value: "" });
    preset.createEl("option", { text: "Obsidian neutral", value: "neutral" });
    preset.createEl("option", { text: "Warm paper", value: "warm" });
    preset.createEl("option", { text: "Cool slate", value: "cool" });
    preset.createEl("option", { text: "True black / OLED", value: "oled" });
    preset.onchange = () => { if (preset.value) { this.applyPreset(preset.value); void this.saveAndRender(); } };

    const identity = sidebar.createDiv({ cls: "theme-studio__identity" });
    identity.createEl("label", { text: "Theme name" });
    const name = identity.createEl("input", { attr: { type: "text", placeholder: "My first theme" } });
    name.value = this.plugin.data.themeName;
    name.onchange = () => { this.plugin.data.themeName = name.value; void this.saveAndRender(); };
    identity.createEl("label", { text: "Designer" });
    const author = identity.createEl("input", { attr: { type: "text", placeholder: "Your name" } });
    author.value = this.plugin.data.author;
    author.onchange = () => { this.plugin.data.author = author.value; void this.saveAndRender(); };

    const search = sidebar.createEl("input", { cls: "theme-studio__search", attr: { type: "search", placeholder: "Find a possibility…", "aria-label": "Search theme controls" } });
    search.value = this.search;
    search.addEventListener("input", () => { this.search = search.value; this.render(); });

    const nav = sidebar.createEl("nav", { attr: { "aria-label": "Theme topics" } });
    CATEGORIES.forEach((category) => {
      const button = nav.createEl("button", { cls: `theme-studio__nav ${category === this.category ? "is-active" : ""}`, text: category });
      const count = CONTROLS.filter((control) => control.category === category).length;
      button.createSpan({ text: String(count) });
      button.onclick = () => { this.category = category; this.search = ""; this.render(); };
    });

    const lessonToggle = sidebar.createEl("label", { cls: "theme-studio__lesson-toggle" });
    const check = lessonToggle.createEl("input", { attr: { type: "checkbox" } });
    check.checked = this.showLessons;
    check.onchange = () => { this.showLessons = check.checked; this.render(); };
    lessonToggle.createSpan({ text: "Show teaching notes" });
    const reset = sidebar.createEl("button", { cls: "theme-studio__reset", text: "Start with a blank slate" });
    reset.onclick = () => {
      this.plugin.data = { ...cloneDefaults(), author: this.plugin.data.author, systemFonts: this.plugin.data.systemFonts };
      void this.saveAndRender();
      new Notice("Theme School is back to its neutral starting point. To remove an installed theme too, choose default in settings → appearance → themes.", 9000);
    };
    sidebar.createEl("p", {
      cls: "theme-studio__reset-note",
      text: "This clears your Theme School choices. For a completely clean canvas, also select default under settings → appearance → themes."
    });
    this.renderInstallHelp(sidebar);
    const syllabus = sidebar.createDiv({ cls: "theme-studio__syllabus" });
    syllabus.createEl("strong", { text: "The route off this scaffold" });
    ["1. Make relationships visually", "2. Read the variable beside each choice", "3. Inspect your exported theme.css", "4. Add one selector in Advanced", "5. Uninstall the plugin; keep the theme"].forEach((step) => syllabus.createDiv({ text: step }));
  }

  private renderControls(workspace: HTMLElement): void {
    const main = workspace.createEl("main", { cls: "theme-studio__controls" });
    const intro = main.createDiv({ cls: "theme-studio__section-intro" });
    intro.createEl("h2", { text: this.search ? `Results for “${this.search}”` : this.category });
    intro.createEl("p", { text: this.categoryIntro(this.category) });
    if (!this.search && this.category === "Typography") this.renderSystemFontImporter(main);
    const query = this.search.toLowerCase();
    const controls = CONTROLS.filter((control) => query
      ? `${control.label} ${control.description} ${control.lesson} ${control.cssVar}`.toLowerCase().includes(query)
      : control.category === this.category);
    if (!controls.length) main.createEl("p", { cls: "theme-studio__empty", text: "No controls match that search." });
    controls.forEach((control) => this.renderControl(main, control));
  }

  private renderControl(main: HTMLElement, control: ThemeControl): void {
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
      setIcon(lesson.createSpan(), "graduation-cap");
      lesson.createEl("p", { text: control.lesson });
    }
    if (control.id === "text-normal") this.renderContrast(card);
  }

  private createInput(row: HTMLElement, control: ThemeControl, value: string): void {
    const update = (next: string): void => {
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
      hex.onchange = () => { if (/^#[0-9a-f]{6}$/i.test(hex.value)) update(hex.value); else new Notice("Use a six-digit hex colour such as #705dcf"); };
    } else if (control.kind === "range") {
      const numeric = parseFloat(value);
      const range = row.createEl("input", { attr: { type: "range", min: String(control.min), max: String(control.max), step: String(control.step), "aria-label": control.label } });
      range.value = String(numeric);
      const output = row.createEl("output", { text: value });
      range.oninput = () => { const next = `${range.value}${control.unit ?? ""}`; output.textContent = next; update(next); };
    } else if (control.kind === "select") {
      const select = row.createEl("select", { attr: { "aria-label": control.label } });
      control.options?.forEach((option) => select.createEl("option", { text: option.label, value: option.value }));
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

  private createFontPicker(row: HTMLElement, control: ThemeControl, value: string, update: (next: string) => void): void {
    const picker = row.createDiv({ cls: "theme-studio__font-picker" });
    const select = picker.createEl("select", { attr: { "aria-label": control.label } });
    const options = this.fontOptions(control);
    const knownValue = options.some((option) => option.value === value);
    if (!knownValue) select.createEl("option", { text: "Existing custom font", value });
    options.forEach((option) => {
      const item = select.createEl("option", { text: `${option.label} — ${option.description ?? ""}`, value: option.value });
      item.style.fontFamily = option.value;
    });
    select.value = value;

    const specimen = picker.createDiv({ cls: "theme-studio__font-specimen" });
    const sample = specimen.createDiv({ cls: "theme-studio__font-sample" });
    const explanation = specimen.createDiv({ cls: "theme-studio__font-description" });
    const refreshSpecimen = (): void => {
      const selected = options.find((option) => option.value === select.value);
      select.style.fontFamily = select.value;
      sample.style.fontFamily = select.value;
      sample.textContent = control.id === "font-monospace" ? "Aa 0123 { code }" : "Aa The shape of an idea";
      explanation.textContent = selected?.description ?? "A custom font choice saved by an earlier version";
    };
    refreshSpecimen();
    select.onchange = () => { refreshSpecimen(); update(select.value); };
  }

  private fontOptions(control: ThemeControl): Array<{ label: string; value: string; description?: string }> {
    const builtIn = control.options ?? [];
    const fallback = control.id === "font-monospace" ? "monospace" : "sans-serif";
    const imported = this.plugin.data.systemFonts.map((family) => ({
      label: family,
      value: `'${family.replace(/'/g, "\\'")}', ${fallback}`,
      description: this.describeImportedFont(family)
    }));
    const existing = new Set(builtIn.map((option) => option.label.toLocaleLowerCase()));
    return [...builtIn, ...imported.filter((option) => !existing.has(option.label.toLocaleLowerCase()))];
  }

  private renderSystemFontImporter(main: HTMLElement): void {
    const panel = main.createDiv({ cls: "theme-studio__font-importer" });
    const copy = panel.createDiv();
    copy.createEl("strong", { text: "Fonts on this computer" });
    copy.createEl("p", { text: this.plugin.data.systemFonts.length
      ? `${this.plugin.data.systemFonts.length} font families imported. They are saved only in Theme School on this device.`
      : "Import the font families installed on this Mac or PC. Theme School records their names; it does not copy or share font files." });
    const actions = panel.createDiv({ cls: "theme-studio__font-import-actions" });
    const importButton = actions.createEl("button", { text: this.plugin.data.systemFonts.length ? "Refresh system fonts" : "Import system fonts" });
    importButton.onclick = () => void this.importSystemFonts();
    const manual = actions.createEl("input", { attr: { type: "text", placeholder: "Or enter a font family name", "aria-label": "Font family name" } });
    const add = actions.createEl("button", { text: "Add name" });
    add.onclick = () => void this.addFontName(manual.value);
    manual.onkeydown = (event) => { if (event.key === "Enter") void this.addFontName(manual.value); };
  }

  private async importSystemFonts(): Promise<void> {
    if (!Platform.isDesktopApp) {
      new Notice("Automatic font discovery is available in the desktop app. On mobile, enter a font family name manually.", 9000);
      return;
    }
    try {
      const families = await this.discoverSystemFonts();
      if (!families.length) throw new Error("No fonts returned");
      this.plugin.data.systemFonts = families;
      await this.saveAndRender();
      new Notice(`Imported ${this.plugin.data.systemFonts.length} font families from this computer.`);
    } catch {
      new Notice("Theme School could not read the system font list. You can still add a font family name manually.", 9000);
    }
  }

  private async discoverSystemFonts(): Promise<string[]> {
    const windowValue: unknown = window;
    if (!isRecord(windowValue)) throw new Error("Desktop window is unavailable");
    const requireValue = windowValue.require;
    if (typeof requireValue !== "function") throw new Error("Desktop system access is unavailable");
    const requireModule = requireValue as (module: string) => unknown;
    const childProcess = requireModule("node:child_process");
    if (!isRecord(childProcess) || typeof childProcess.execFile !== "function") {
      throw new Error("Desktop process access is unavailable");
    }
    const execFile = childProcess.execFile as ExecFile;
    const run = (file: string, args: string[]): Promise<string> => new Promise((resolve, reject) => {
      execFile(file, args, { maxBuffer: 20 * 1024 * 1024 }, (error, stdout) => {
        if (error) {
          reject(error instanceof Error ? error : new Error("System font discovery failed"));
        } else if (typeof stdout === "string") {
          resolve(stdout);
        } else {
          reject(new Error("System font discovery returned invalid output"));
        }
      });
    });
    let families: string[];
    if (Platform.isMacOS) {
      const output = await run("/usr/sbin/system_profiler", ["SPFontsDataType", "-json", "-detailLevel", "mini"]);
      const report: unknown = JSON.parse(output);
      if (!isRecord(report) || !Array.isArray(report.SPFontsDataType)) {
        throw new Error("System font report has an unexpected format");
      }
      families = report.SPFontsDataType.flatMap((font: unknown) => {
        if (!isRecord(font) || !Array.isArray(font.typefaces)) return [];
        return font.typefaces.flatMap((face: unknown) => {
          if (!isRecord(face) || face.enabled === "no" || typeof face.family !== "string") return [];
          return [face.family];
        });
      });
    } else if (Platform.isWin) {
      const script = "Add-Type -AssemblyName System.Drawing; (New-Object System.Drawing.Text.InstalledFontCollection).Families.Name";
      families = (await run("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", script])).split(/\r?\n/);
    } else {
      families = (await run("fc-list", [":", "family"])).split(/\r?\n/).flatMap((line) => line.split(","));
    }
    return [...new Set(families.map((family) => family.trim()).filter((family) => family && !family.startsWith(".")))]
      .sort((a, b) => a.localeCompare(b));
  }

  private describeImportedFont(family: string): string {
    const name = family.toLocaleLowerCase();
    const includes = (words: string[]): boolean => words.some((word) => name.includes(word));
    if (includes(["wingdings", "webdings", "symbol", "dingbat", "ornament", "braille", "emoji"])) {
      return "Symbols and pictograms rather than ordinary reading text";
    }
    if (includes(["mono", "monaco", "menlo", "courier", "andalé", "andale"])) {
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
    return "A locally installed font—use the specimen to judge its shape and reading feel";
  }

  private async addFontName(rawName: string): Promise<void> {
    const name = rawName.trim();
    if (!name) {
      new Notice("Enter the font family name shown in the font book or your system font settings.");
      return;
    }
    const names = new Set(this.plugin.data.systemFonts);
    names.add(name);
    this.plugin.data.systemFonts = [...names].sort((a, b) => a.localeCompare(b));
    await this.saveAndRender();
    new Notice(`${name} added to the font choices.`);
  }

  private renderContrast(card: HTMLElement): void {
    const mode = this.plugin.data.mode;
    const foreground = getValue(this.plugin.data, "text-normal", mode);
    const background = getValue(this.plugin.data, "background-primary", mode);
    const ratio = contrastRatio(foreground, background);
    if (!ratio) return;
    const pass = ratio >= 4.5;
    card.createDiv({ cls: `theme-studio__contrast ${pass ? "is-pass" : "is-warn"}`, text: `${ratio.toFixed(2)}:1 contrast · ${pass ? "Passes WCAG AA for normal text" : "Needs 4.5:1 for normal text"}` });
  }

  private renderPreview(workspace: HTMLElement): void {
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

  private renderCssLesson(aside: HTMLElement): void {
    const lesson = aside.createEl("section", { cls: `theme-studio__css-live ${this.showCss ? "is-open" : "is-closed"}` });
    const toggle = lesson.createEl("button", {
      cls: "theme-studio__css-toggle",
      text: `${this.showCss ? "▾" : "▸"} Live theme code · changes as you choose`,
      attr: { "aria-expanded": String(this.showCss) }
    });
    toggle.onclick = () => { this.showCss = !this.showCss; this.render(); };
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

  private renderInstallHelp(aside: HTMLElement): void {
    const help = aside.createEl("details", { cls: "theme-studio__install-help" });
    help.createEl("summary", { text: "How to load my exported theme" });
    const list = help.createEl("ol");
    list.createEl("li", { text: "Export → create theme folder in this vault." });
    list.createEl("li", { text: "Open settings → appearance." });
    list.createEl("li", { text: "Restart the app so it discovers the new theme folder." });
    list.createEl("li", { text: "Choose your theme name from the themes dropdown." });
    help.createEl("p", { text: "The exported folder contains both theme.css and manifest.json and has the same name as your theme." });
  }

  private applyMockVariables(canvas: HTMLElement): void {
    CONTROLS.filter((control) => control.cssVar).forEach((control) => {
      canvas.style.setProperty(control.cssVar, getValue(this.plugin.data, control.id, this.plugin.data.mode));
    });
  }

  private refreshLiveOutputs(): void {
    if (this.mockCanvas) this.applyMockVariables(this.mockCanvas);
    if (this.cssOutput) this.cssOutput.textContent = generateThemeCss(this.plugin.data);
  }

  private modeButton(parent: HTMLElement, icon: string, label: string, mode: Mode): void {
    const button = parent.createEl("button", { cls: this.plugin.data.mode === mode ? "is-active" : "" });
    setIcon(button.createSpan(), icon);
    button.createSpan({ text: label });
    button.onclick = () => { this.plugin.data.mode = mode; void this.saveAndRender(); };
  }

  private button(parent: HTMLElement, icon: string, label: string, callback: (event: MouseEvent) => void, active = false): void {
    const button = parent.createEl("button", { cls: `theme-studio__button ${active ? "is-active" : ""}` });
    setIcon(button.createSpan(), icon);
    button.createSpan({ text: label });
    button.onclick = callback;
  }

  private showExportMenu(event: MouseEvent): void {
    const menu = new Menu();
    menu.addItem((item) => item.setTitle("Copy theme.css").setIcon("copy").onClick(() => void this.copy(generateThemeCss(this.plugin.data), "theme.css copied")));
    menu.addItem((item) => item.setTitle("Copy manifest.json").setIcon("braces").onClick(() => void this.copy(generateThemeManifest(this.plugin.data), "manifest.json copied")));
    menu.addSeparator();
    menu.addItem((item) => item.setTitle("Create theme folder in this vault").setIcon("folder-plus").onClick(() => void this.exportToVault()));
    menu.showAtMouseEvent(event);
  }

  private async exportToVault(): Promise<void> {
    const folderName = (this.plugin.data.themeName.trim() || "Untitled Theme")
      .replace(/[\\/:*?"<>|]/g, "-")
      .replace(/\s+/g, " ")
      .replace(/^\.+|\.+$/g, "") || "Untitled Theme";
    const themesFolder = `${this.app.vault.configDir}/themes`;
    const folder = `${themesFolder}/${folderName}`;
    const adapter = this.app.vault.adapter;
    if (!(await adapter.exists(themesFolder))) await adapter.mkdir(themesFolder);
    if (!(await adapter.exists(folder))) await adapter.mkdir(folder);
    await adapter.write(`${folder}/theme.css`, generateThemeCss(this.plugin.data));
    await adapter.write(`${folder}/manifest.json`, generateThemeManifest(this.plugin.data));
    new Notice(`Theme saved in ${folder}. Restart Obsidian, then select “${this.plugin.data.themeName || "My First Theme"}” in settings → appearance → themes.`, 12000);
  }

  private async copy(content: string, message: string): Promise<void> {
    await navigator.clipboard.writeText(content);
    new Notice(message);
  }

  private async saveAndRender(render = true): Promise<void> {
    await this.plugin.persist();
    if (render) this.render();
  }

  private categoryIntro(category: Category): string {
    const copy: Record<Category, string> = {
      "Colour": "Build two intentional surface and contrast systems—one that begins near white and one that begins near black.",
      "Typography": "Control voice, hierarchy, density, and reading rhythm without writing CSS.",
      "Shape & spacing": "Turn repeated measurements into a coherent visual grammar.",
      "Editor": "Tune the page where thinking and writing actually happen.",
      "Navigation": "Balance scanability, information density, and comfortable targets.",
      "Advanced": "Cross the bridge from variables to selectors. This is where the scaffold begins to disappear."
    };
    return copy[category];
  }

  private applyPreset(name: string): void {
    const mode = this.plugin.data.mode;
    const palettes: Record<string, Record<Mode, Record<string, string>>> = {
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
}
