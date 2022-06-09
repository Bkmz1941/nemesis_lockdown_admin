<template>
    <v-container>
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
                            <div class="basic_actions">
                                <div
                                    class="action"
                                    v-for="action in characterBasicActions"
                                    :key="action.getId()"
                                    v-touch="{
                                        start: () => log()
                                    }"
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
                        <img
                            class="bg"
                            :src="selectedCharacter.getFullImageLink()"
                        />
                    </div>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>
 
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import CharactersViewController from "./controller/CharactersViewController";

export default defineComponent({
    setup() {
        const controller = CharactersViewController.getInstance();
        controller.fetchCharacters();
        controller.fetchCharactersBasicActions();

        return {
            selectedCharacter: controller.selectedCharacter,
            characters: controller.characters,
            characterBasicActions: controller.characterBasicActions,
        };
    },
    methods: {
        selectCharacter(id: number) {
            console.log(123213);
            
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
        log() {
            console.log(213213);
        }
    },
});
</script>

<style lang="scss" src="./styles/index.scss" />