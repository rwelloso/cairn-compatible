# Cairn (pt-BR build) — Update notes

This package is an update of the [Cairn-FoundryVTT](https://github.com/yochaigal/Cairn-FoundryVTT)
system (cloned from `master` on 2026-07-22) focused on Foundry VTT v13 compatibility, complete
Brazilian Portuguese localization, and compendium content based on *Cairn: Edição Básica*
(pt-BR, v1.4, CC BY-SA 4.0 license).

## Installation

1. Rename the unzipped folder to `cairn` (Foundry expects this exact name for the system).
2. Copy the folder to `Data/systems/` in your Foundry VTT installation (or zip it and install via
   a local manifest).
3. If you already have a Portuguese Cairn world, back it up first — the gold field's data shape
   changed (see "Coins" below) and some language files/tables were overwritten.
4. After installing, import the **"Cairn - Edição Básica (PT-BR)"** compendium folder into your
   world (Items, Tables, and Reference).

## 1. Foundry v13 compatibility

The original repository's `master` branch already declared v13 support
(`compatibility.minimum: "13"`, verified against `13.346`) and the code already used the correct
APIs (`foundry.applications.*`, `foundry.utils.*`, `renderChatMessageHTML`, `DialogV2`, etc.) — no
rewrite of the base sheet classes was needed. The points that genuinely needed fixing:

- **`cost` schema bug**: every sheet (item, weapon, armor, container) already read
  `system.cost.value`, but `template.json` defined `cost` as a plain number. Fixed to
  `{ "value": 0 }`, consistently across every type.
- **`lang/pt-BR.json` used the old localization keys** (`ACTOR.TypeCharacter` etc.) instead of the
  current `TYPES.Actor.character` format, which broke the character type label in Portuguese. Fixed.
- **`lang/pt-BR.json` was incomplete** (73 of 85 keys present in `en.json`). Fully rewritten;
  `en.json` and `pt-BR.json` now have full key parity.

## 2. Setting: automatic Scars roll

Under **Configure Settings → Cairn**, a new toggle **"Automatically roll for scars"**
(`auto-roll-scars`, on by default). When a character's Hit Protection (HP) drops to 0:
- **On**: automatically rolls on the Scars table, exactly as before.
- **Off**: nothing rolls and no notice is shown — the Warden resolves it manually.

## 3. Coins (previously "Gold")

The field on the sheet formerly called "Gold" is now **"Coins"** and is **read-only**: its value
is the automatic sum of the quantity of four weightless inventory items — **Copper Coins, Silver
Coins, Gold Coins, Other Coins** (in the `extra` compendium, and the translated equivalents in
`ptbr-itens`). The optional gold-weight-threshold rule ("Use gold threshold" setting) keeps working
exactly as before, now measuring the sum of these items instead of a hand-typed number.

Any item can be flagged as currency via the **"Currency"** checkbox on the item sheet
(`system.currency`), not just the four created by default.

**Migration note**: existing characters that had gold in the old field will show 0 Coins until you
add the corresponding coin items to their inventory with the right quantity.

## 4. Advantage/Disadvantage and Impaired/Enhanced

- **Ability tests** (clicking STR/DEX/WIL on the sheet): opens a prompt with **Advantage**
  (`2d20`, keep the lower — better in a roll-under system), **Normal** (`1d20`), and
  **Disadvantage** (`2d20`, keep the higher).
- **Weapon damage** (clicking the die icon next to an equipped weapon, or using a hotbar macro):
  opens a prompt with **Impaired** (`1d4`, ignoring the weapon's own die), **Normal** (the
  weapon's die), and **Enhanced** (`1d12`), matching the book's "Attack Modifiers" rule. If the
  panic condition setting is on and the character is panicked, the attack is still automatically
  impaired without showing the prompt, exactly as before.

## 5. "Cairn - Edição Básica (PT-BR)" compendium

Three new packs, grouped under the compendium folder **"Cairn - Edição Básica (PT-BR)"**, with
content transcribed from the attached PDF (Cairn Edição Básica, translated by Rafa Arruda):

- **PT-BR: Itens** (227 documents) — 15 weapons, 6 armors, the 100 items from the Additional
  Equipment table (with prices cross-referenced from the Marketplace table where there's a clear
  match), 4 coin items, Rations and Torch, and the 100 Spellbooks.
- **PT-BR: Tabelas** (18 roll tables) — Physique, Skin, Hair, Face, Speech, Clothing, Virtue and
  Vice (d10 each); First Names and Surnames (d100 each, rolled independently rather than as fixed
  pairs, for more variety); Backgrounds (d100); Scars (the same Scars mechanic as before, in
  Portuguese); Weapons (d6, with nested sub-tables for categories with more than one option) and
  Armor (d6), both already linked to the items above.
- **PT-BR: Referência** (1 journal entry) — the 6 Gear Packages by archetype (Bard, Hunter,
  Healer, Warrior, Thief, Wizard) and the Marketplace table for transport/lodging/hirelings, which
  don't make sense as inventory items.

### Character generator in Portuguese

The "Generate character" button now automatically detects Foundry's active language: in
Portuguese, it uses the `ptbr-itens`/`ptbr-tabelas` tables above (following the exact character
creation steps from Cairn Edição Básica); in any other language it keeps using the English SRD,
with no change in behavior.

## 6. Additional content: More Spellbooks and More Relics

Two new compendium packs, translated from
[cairnrpg.com/resources/more-spellbooks](https://cairnrpg.com/resources/more-spellbooks/) and
[cairnrpg.com/resources/more-relics](https://cairnrpg.com/resources/more-relics/)
(content from Cairn's official site, licensed under CC BY-SA 4.0):

- **PT-BR: Mais Livros de Feitiço** (216 items) — the complete d666 table of extra spells from the
  official site, each as a Spellbook-type item.
- **PT-BR: Mais Relíquias** (126 items) — every relic on the page, including the ones with their
  own damage die (Weapon type) and the rest as general items, with the charge count shown in the
  name where applicable. Every description ends with a **Source** note, preserving the attribution
  and external link exactly as they appear on the original page: Glass Bird Games
  ([glassbirdgames.blogspot.com](https://glassbirdgames.blogspot.com/)), Ialath
  ([ialath.com](https://ialath.com/)), and the NSR Discord (no link on the source page).

A third page was added to the **"Cairn - Edição Básica: Referência"** journal entry, listing the
inspiration sources cited on the More Spellbooks page (Chris McDowall, Mike Evans, Goblin Punch,
d20 SRD, Wizards of the Coast SRD and 5.1 OGL, Black Hack SRD, and tadzik's 5e spell list), with
the same links as the original page.

## 7. Spell Index (A-Z)

New roll table gathering **every** Spellbook in the system (the 100 from Cairn Edição Básica + the
216 from More Spellbooks = 316 total), alphabetized and numbered 1 to 316, for anyone who wants to
draw a random spell of any kind instead of using the separate themed tables.

- **Portuguese**: table **"Índice de Feitiços (A-Z)"**, added to the `PT-BR: Tabelas` pack.
- **English**: matching table **"Spell Index (A-Z)"**, added to the `utils` pack (alongside the
  Scars table), combining the 100 English Spellbooks + 216 More Spellbooks — keeping the English
  version in parity with the Portuguese one, as we've been doing throughout.

Each table entry links directly to its item (drawing shows the actual Spellbook ready to drag onto
a sheet), rather than being just a list of names.
