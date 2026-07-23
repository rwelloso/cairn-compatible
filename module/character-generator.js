import { CairnActor } from "./actor/actor.js";
import {
  compendiumInfoFromString, drawTableItem,
  drawTableText, findCompendiumItem,
} from './compendium.js'
import { Cairn } from "./config.js";
import { evaluateFormula, formatString } from './utils.js'

/**
 * @returns {Promise.<CairnActor>}
 */
export const createCharacter = async () => createActorWithCharacter(await generateCharacter());

/**
 * @param {CairnActor} actor
 @returns {Promise.<CairnActor>}
 */
export const regenerateActor = async (actor)  => updateActorWithCharacter(actor, await generateCharacter());

/**
 * @param {Object} characterData
 * @returns {Promise.<CairnActor>}
 */
export const createActorWithCharacter = async (characterData) => {
  const data = characterToActorData(characterData);
  return CairnActor.create(data);
};

/**
 * @param {CairnActor} actor
 * @param {Object} characterData
 @returns {Promise.<CairnActor>}
 */
export const updateActorWithCharacter = async (actor, characterData) => {
  const data = characterToActorData(characterData);
  await actor.deleteEmbeddedDocuments("Item", [], {
    deleteAll: true,
    render: false,
  });
  await actor.update(data);
  for (const token of actor.getActiveTokens()) {
    await token.document.update({
      img: actor.img,
      name: actor.name,
    });
  }
  return actor;
};

/**
 * @param {Object} items
 * @return {Promise<Object>}
 */
export const rollTextItems = async (items) => {
  const entries = await Promise.all(
    Object.entries(items).map(async ([key, value]) => {
      const [compendium, table] = compendiumInfoFromString(value);
      return [key, await drawTableText(compendium, table)];
    })
  );
  return Object.fromEntries(entries);
};

/**
 * @param {Object} items
 @return {Promise<CairnItem[]>}
 */
export const rollItems = async (items) => {
  const results = await Promise.all(
    Object.values(items).map(async (value) => {
      const [compendium, table] = compendiumInfoFromString(value);
      return drawTableItem(compendium, table);
    })
  );
  return results.flatMap(item => foundry.utils.duplicate(item));
};

/**
 * @param {String} formula
 * @returns {Promise.<Object>}
 */
export const rollAbilities = async (formula) => ({
  STR: (await evaluateFormula(formula)).total,
  DEX: (await evaluateFormula(formula)).total,
  WIL: (await evaluateFormula(formula)).total
});

/**
 * @param {String} formula
 * @returns {Promise.<Number>}
 */
export const rollHitProtection = async (formula) => (await evaluateFormula(formula)).total;

/**
 * @param {String} formula
 * @returns {Promise.<Number>}
 */
export const rollGold = async (formula) => (await evaluateFormula(formula)).total;

/**
 * @description Roll starting gold and turn it into a quantity of a coin item
 * (e.g. "cairn.extra;Gold Coins"), instead of a bare number, since gold is
 * now tracked as regular (weightless) inventory items.
 * @param {String} formula dice formula for the amount, e.g. "3d6"
 * @param {String} compendiumItem "compendium;itemName" reference to a coin item
 * @returns {Promise.<CairnItem|undefined>}
 */
export const rollGoldItem = async (formula, compendiumItem) => {
  const amount = await rollGold(formula);
  if (!compendiumItem) return undefined;
  const [compendium, name] = compendiumInfoFromString(compendiumItem);
  const item = await findCompendiumItem(compendium, name);
  if (!item) return undefined;
  const data = foundry.utils.duplicate(item);
  data.system.quantity = amount;
  return data;
};

/**
 * @param {String} formula
 * @returns {Promise.<String>}
 */
export const rollAge = async (formula) => (await evaluateFormula(formula)).total;

/**
 * @param {Object} config
 * @returns {Promise.<String>}
 */
export const rollName = async (config) => formatString(config.text, await rollTextItems(config.items));

/**
 * @param {String} config
 * @returns {Promise.<String>}
 */
export const rollBackground = async (config) => drawTableText(...compendiumInfoFromString(config));

/**
 * @param {Object} config
 * @returns {Promise.<String>}
 */
export const rollBiography = async (config) => formatString(config.text,{
  age: await rollAge(config.age),
  ...await rollTextItems(config.items)
});

/**
 * @param {Object} items
 * @returns {Promise.<CairnItem[]>}
 */
export const rollStartingGear = async (items) => rollItems(items);

/**
 * @param {Object} items
 * @return {Promise<CairnItem[]>}
 */
export const findStartingItems = async (items) => Promise.all(
  items.map(async (compendiumItem) => {
    const [compendium, table, quantity = 1] = compendiumInfoFromString(compendiumItem);
    const item = foundry.utils.duplicate(await findCompendiumItem(compendium, table));
    item.system.quantity = parseInt(quantity, 10);
    return item;
  })
);

/**
 * @returns {Object}
 */
export const generateCharacter = async () => {
  console.log(`Creating new character`);

  const isPortuguese = (game.i18n.lang || "").toLowerCase().startsWith("pt");
  const characterGenerator = isPortuguese && Cairn.characterGeneratorPtBr
    ? Cairn.characterGeneratorPtBr
    : Cairn.characterGenerator;

  const [abilities, hp, name, biography, background, startingItems, startingGear, goldItem] = await Promise.all([
    rollAbilities(characterGenerator.ability),
    rollHitProtection(characterGenerator.hitProtection),
    rollName(characterGenerator.name),
    rollBiography(characterGenerator.biography),
    rollBackground(characterGenerator.background),
    findStartingItems(characterGenerator.startingItems),
    rollStartingGear(characterGenerator.startingGear),
    rollGoldItem(characterGenerator.gold, characterGenerator.goldItem),
  ]);

  return {
    name,
    hp,
    abilities,
    background,
    items: [...startingItems, ...startingGear, ...(goldItem ? [goldItem] : [])],
    biography,
  };
};

/**
 * @param {Object} characterData
 * @returns {Object}
 */
const characterToActorData = (characterData) => ({
  name: characterData.name,
  system: {
    abilities: {
      STR: { value: characterData.abilities.STR, max: characterData.abilities.STR },
      DEX: { value: characterData.abilities.DEX, max: characterData.abilities.DEX },
      WIL: { value: characterData.abilities.WIL, max: characterData.abilities.WIL },
    },
    hp: {
      max: characterData.hp,
      value: characterData.hp,
    },
    background: characterData.background,
    biography: characterData.biography,
  },
  items: characterData.items,
  token: {
    name: characterData.name,
    disposition: CONST.TOKEN_DISPOSITIONS.FRIENDLY,
    actorLink: true,
    vision: true,
  },
  type: "character",
});
