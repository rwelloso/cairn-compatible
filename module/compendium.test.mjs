// Minimal runnable check for findCompendiumItem's index-based lookup.
// Run with: node module/compendium.test.mjs
import assert from "node:assert/strict";
import { findCompendiumItem } from "./compendium.js";

// Mock a Foundry CompendiumCollection: getIndex() returns lightweight
// entries (no full document body), getDocument(id) resolves the full doc.
function mockPack(entries) {
  let indexCalls = 0;
  let getDocumentCalls = 0;
  return {
    stats: () => ({ indexCalls, getDocumentCalls }),
    getIndex: async () => {
      indexCalls++;
      return entries.map(({ _id, name }) => ({ _id, name }));
    },
    getDocument: async (id) => {
      getDocumentCalls++;
      return entries.find((e) => e._id === id);
    },
  };
}

const pack = mockPack([
  { _id: "abc123", name: "Tocha", full: "full document body" },
  { _id: "def456", name: "Rações", full: "full document body" },
]);

globalThis.game = { packs: new Map([["cairn.ptbr-equipamento", pack]]) };

const found = await findCompendiumItem("cairn.ptbr-equipamento", "Tocha");
assert.equal(found.name, "Tocha");
assert.equal(found.full, "full document body");

const missing = await findCompendiumItem("cairn.ptbr-equipamento", "Not A Real Item");
assert.equal(missing, undefined);

const noPack = await findCompendiumItem("cairn.does-not-exist", "Tocha");
assert.equal(noPack, undefined);

// The whole point of the fix: getIndex (cheap) is used for the name
// search, getDocument (targeted) only fetches the one match - never a
// full-pack instantiation of every document.
const { indexCalls, getDocumentCalls } = pack.stats();
assert.equal(indexCalls, 2, "expected one getIndex() call per successful+missing lookup on this pack");
assert.equal(getDocumentCalls, 1, "expected getDocument() only for the one match found, not the whole pack");

console.log("All findCompendiumItem checks passed.");
