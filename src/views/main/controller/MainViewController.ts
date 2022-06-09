import { computed, ComputedRef, defineComponent, reactive, ReactiveEffect, Ref, WritableComputedRef } from "@vue/runtime-core";
import { Store, useStore } from "vuex";
import { ref } from "vue";
import { Character } from "@/core/plugins/store/entities";
import MainViewCharacter from "../models/MainViewCharacter";
import MainViewCharacterBasicActions from "../models/MainViewCharacterBasicActions";
import { plainToInstance } from "class-transformer";

export default class MainViewController {
    private static instance: MainViewController | null = null
    private _characters_box: Ref<MainViewCharacter[]>
    private _characters: WritableComputedRef<MainViewCharacter[]>
    private _character_basic_actions_box: Ref<MainViewCharacterBasicActions[]>
    private _character_basic_actions: WritableComputedRef<MainViewCharacterBasicActions[]>
    private _selectedCharacter: ComputedRef<MainViewCharacter | null>
    private _store: Store<any> | null

    private constructor() {
        const self = this;

        this._store = useStore();
        this._characters_box = ref([]);
        this._characters = computed({
            get() {
                try {
                    if (self._characters_box.value.length === 0 && self._store?.state.characters) {
                        self._characters_box.value = plainToInstance(
                            MainViewCharacter,
                            self._store?.state.characters
                        );
                        self._characters_box.value[0].setSelected(true);
                    }
                } catch (e) {
                    console.log(e);
                } finally {
                    return self._characters_box.value;
                }
            },
            set(val: MainViewCharacter[]) {
                self._characters_box.value = val
            }
        })
        this._selectedCharacter = computed(() => {
            try {
                if (self._characters_box.value.length > 0) {
                    return self._characters_box.value.find((el) => el.getSelected() === true) ?? null
                }
            } catch (e) {
                console.log(e);
            }
            return null;
        })
        this._character_basic_actions_box = ref([]);
        this._character_basic_actions = computed({
            get() {
                try {
                    if (self._character_basic_actions_box.value.length === 0 && self._store?.state.characterBasicActions) {
                        self._character_basic_actions_box.value = plainToInstance(
                            MainViewCharacterBasicActions,
                            self._store?.state.characterBasicActions
                        );
                    }
                } catch (e) {
                    console.log(e);
                } finally {
                    return self._character_basic_actions_box.value;
                }
            },
            set(val: MainViewCharacterBasicActions[]) {
                self._character_basic_actions_box.value = val
            }
        });
    }

    public static getInstance() {
        if (MainViewController.instance === null) {
            MainViewController.instance = new MainViewController()
        }

        return MainViewController.instance
    }

    get characters() {
        return this._characters
    }

    get selectedCharacter() {
        return this._selectedCharacter
    }

    get characterBasicActions() {
        return this._character_basic_actions
    }

    public fetchCharacters() {
        this._store!.dispatch("fecthCharacters")
    }

    public fetchCharactersBasicActions() {
        this._store!.dispatch("fecthCharactersBasicActions")
    }
}