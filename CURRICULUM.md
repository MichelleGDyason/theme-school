# Theme School curriculum

This is the map behind the interface. It is intentionally broader than a palette picker and intentionally smaller than the whole of CSS.

## 1. Foundations

- Surface hierarchy: note, sidebar, raised surface, overlays
- Foreground hierarchy: normal, muted, faint, disabled
- Action hierarchy: accent, hover, active, focus, selection
- Light and dark baselines as separately designed systems
- Contrast as a relationship rather than a property of one colour

## 2. Typography

- Interface, reading, and monospace font roles
- Body size, line height, line length, and paragraph rhythm
- Heading scale and weight
- Semantic emphasis: links, bold, italics, highlights, and code

## 3. Geometry

- Repeated corner-radius families
- Density and touch targets
- Borders and dividers
- Container width and whitespace

## 4. Components

- Navigation, tabs, ribbon, title bar, and status bar
- Tables, tags, tasks, blockquotes, code, embeds, callouts, and modals
- States such as hover, active, selected, focused, success, warning, and error

## 5. Beyond variables

CSS variables are the safest high-level controls Obsidian exposes, but they cannot express every possible design. The complete space also includes:

- Selectors that target a particular element or state
- Layout rules using grid and flexbox
- Pseudo-elements and generated decoration
- Transitions and motion
- Platform and mobile-specific media queries
- Print and Obsidian Publish rules
- Styling for third-party plugins

Theme School provides a hand-written graduation layer because these possibilities cannot be honestly reduced to a fixed set of buttons. The teaching sequence is: identify the visual relationship, learn the nearest variable, inspect the exported declaration, then add the smallest selector needed.

## 6. Graduation test

You are ready to remove the scaffold when you can:

1. Explain why your four main surfaces differ.
2. Check body-text contrast in both modes.
3. Trace a visible choice to its CSS variable.
4. Read the structure of the exported `theme.css`.
5. Add and remove one selector without the visual editor.
6. Test the theme in reading, source, and live-preview modes on desktop and mobile.
