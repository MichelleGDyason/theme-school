# Theme School 0.2.0

Theme School 0.2.0 makes the design studio easier to learn from, easier to keep in view, and much more useful for typography.

## Live design workspace

- Added a live, copyable view of the complete CSS Theme School is writing.
- Kept the pocket preview and live theme code visible while the controls scroll independently.
- Gave the pocket preview and live code their own practical scrolling areas.
- Made the pocket preview update immediately as selections change.
- Added **Start with a blank slate** for clearing saved Theme School choices.

## Export and loading

- Corrected exported theme folder naming so Obsidian can discover the theme.
- Added safer repeat exports that update the same theme folder.
- Added clearer in-app and README instructions for restarting Obsidian and selecting the exported theme under Appearance.

## Typography

- Theme School now uses Obsidian's font override variables so its font choices take precedence in the live design.
- Added Chalkboard and Dreaming Outloud choices with sensible fallbacks.
- Added local system-font discovery for macOS, Windows, and Linux.
- Added manual font-name entry for mobile and restricted environments.
- Added generated plain-language descriptions and visual specimens for imported fonts.
- Kept font discovery private: only installed family names are read locally; font files are never uploaded, copied, or bundled.

## Verification

- Built and checked with TypeScript and the Obsidian ESLint rules.
- Tested in Obsidian on macOS with imported system fonts and live font previews.
