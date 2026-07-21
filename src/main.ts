import { Notice, Plugin } from "obsidian";
import { CONTROLS } from "./controls";
import { ThemeStudioView, VIEW_TYPE_THEME_STUDIO } from "./view";
import { getValue, mergeData } from "./theme";
import type { StudioData } from "./types";

export default class ThemeStudioPlugin extends Plugin {
  data!: StudioData;
  private originalInlineValues = new Map<string, { value: string; priority: string }>();

  async onload(): Promise<void> {
    this.data = mergeData(await this.loadData() as Partial<StudioData> | null);
    this.registerView(VIEW_TYPE_THEME_STUDIO, (leaf) => new ThemeStudioView(leaf, this));
    this.addRibbonIcon("palette", "Open Theme School", () => void this.activateView());
    this.addCommand({ id: "open-theme-studio", name: "Open studio", callback: () => void this.activateView() });
    this.addCommand({ id: "toggle-theme-preview", name: "Toggle live theme preview", callback: () => {
      this.data.livePreview = !this.data.livePreview;
      void this.persist();
      new Notice(`Theme School preview ${this.data.livePreview ? "on" : "off"}`);
    }});
    const themeObserver = new MutationObserver(() => {
      if (this.data.livePreview) this.applyPreview();
    });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    this.register(() => themeObserver.disconnect());
    if (this.data.livePreview) this.applyPreview();
  }

  onunload(): void {
    this.removePreview();
  }

  async activateView(): Promise<void> {
    const existing = this.app.workspace.getLeavesOfType(VIEW_TYPE_THEME_STUDIO)[0];
    const leaf = existing ?? this.app.workspace.getLeaf("tab");
    if (!existing) await leaf.setViewState({ type: VIEW_TYPE_THEME_STUDIO, active: true });
    this.app.workspace.setActiveLeaf(leaf, { focus: true });
  }

  async persist(): Promise<void> {
    await this.saveData(this.data);
    if (this.data.livePreview) this.applyPreview(); else this.removePreview();
  }

  applyPreview(): void {
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

  removePreview(): void {
    this.originalInlineValues.forEach(({ value, priority }, property) => {
      if (value) document.body.style.setProperty(property, value, priority);
      else document.body.style.removeProperty(property);
    });
    this.originalInlineValues.clear();
  }
}
