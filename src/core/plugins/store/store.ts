import { createStore } from 'vuex'
import { Character } from "@/core/plugins/store/entities"
import humps from "lodash-humps-ts";
import { plainToInstance } from 'class-transformer';
import CharacterBasicAction from './entities/CharacterBasicAction';

var url: string = "http://localhost:8001";

const state: {
    characters: Character[] | null
    characterBasicActions: CharacterBasicAction[] | null
} = {
    characters: null,
    characterBasicActions: null
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
            context.commit('mutateCharacterBasicAction', characterBasicActions)
            return characterBasicActions;
        }
    },
    mutations: {
        mutateCharacters(state: any, characters: Character[]) {
            state.characters = characters;
        },
        mutateCharacterBasicAction(state: any, characterBasicActions: CharacterBasicAction[]) {
            state.characterBasicActions = characterBasicActions;
        }
    }
})