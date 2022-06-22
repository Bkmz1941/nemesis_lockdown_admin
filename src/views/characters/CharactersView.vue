<template>
    <v-container>
        <SwiperCharacterActionCards 
            v-if="selectedCharacter" 
            :dialog="dialog" 
            :character="selectedCharacter" 
            @close="dialog = false"
        />
        <v-row>
            <v-col cols="2">
                <v-sheet
                    rounded="lg"
                    class="fade-in"
                    v-if="characters.length > 0"
                >
                    <div class="characters">
                        <div
                            class="character"
                            v-for="c in characters"
                            :key="`${c.getId()} + ${c.getSelected()}`"
                            @click="selectCharacter(c.getId())"
                        >
                            <img :src="c.getMiniImageLink()" />
                        </div>
                    </div>
                </v-sheet>
            </v-col>
            <v-col>
                <v-sheet rounded="lg" class="fade-in" v-if="selectedCharacter">
                    <div class="character-info">
                        <div class="info">
                            <h1>{{ selectedCharacter.getName() }}</h1>
                        </div>
                        <div class="actions">
                            <h2 class="text-white">Основные действия</h2>
                            <div class="actions-box">
                                <div class="cards" @click="openCards">
                                    <v-icon icon="mdi-cards-outline" />
                                </div>
                                <div class="basic_actions">
                                    <div
                                        class="action"
                                        v-for="action in characterBasicActions"
                                        :key="action.getId()"
                                    >
                                        <span> {{ action.getName() }}</span>
                                        <v-icon
                                            :icon="
                                                action.getCost() == 1
                                                    ? 'mdi-numeric-1-box'
                                                    : 'mdi-numeric-2-box'
                                            "
                                        />
                                        <!-- <v-icon
                                            v-if="action.getAvailable() == 'IN_COMBAT'"
                                            icon="mdi-pistol"
                                        /> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img
                            class="bg"
                            :src="selectedCharacter.getFullImageLink()"
                        />
                        <div class="character-color"></div>
                    </div>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>
 
<script lang="ts">
import { defineComponent, Ref, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import CharactersViewController from "./controller/CharactersViewController";
import CharacterActionCard, { CharacterActionCardValue } from "@/core/plugins/store/entities/CharacterActionCard";
import SwiperCharacterActionCards from "@/components/character-action-cards/SwiperCharacterActionCards.vue";

export default defineComponent({
    components: {
        SwiperCharacterActionCards
    },
    setup() {
        const controller = CharactersViewController.getInstance();
        controller.fetchCharacters();
        controller.fetchCharactersBasicActions();
        let dialog = ref(false);
        const store = useStore();
        const characterActionCards: Ref<CharacterActionCard[]> = ref([]);

        return {
            characterActionCards,
            store,
            dialog,
            controller,
            selectedCharacter: controller.selectedCharacter,
            characters: controller.characters,
            characterBasicActions: controller.characterBasicActions,
        };
    },
    methods: {
        selectCharacter(id: number) {
            this.characters = this.characters.map((el) => {
                if (el.getSelected() === true && el.getId() !== id) {
                    el.setSelected(false);
                }
                if (el.getId() === id) {
                    el.setSelected(true);
                }
                return el;
            });
        },
        async openCards() {
            // this.characterActionCards = await this.store.dispatch("fecthCharactersActionCards", 'sentry')
            this.dialog = true;
        }
    },
    unmounted() {
        this.controller.destroy();
    },
});
</script>

<style lang="scss" src="./styles/index.scss" />