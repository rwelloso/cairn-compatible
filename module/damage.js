import { findCompendiumItem } from './compendium.js'
import { evaluateFormula } from './utils.js'

export class Damage {

    /**
     * @description Prompt the player to choose Impaired (1d4) / Normal / Enhanced (1d12),
     * per the attack modifier rules.
     * @returns {Promise<"impaired"|"normal"|"enhanced"|null>}
     */
    static async promptRollMode() {
        try {
            return await foundry.applications.api.DialogV2.wait({
                window: { title: game.i18n.localize("CAIRN.RollDamage") },
                content: `<p>${game.i18n.localize("CAIRN.ChooseRollMode")}</p>`,
                buttons: [
                    { action: "impaired", label: game.i18n.localize("CAIRN.Impaired") },
                    { action: "normal", label: game.i18n.localize("CAIRN.Normal"), default: true },
                    { action: "enhanced", label: game.i18n.localize("CAIRN.Enhanced") },
                ],
                rejectClose: false,
            });
        } catch {
            return null;
        }
    }

    /**
     * @description Roll weapon damage, prompting for Impaired/Normal/Enhanced unless the
     * character is panicked (in which case the attack is always impaired). Shared between
     * the character sheet click handler and hotbar item macros.
     * @param {CairnActor} actor
     * @param {String} itemName
     * @param {String} damageFormula
     */
    static async rollWeaponDamage(actor, itemName, damageFormula) {
        const usePanic = game.settings.get("cairn", "use-panic");
        let panicLabel = "";
        let formula = damageFormula;
        let modeLabel = "";

        if (usePanic && actor.system.panicked) {
            // A panicked character's attacks are always impaired, per the rules.
            formula = "1d4";
            panicLabel = "(" + game.i18n.localize("CAIRN.RollingWithPanic") + ")";
        } else {
            const choice = await this.promptRollMode();
            if (!choice) return;
            if (choice === "impaired") {
                formula = "1d4";
                modeLabel = `(${game.i18n.localize("CAIRN.Impaired")}) `;
            } else if (choice === "enhanced") {
                formula = "1d12";
                modeLabel = `(${game.i18n.localize("CAIRN.Enhanced")}) `;
            }
        }

        const roll = await evaluateFormula(formula, actor.getRollData());
        const label = itemName
            ? game.i18n.localize("CAIRN.RollingDmgWith") + ` ${itemName} ` + modeLabel + panicLabel
            : "";

        const targetedTokens = Array.from(game.user.targets).map((t) => t.id);
        let targetIds;
        if (targetedTokens.length == 0) targetIds = null;
        else if (targetedTokens.length == 1) targetIds = targetedTokens[0];
        else {
            targetIds = targetedTokens[0];
            for (let index = 1; index < targetedTokens.length; index++) {
                targetIds = targetIds.concat(";", targetedTokens[index]);
            }
        }

        const rollMessageTpl = "systems/cairn/templates/chat/dmg-roll-card.html";
        const msg = await renderTemplate(rollMessageTpl, { label, targets: targetIds });
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor }),
            flavor: msg,
        });
    }

    /**
     * @description Apply damage to several tokens
     * @param {String[]} targets Array of Id of the targeted tokens
     * @param {Number} damage Positive number
     */
    static async applyToTargets(targets, damage) {
        for (const target of targets) {
            const data = await this.applyToTarget(target, damage);
            this._showDetails(data);
        };
    }

    /**
     * @description Apply damage to one token
     * @param {*} target Id of one token
     * @param {*} damage Amount of damaage
     * @returns actor + old and new values
     */
    static async applyToTarget(target, damage) {
        const token = canvas.scene.tokens.get(target);

        const armor = token.actor.system.armor;
        const hp = token.actor.system.hp.value;
        const str = token.actor.system.abilities.STR.value;

        let { dmg, newHp, newStr } = this._calculateHpAndStr(damage, armor, hp, str);
        if (newStr < 0) newStr = 0; // cannot drop below being dead

        await token.actor.update({ 'system.hp.value': newHp, 'system.abilities.STR.value': newStr });

        return { token, dmg, damage, armor, hp, str, newHp, newStr };
    }

    /**
     * @description Apply damage to a target token based on the token's id
     * @param {*} event 
     * @param {*} html 
     * @param {*} data 
     */
    static onClickChatMessageApplyButton(event, html, data) {
        const btn = $(event.currentTarget);
        const targets = btn.data("targets");

        let targetsList = targets.split(';');

        // Shift Click allow to target the targeted tokens
        if (event.shiftKey) {
            for (let index = 0; index < targetsList.length; index++) {
                const target = targetsList[index];
                const token = canvas.scene.tokens.get(target).object;
                const releaseOthers = (index == 0 ? (!token.isTargeted ? true : false) : false);
                const targeted = !token.isTargeted;
                token.setTarget(targeted, { releaseOthers: releaseOthers });
            }
        }
        // Apply damage to targets
        else {
            if (targets !== undefined) {
                const dmg = parseInt(html.querySelector(".dice-total").textContent);
                this.applyToTargets(targetsList, dmg);
            }
        }
    }

    /**
     * @description Damage are reduced by armor, then apply to HP, and then to STR if not enough HP
     * @param {*} damage 
     * @param {*} armor 
     * @param {*} hp 
     * @param {*} str 
     * @returns damage done, new HP value and STR value
     */
    static _calculateHpAndStr(damage, armor, hp, str) {
        let dmg = damage - armor;
        if (dmg < 0) dmg = 0;

        let newHp;
        let newStr = str;
        if (dmg <= hp) {
            newHp = hp - dmg;
            if (newHp < 0) newHp = 0;
        }
        else {
            newHp = 0;
            newStr = str - (dmg - hp);
        }

        return { dmg, newHp, newStr };
    }

    /**
     * Show chat message details of damage done for a token
     * @param data
     * @private
     */
    static _showDetails(data) {

        const { token, dmg, damage, armor, hp, str, newHp, newStr } = data

        

        if (str == 0) {
            ChatMessage.create({
                user: game.user._id,
                speaker: ChatMessage.getSpeaker({ token: token }),
                content: '<strong>' + game.i18n.localize('CAIRN.Dead') + '</strong>',
            }, {});
            return;
        }

        let content = '<p><strong>' + game.i18n.localize('CAIRN.Damage') + '</strong>: ' + dmg + ' (' + damage + '-' + armor + ')</p>'
        if (newHp !== hp) {
            content += '<p><strong>' + game.i18n.localize('CAIRN.HitProtection') + '</strong>: <s>' + hp + '</s> => ' + newHp + '</p>'
        } else {
            content += '<p><strong>' + game.i18n.localize('CAIRN.HitProtection') + '</strong>: ' + hp + '</p>'
        }
        if (newStr !== str) {
            content += '<p><strong>' + game.i18n.localize('STR') + '</strong>: <s>' + str + '</s> => ' + newStr + '</p>'
        }

        if (newStr < str) {
            if (newStr === 0) {
                content += '<strong>' + game.i18n.localize('CAIRN.Dead') + '</strong>'
            } else {
                content += '<p><strong>' + game.i18n.localize('CAIRN.StrSave') + '</strong></p>'
                content += '<button type="button" class="roll-str-save">' + game.i18n.localize('CAIRN.RollStrSave') + '</button>'
            }
        } else if (newHp === 0 && hp !== 0) {
            if (game.settings.get("cairn", "auto-roll-scars")) {
                this._rollScarsTable(dmg);
            }
        }

        ChatMessage.create({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({ token: token }),
            content: content,
        }, {})

    }

    static async _rollScarsTable(damage) {
        const isPortuguese = (game.i18n.lang || "").toLowerCase().startsWith("pt");
        const compendium = isPortuguese ? "cairn.ptbr-tabelas" : "cairn.utils";
        const tableName = isPortuguese ? "Cicatrizes" : "Scars";
        const table = await findCompendiumItem(compendium, tableName);
        if (!table) return;
        const roll = new Roll(damage.toString());
        await table.draw({ roll });
    }

    static async _rollStrSave(token, html) {
        const roll = await evaluateFormula("d20cs<=@STR", token.actor.getRollData());
        const label = game.i18n.format("CAIRN.Save", { key: game.i18n.localize("STR") });
        const rolled = roll.terms[0].results[0].result;
        const result = roll.total === 0 ? game.i18n.localize("CAIRN.Fail") : game.i18n.localize("CAIRN.Success");
        const resultCls = roll.total === 0 ? "failure" : "success";
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ token: token }),
            flavor: label,
            content: `<div class="dice-roll"><div class="dice-result"><div class="dice-formula">${roll.formula}</div><div class="dice-tooltip" style="display: none;"><section class="tooltip-part"><div class="dice"><header class="part-header flexrow"><span class="part-formula">${roll.formula}</span></header><ol class="dice-rolls"><li class="roll die d20">${rolled}</li></ol></div></section></div><h4 class="dice-total ${resultCls}">${result} (${rolled})</h4</div></div>`,
        });
        html.querySelector(".roll-str-save").setAttribute('disabled', 'disabled')
    }
}
