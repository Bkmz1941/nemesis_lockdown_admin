import { createStore } from 'vuex'
import { Character } from "@/core/plugins/store/entities"
import humps from "lodash-humps-ts";
import { plainToInstance } from 'class-transformer';
import CharacterBasicAction from './entities/CharacterBasicAction';

var url: string = "http://localhost:8001";

const state: {
    characters: Character[] | null
    characterBasicActions: CharacterBasicAction[] | null,
    characterCardActions: any,
} = {
    characters: null,
    characterBasicActions: null,
    characterCardActions: null
};

export default createStore({
    state,
    actions: {
        async fecthCharacters(context) {
            const response: Response = await fetch(url + "/api/characters")
            const json: any = humps(await response.json());
            const characters: Character[] = plainToInstance(Character, json);
            context.commit('mutateCharacters', characters)
            return characters;
        },
        async fecthCharactersBasicActions(context) {
            const response: Response = await fetch(url + "/api/characters/actions/basic")
            const json: any = humps(await response.json());
            const characterBasicActions: CharacterBasicAction[] = plainToInstance(CharacterBasicAction, json);
            context.commit('mutateCharacterBasicActions', characterBasicActions)
            return characterBasicActions;
        },
        async fecthCharactersCardActions(context, characterSystemName) {
            const response: Response = await fetch(url + `/api/characters/actions/cards?character=${characterSystemName}`)
            const json: any = humps(await response.json());
            const characterCardActions: any = json;
            return characterCardActions;
        }
    },
    mutations: {
        mutateCharacters(state: any, characters: Character[]) {
            state.characters = characters;
        },
        mutateCharacterBasicActions(state: any, characterBasicActions: CharacterBasicAction[]) {
            state.characterBasicActions = characterBasicActions;
        },
        mutateCharacterCardActions(state: any, characterCardActions: any) {
            state.characterCardActions = characterCardActions;
        }
    }
})