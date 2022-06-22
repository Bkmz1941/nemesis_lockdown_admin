import { createStore } from 'vuex'
import { Character } from "@/core/plugins/store/models"
import humps from "lodash-humps-ts"
import { plainToInstance } from 'class-transformer'
import CharacterBasicAction from './models/CharacterBasicAction'
import { transformAndValidate } from "class-transformer-validator"
import CharacterActionCard from './models/CharacterActionCard'

var url: string = "http://localhost:8001"

const state: {
    characters: Character[] | null
    characterBasicActions: CharacterBasicAction[] | null,
    charactersActionsCards: { [key: string]: CharacterActionCard };
} = {
    characters: null,
    characterBasicActions: null,
    charactersActionsCards: {}
}

export default createStore({
    state,
    actions: {
        async fecthCharacters(context) {
            try {
                const response: Response = await fetch(url + "/api/characters")
                const json: any = humps(await response.json());
                const characters: Character[] = await transformAndValidate(Character, json) as Character[]

                characters.map(async (el: Character) => {
                    const response: Response = await fetch(url + `/api/characters/actions/cards?character=${el.getSystemName()}`)
                    const json: any = humps(await response.json())
                    const characterActionCards = await transformAndValidate(CharacterActionCard, json) as CharacterActionCard
                    context.commit('mutateCharacterActionCard', { 'name': el.getSystemName(), 'cards': characterActionCards })
                })
    
                context.commit('mutateCharacters', characters)
    
                return characters;
            } catch (e: any) {
                console.log(e);
                throw new Error("Ошибка получения данных персонажей");
            }
        },
        async fecthCharactersBasicActions(context) {
            const response: Response = await fetch(url + "/api/characters/actions/basic")
            const json: any = humps(await response.json());
            const characterBasicActions: CharacterBasicAction[] = plainToInstance(CharacterBasicAction, json);
            context.commit('mutateCharacterBasicActions', characterBasicActions)
            return characterBasicActions;
        },
        async fecthCharactersActionCards(context, characterSystemName): Promise<CharacterActionCard> {
            try {
                const response: Response = await fetch(url + `/api/characters/actions/cards?character=${characterSystemName}`)
                const json: any = humps(await response.json());
                return await transformAndValidate(CharacterActionCard, json, { transformer: { excludePrefixes: ['_'] } }) as CharacterActionCard
            } catch (e: any) {
                console.log(e);
                throw new Error("Ошибка получения данных карт действий");
            }
        },
    },
    mutations: {
        mutateCharacters(state: any, characters: Character[]) {
            state.characters = characters
        },
        mutateCharacterBasicActions(state: any, characterBasicActions: CharacterBasicAction[]) {
            state.characterBasicActions = characterBasicActions
        },
        mutateCharacterActionCard(state: any, { name, cards }) {
            state.charactersActionsCards[name] = cards
        }
    }
})