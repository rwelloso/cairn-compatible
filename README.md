# Cairn Compatible

<p align="center">
  <img src="media/cairn-compatible-logo.jpg" alt="Cairn Compatible" width="360">
</p>

**Cairn Compatible** is now available in Portuguese (Brazil) and English. The project's proposal
goes beyond translation: to build more compatibility between the different games that carry the
Cairn Compatible seal, so they all work well together on Foundry VTT.

**Cairn Compatible** já está disponível em português do Brasil e em inglês. A proposta do projeto
vai além da tradução: criar mais compatibilidade entre os diferentes jogos que usam o selo Cairn
Compatible, para que todos funcionem bem juntos no Foundry VTT.

## What's new

- Foundry VTT v13 compatibility
- Full Brazilian Portuguese localization (`en.json`/`pt-BR.json` parity)
- Toggleable automatic Scars roll (Configure Settings → Cairn)
- Coins system (Copper/Silver/Gold/Other) replacing the old Gold field
- Advantage/Normal/Disadvantage prompt for ability tests
- Impaired/Normal/Enhanced prompt for weapon damage
- "Cairn - Edição Básica (PT-BR)" compendium: items, tables, and reference journal
- More Spellbooks and More Relics content, translated with source attribution
- Alphabetized Spell Index (A-Z), in Portuguese and English

## O que há de novo

- Compatibilidade com o Foundry VTT v13
- Localização completa em português do Brasil (paridade entre `en.json`/`pt-BR.json`)
- Rolagem automática de Cicatrizes com opção de ligar/desligar (Configurar Definições → Cairn)
- Sistema de Moedas (Cobre/Prata/Ouro/Outro) no lugar do antigo campo de Ouro
- Vantagem/Normal/Desvantagem nos testes de atributo
- Prejudicado/Normal/Aprimorado no dano de arma
- Compêndio "Cairn - Edição Básica (PT-BR)": itens, tabelas e diário de referência
- Conteúdo de Mais Livros de Feitiço e Mais Relíquias, traduzido com atribuição de fonte
- Índice de Feitiços (A-Z), em português e inglês

See [`CHANGELOG-en.md`](CHANGELOG-en.md) / [`CHANGELOG-ptbr.md`](CHANGELOG-ptbr.md) for full details.

> This is a community fork of the original
> [Cairn-FoundryVTT](https://github.com/yochaigal/Cairn-FoundryVTT) by
> [Yochai Gal](https://newschoolrevolution.com). All original code remains MIT-licensed (see
> `LICENSE.txt`); Cairn text content is CC BY-SA 4.0.

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
