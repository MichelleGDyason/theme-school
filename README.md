# Theme School

Theme School is a visual learning studio for making Obsidian themes without starting from a blank CSS file. Change understandable controls, watch the pocket preview react, and see the real CSS being written beside it. When you are ready, export a normal standalone Obsidian theme.

The intended final step is to uninstall Theme School. Your exported theme continues to work without the plugin.

## What you can learn and change

- Build separate light and dark colour systems with colour pickers rather than memorising hex codes
- Watch changes immediately in a pocket-sized Obsidian preview
- Read and copy the complete live `theme.css` in its own scrollable panel
- Keep the preview and live code visible while scrolling through the controls
- Choose interface, reading, and code fonts from visual specimens
- Import locally installed font names on macOS, Windows, and Linux
- Enter a font name manually on mobile or when automatic discovery is unavailable
- Try built-in choices including Chalkboard and Dreaming Outloud, with safe fallbacks
- Learn type scale, spacing, content width, corners, inputs, tabs, dividers, and navigation density
- Check body-text contrast against the WCAG AA 4.5:1 threshold
- Start with a blank Theme School design instead of building over saved Theme School choices
- Export a correctly named theme folder that Obsidian can discover, then update that same folder later

Colour professionals and web developers do not usually memorise every colour code. Colour pickers, palettes, design tools, and browser inspectors are normal parts of CSS work; Theme School gives you that same visual bridge while showing the code it produces.

## Fonts, privacy, and portability

Theme School's font controls use Obsidian's override variables, so a selection in Theme School can take precedence over the font selected in **Settings → Appearance** while the preview is active.

On desktop, **Import fonts from this device** asks the operating system for installed font family names. Theme School does not upload, bundle, or copy font files. Imported names and your choices stay in your vault's local plugin settings.

An exported theme can name a commercial or system font, but it cannot redistribute that font. The font must also be installed on any other device that opens the theme; otherwise the exported fallback font is used. Chalkboard is normally available on Apple systems. Dreaming Outloud appears only when its font files are legitimately installed on the device.

## Why this is a plugin—not a theme

A theme can style Obsidian, but it cannot provide an interactive teaching interface. Theme School is therefore a plugin that produces themes. The exported `theme.css` and `manifest.json` have no dependency on the plugin.

## Install the public release manually

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest GitHub release](https://github.com/MichelleGDyason/theme-school/releases/latest).
2. In your vault's configuration folder, create `plugins/theme-school` if it does not already exist. The default path is `.obsidian/plugins/theme-school`.
3. Put all three downloaded files in that folder.
4. Restart Obsidian.
5. Open **Settings → Community plugins** and enable **Theme School**.
6. Click the palette ribbon icon or run **Theme School: Open studio** from the Command Palette.

If you have changed Obsidian's configuration-folder name, use that folder instead of `.obsidian`.

## The graduation workflow

1. Explore relationships with the visual controls.
2. Notice the CSS variable beside each control and watch **Live theme code** change.
3. Use **Export → Create theme folder in this vault**.
4. Restart Obsidian, then open **Settings → Appearance** and choose the exported theme from the Themes dropdown.
5. Open the exported `<your-config-folder>/themes/<your-theme-name>/theme.css` and connect your choices to the declarations.
6. Add one small rule in the **Advanced** section and see it appear at the end of the export.
7. Disable or uninstall Theme School. Your theme remains a normal Obsidian theme.

**Start with a blank slate** clears Theme School's saved choices. Obsidian does not expose a safe public plugin command for disabling the selected theme, so choose **Default** under **Settings → Appearance → Themes** if you also want to remove the theme currently styling Obsidian.

If an exported theme folder is visible on disk but not in the Appearance selector, confirm that the folder contains both `theme.css` and `manifest.json`, then restart Obsidian. Theme School now creates the expected folder structure automatically.

## Develop and test

Clone this repository into `.obsidian/plugins/theme-school` in a separate test vault, then run:

```bash
npm install
npm run check
npm run lint
npm run build
```

For watch-mode development, run `npm run dev`. The release assets required by Obsidian are `main.js`, `manifest.json`, and `styles.css`.

## Support development

If Theme School helps you learn to make your own themes, you can support Michelle's work:

- [GitHub Sponsors](https://github.com/sponsors/MichelleGDyason)
- [Buy Me a Coffee](https://buymeacoffee.com/michellegdyason)

## License

MIT
