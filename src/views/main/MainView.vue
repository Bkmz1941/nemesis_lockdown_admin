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
import MainViewController from "./controller/MainViewController";

export default defineComponent({
    setup() {
        const controller = MainViewController.getInstance();
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
    },
});
</script>

<style lang="scss">
.characters {
    padding: 4px;

    .character {
        cursor: pointer;
        position: relative;
        height: 48px;
        box-sizing: content-box;

        &:hover {
            opacity: 0.7;
        }

        img {
            height: inherit;
            width: 100%;
            border-radius: 4px;
            object-fit: cover;
        }

        .name {
            position: absolute;
            left: 4px;
            top: 4px;
            color: #000;
            background-color: #fff;
            line-height: 100%;
            padding: 2px 4px;
            border-radius: 4px;
        }

        & + .character {
            margin-top: 4px;
        }
    }
}
.character-info {
    position: relative;
    height: inherit;
    padding: 4px;
    display: flex;

    .info {
        position: absolute;
        top: 16px;
        left: 16px;
        background-color: #fff;
        padding: 4px;
        border-radius: 4px;
    }

    .actions {
        position: absolute;
        bottom: 16px;
        left: 16px;

        .basic_actions {
            background-color: #fff;
            border-radius: 4px;
            padding: 4px;

            .action {
                gap: 16px;
                display: flex;
                justify-content: space-between;
                padding: 2px 4px;
                border-radius: inherit;
                border: 1px solid lightgrey;
                font-weight: 600;
                cursor: pointer;
                font-size: 21px;

                span {
                    flex: 1;
                    // flex: 1 200px;
                }

                i {
                    // flex: 1;
                }

                &:hover {
                    opacity: 0.7;
                }

                & + .action {
                    margin-top: 2px;
                }
            }
        }
    }

    .bg {
        height: inherit;
        width: 100%;
        border-radius: 4px;
        object-fit: cover;
    }
}
</style>
