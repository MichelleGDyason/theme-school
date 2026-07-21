import { Notice, Plugin } from "obsidian";
import { ThemeStudioView, VIEW_TYPE_THEME_STUDIO } from "./view";
import { mergeData, previewCss } from "./theme";
import type { StudioData } from "./types";

export default class ThemeStudioPlugin extends Plugin {
  data!: StudioData;
  private previewStyleEl: HTMLStyleElement | null = null;

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
    if (this.data.livePreview) this.applyPreview();
  }

  onunload(): void {
    this.removePreview();
  }

  async activateView(): Promise<void> {
    const existing = this.app.workspace.getLeavesOfType(VIEW_TYPE_THEME_STUDIO)[0];
    const leaf = existing ?? this.app.workspace.getLeaf("tab");
    if (!existing) await leaf.setViewState({ type: VIEW_TYPE_THEME_STUDIO, active: true });
    this.app.workspace.revealLeaf(leaf);
  }

  async persist(): Promise<void> {
    await this.saveData(this.data);
    if (this.data.livePreview) this.applyPreview(); else this.removePreview();
  }

  applyPreview(): void {
    if (!this.previewStyleEl) {
      this.previewStyleEl = document.head.createEl("style", { attr: { "data-theme-studio-preview": "true" } });
    }
    this.previewStyleEl.textContent = previewCss(this.data);
    document.body.addClass("theme-studio-preview");
  }

  removePreview(): void {
    document.body.removeClass("theme-studio-preview");
    this.previewStyleEl?.remove();
    this.previewStyleEl = null;
  }
}
