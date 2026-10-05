# Theme School 0.2.1

Theme School 0.2.1 is a review-quality patch for the new live design and system-font features introduced in 0.2.0.

## Review improvements

- Replaced loosely typed system-font discovery boundaries with explicit runtime validation.
- Removed JSON cloning and validated the macOS font report before using any values.
- Added GitHub build-provenance attestations for `main.js`, `manifest.json`, and `styles.css`.
- Kept the Copy buttons because they only write Theme School's generated CSS or manifest after you deliberately click them; the plugin never reads clipboard contents.

## Included from 0.2.0

- Live, copyable theme CSS and a responsive pocket preview with independent scrolling.
- A blank-slate reset and corrected standalone-theme folder export.
- Font overrides, Chalkboard and Dreaming Outloud choices, local system-font discovery, manual font entry, specimens, and plain-language font descriptions.

## Verification

- TypeScript checks, type-aware safety rules, Obsidian lint, and the production build pass.
- The release workflow creates attestations before publishing the three installable assets.
