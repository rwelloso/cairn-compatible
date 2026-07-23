# Font licenses

All fonts bundled in this folder are licensed under the SIL Open Font
License 1.1 (https://openfontlicense.org), which permits bundling,
redistribution, and modification, including in commercial projects,
provided the font names aren't used to imply endorsement and any
modified versions are also released under the OFL.

| File(s) | Family | Designer | Source |
|---|---|---|---|
| `Alegreya-*.woff2` | Alegreya | Juan Pablo del Peral (Huerta Tipográfica) | https://fonts.google.com/specimen/Alegreya |
| `GermaniaOne-Regular.woff2` | Germania One | John Vargas Beltrán | https://fonts.google.com/specimen/Germania+One |
| `Roboto-Regular.woff2`, `Roboto-Bold.woff2`, `Roboto-Italic.woff2` | Roboto | Christian Robertson | https://fonts.google.com/specimen/Roboto |
| `Montserrat-Bold.woff2` | Montserrat | Julieta Ulanovsky et al. | https://fonts.google.com/specimen/Montserrat |
| `DidactGothic-Regular.woff2` | Didact Gothic | Daniel Johnson | https://fonts.google.com/specimen/Didact+Gothic |

Germania One, Roboto, Montserrat, and Didact Gothic were subset to only
the static weights used by the sheet CSS (converted from their variable
font sources to keep file size down) and re-packaged as WOFF2.

Font-role convention (matching the layout used by the Mausritter Foundry
system, https://github.com/Futil/foundry-mausritter):

- **Germania One** — display font: character/item names, resource labels,
  tab labels, and the large ability/HP numbers.
- **Roboto** — body font: descriptions, chat text, item list rows
  (italic for flavor text, bold for emphasis).
- **Montserrat Bold** — ability score labels (STR/DEX/WIL), uppercase.
- **Didact Gothic** — NPC/monster sheet text, to give creature stat
  blocks a distinct voice from player character sheets.
