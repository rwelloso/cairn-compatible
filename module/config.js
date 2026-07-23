/** @name CONFIG.Cairn */
export const Cairn = {};

Cairn.characterGenerator = {
  ability: "3d6",
  hitProtection: "1d6",
  gold: "3d6",
  goldItem: "cairn.extra;Gold Coins",
  name: {
    text: "{name} {surname}",
    items: {
      name: "cairn.character-creation-tables-srd;Names",
      surname: "cairn.character-traits;Surnames"
    }
  },
  background: "cairn.character-traits;Background",
  startingItems: [
    "cairn.expeditionary-gear;Rations;1",
    "cairn.expeditionary-gear;Torch;1"
  ],
  startingGear: [
    "cairn.character-creation-tables-srd;Starting Gear - Armor",
    "cairn.character-creation-tables-srd;Starting Gear - Helmet & Shields",
    "cairn.character-creation-tables-srd;Starting Gear - Weapons",
    "cairn.character-creation-tables-srd;Starting Gear - Expeditionary Gear",
    "cairn.character-creation-tables-srd;Starting Gear - Tools",
    "cairn.character-creation-tables-srd;Starting Gear - Trinkets",
    "cairn.character-creation-tables-srd;Starting Gear - Bonus Item"
  ],
  biography: {
    text: "I have a <strong>{physique}</strong> physique, <strong>{skin}</strong> skin, <strong>{hair}</strong> hair, and a <strong>{face}</strong> face. I speak in a <strong>{speech}</strong> manner and wear <strong>{clothing}</strong> clothing. I am <strong>{vice}</strong> yet <strong>{virtue}</strong>, and I am generally regarded as <strong>{reputation}</strong>. I have had the misfortune of being <strong>{misfortune}</strong>. I am <strong>{age}</strong> years old.",
    age: "2d20 + 10",
    items: {
      physique: "cairn.character-traits;Physique",
      skin: "cairn.character-traits;Skin",
      hair: "cairn.character-traits;Hair",
      face: "cairn.character-traits;Face",
      speech: "cairn.character-traits;Speech",
      clothing: "cairn.character-traits;Clothing",
      vice: "cairn.character-traits;Vice",
      virtue: "cairn.character-traits;Virtue",
      misfortune: "cairn.character-traits;Misfortunes",
      reputation: "cairn.character-traits;Reputation"
    }
  }
};

CONFIG.Cairn = Cairn;

/**
 * Cairn: Edição Básica (pt-BR) character generator, driven by the
 * Portuguese-language compendiums (packs/ptbr-armas, packs/ptbr-armaduras,
 * packs/ptbr-feiticos, packs/ptbr-equipamento, packs/ptbr-tabelas).
 * Used automatically instead of Cairn.characterGenerator when the active
 * Foundry language is Portuguese; see generateCharacter() in
 * character-generator.js.
 */
Cairn.characterGeneratorPtBr = {
  ability: "3d6",
  hitProtection: "1d6",
  gold: "3d6",
  goldItem: "cairn.ptbr-equipamento;Moedas de Ouro",
  name: {
    text: "{nome} {sobrenome}",
    items: {
      nome: "cairn.ptbr-tabelas;Nomes Próprios",
      sobrenome: "cairn.ptbr-tabelas;Sobrenomes"
    }
  },
  background: "cairn.ptbr-tabelas;Antecedentes",
  startingItems: [
    "cairn.ptbr-equipamento;Rações;1",
    "cairn.ptbr-equipamento;Tocha;1"
  ],
  startingGear: [
    "cairn.ptbr-tabelas;Armas",
    "cairn.ptbr-tabelas;Armadura",
    "cairn.ptbr-tabelas;Equipamento Adicional"
  ],
  biography: {
    text: "Você tem um físico <strong>{physique}</strong>, pele <strong>{skin}</strong>, cabelo <strong>{hair}</strong> e rosto <strong>{face}</strong>. Fala de modo <strong>{speech}</strong> e veste roupas <strong>{clothing}</strong>. É <strong>{vice}</strong>, porém <strong>{virtue}</strong>. Tem <strong>{age}</strong> anos de idade.",
    age: "2d20 + 10",
    items: {
      physique: "cairn.ptbr-tabelas;Físico",
      skin: "cairn.ptbr-tabelas;Pele",
      hair: "cairn.ptbr-tabelas;Cabelo",
      face: "cairn.ptbr-tabelas;Rosto",
      speech: "cairn.ptbr-tabelas;Fala",
      clothing: "cairn.ptbr-tabelas;Roupas",
      vice: "cairn.ptbr-tabelas;Vício",
      virtue: "cairn.ptbr-tabelas;Virtude"
    }
  }
};

