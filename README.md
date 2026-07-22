# Cairn Compatible

**Cairn Compatible** is a fork of the Cairn system for Foundry Virtual Tabletop, focused on
keeping compatibility with Foundry VTT v13 and providing a complete Brazilian Portuguese
localization. Beyond translating the interface, the project ships ready-to-use compendiums based
on *Cairn: Edição Básica* (Barebones Edition) and the official More Spellbooks and More Relics
content, with automatic character generation and rules adapted for both languages.

**Cairn Compatible** é um fork do sistema Cairn para Foundry Virtual Tabletop, focado em manter
compatibilidade com o Foundry VTT v13 e oferecer uma localização completa em português do Brasil.
Além da tradução da interface, o projeto traz compêndios prontos baseados no *Cairn: Edição
Básica* e no conteúdo oficial de Mais Feitiços e Mais Relíquias, com geração automática de
personagens e regras adaptadas para os dois idiomas.

> This is a community fork of the original
> [Cairn-FoundryVTT](https://github.com/yochaigal/Cairn-FoundryVTT) by
> [Yochai Gal](https://newschoolrevolution.com). See
> [`CHANGELOG-en.md`](CHANGELOG-en.md) / [`CHANGELOG-ptbr.md`](CHANGELOG-ptbr.md) for exactly
> what changed and why. All original code remains MIT-licensed (see `LICENSE.txt`); Cairn text
> content is CC BY-SA 4.0.

Implements basic character and item sheets for playing [Cairn](https://cairnrpg.com) by [Yochai Gal](https://newschoolrevolution.com) in Foundry VTT. Cairn is a mashup of Knave and Into The Odd, meant for Wood Fantasy settings such as Necrotic Gnome's [Dolmenwood](https://necroticgnome.com/collections/dolmenwood).

The code is based on the [Electric Bastionland system](https://github.com/mvdleden/electric-bastionland-FoundryVTT/) for FoundryVTT (which in turn is based on the Into the Odd System).

## Installation - This Fork (Manual)

1. Download the latest release zip from this repository's [Releases](../../releases) page (or
   clone this repo directly into your `Data/systems/` folder).
2. Make sure the folder is named exactly `cairn` inside `Data/systems/`.
3. Restart Foundry VTT and the system will appear as "Cairn (compatible fork)" — or whatever
   version string is in `system.json` at the time.
4. Import the **"Cairn - Edição Básica (PT-BR)"** compendium folder into your world if you want
   the Portuguese content.

## Installation - Auto Installer (Recommended, upstream)

1. In the FVTT Game Systems Menu, click `Install System`
2. Search for "Cairn" in the package search filter.
3. Allow players to "Create new Actors" in the "Configure Settings" permissions menu

## Installation - Manual - Foundry V12+

1. In the FVTT Game Systems Menu, click `Install System`
2. Enter the Manifest URL: `https://github.com/yochaigal/Cairn-FoundryVTT/releases/latest/download/system.json`
3. Allow players to "Create new Actors" in the "Configure Settings" permissions menu
4. 
## Installation - Manual - Foundry V10+

1. In the FVTT Game Systems Menu, click `Install System`
2. Enter the Manifest URL: `https://github.com/yochaigal/Cairn-FoundryVTT/releases/download/0.10.31/system.json`
3. Allow players to "Create new Actors" in the "Configure Settings" permissions menu

## Installation - Manual - Foundry V9

1. In the FVTT Game Systems Menu, click `Install System`
2. Enter the Manifest URL: `https://github.com/yochaigal/Cairn-FoundryVTT/releases/download/0.10.25/system.json`
3. Allow players to "Create new Actors" in the "Configure Settings" permissions menu

## Contributing

If you want to contribute to this sheet, you'll need to clone this repository in the `systems` directory in Foundry VTT data path.

Please note that the directory needs to be named `cairn` in order to be properly detected by Foundry VTT (i.e. it needs to look like `Data\systems\cairn`).
