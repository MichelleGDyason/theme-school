# Theme School

Theme School is a visual learning scaffold for making Obsidian themes without starting from a blank CSS file. It helps you make deliberate choices, shows the real CSS variable behind each choice, and exports a standard standalone theme.

The intended final step is to uninstall Theme School.

## Why this is a plugin—not a theme

A theme can style Obsidian, but it cannot provide an interactive teaching interface. Theme School is therefore a plugin that produces themes. The exported `theme.css` and `manifest.json` have no dependency on the plugin.

## What the first release teaches

- Separate light and dark baselines rather than treating one as an inversion
- Surface hierarchy, readable contrast, accents, borders, selections, and highlights
- Interface, reading, and monospace type systems
- Type scale, line height, content width, and paragraph rhythm
- Corner, input, tab, and divider systems
- Navigation density and editor-specific choices
- The connection between a visual control and its Obsidian CSS variable
- The first step beyond variables: adding a hand-written CSS selector

Theme School also checks normal body-text contrast against the WCAG AA 4.5:1 threshold. Live preview applies CSS variables reversibly; hand-written graduation CSS is export-only and should be tested through the exported theme.

## Install for development

1. Clone this repository into `.obsidian/plugins/theme-school` in a test vault. Obsidian recommends using a separate development vault.
2. Run `npm install` and `npm run build`.
3. In Obsidian, open **Settings → Community plugins**, enable community plugins, then enable **Theme School**.
4. Click the palette ribbon icon or run **Theme School: Open studio** from the command palette.

## The graduation workflow

1. Explore relationships with the visual controls.
2. Notice and learn the CSS variable beside every control.
3. Use **Export → Create theme folder in this vault**.
4. Open the exported `<your-config-folder>/themes/your-theme/theme.css` and connect your choices to the declarations.
5. Add one small rule in the **Advanced** section and see it appear at the end of the export.
6. Disable or uninstall Theme School. Your theme remains a normal Obsidian theme.

## Development

```bash
npm install
npm run dev
```

For a production bundle:

```bash
npm run build
```

The release assets required by Obsidian are `main.js`, `manifest.json`, and `styles.css`.

## Safety

Develop plugins in a separate test vault. Exporting writes only to `<your-config-folder>/themes/<your-theme-name>` in the current vault; Obsidian supplies the configured folder name at runtime.

## License

MIT
