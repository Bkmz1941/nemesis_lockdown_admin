<template>
    <v-dialog
        v-model="isOpen"
        class="character-action-cards__modal"
        @click:outside="close"
    >
        <v-card>
            <div class="swiper-box">
                <swiper
                    :slides-per-view="5"
                    :space-between="8"
                    :centeredSlides="true"
                    :pagination="{
                        clickable: true,
                    }"
                    :modules="modules"
                    class="cards-swiper"
                    @swiper="onSwiper"
                    @slideChange="onSlideChange"
                >
                    <swiper-slide
                        v-for="characterActionCard in characterActionsCards"
                        :key="characterActionCard.id"
                        :class="character.systemName"
                    >
                        <!-- <div class="bg" :style="{'background-image': 'url('+characterActionCard.fullImageLink+')'}"></div> -->
                        <div class="title">
                            <h3>{{ characterActionCard.name }}</h3>
                        </div>
                        <div class="actions">
                            <div
                                class="action"
                                v-for="card in characterActionCard.values"
                                :key="card.id"
                            >
                                <div class="content">
                                    <span class="name">{{
                                        card.name
                                    }}</span>
                                    <span class="description">{{
                                        card.description
                                    }}</span>
                                </div>
                                <div class="overlay"></div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from "@vue/runtime-core";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useStore } from "vuex";
import { toRef } from "vue";
import CharactersViewCharacter from "@/views/characters/models/CharactersViewCharacter";
import { transformAndValidate } from "class-transformer-validator";
import CharacterActionCard, { CharacterActionCardValue, CharacterActionCards } from "@/core/plugins/store/models/CharacterActionCard";
import { plainToClass } from "class-transformer";

export default defineComponent({
    props: {
        character: {
            type: CharactersViewCharacter,
            required: true,
        },
        dialog: {},
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    watch: {
        dialog(val) {
            if (val) this.isOpen = true;
        },
    },
    setup(props: any) {
        let isOpen = ref(false);
        const store = useStore();

        let character: Ref<CharactersViewCharacter> = toRef(props, 'character')
        let characterActionsCards = computed(() => {
            const cards: CharacterActionCard[] = [];
            store.state.charactersActionsCards[character.value.getSystemName()].map((el: any) => {
                cards.push(plainToClass(CharacterActionCard, el))
            })
            return cards;
        })
    
        const onSwiper = (swiper: any) => {};
        const onSlideChange = () => {};

        return {
            character,
            isOpen,
            modules: [Pagination],
            onSwiper,
            onSlideChange,
            characterActionsCards,
        };
    },
    methods: {
        close() {
            this.$emit("close");
        },
    },
});
</script>

<style lang="scss">
.character-action-cards__modal {
    .v-overlay__scrim {
        opacity: 70%;
    }

    .swiper-box {    
        padding: 8px 0px 0px;

        @media (min-width: 960px) {
            width: 1100px;
        }
        @media (min-width: 1440px) {
            width: 1440px;
        }   

        .swiper-slide {
            cursor: pointer;
            background-color: lightgray;
            display: flex;
            width: 340px;
            height: 500px;
            background-size: cover;
            background-position: center;
            border-radius: 4px;
            // border: 1px solid lightgrey;
            position: relative;
            align-self: center;
            opacity: 0.4;
            transition: 0.7s opacity;

             .bg {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background-position-x: center;
                background-size: cover;
            }


            &.swiper-slide-active {
                opacity: 1;

                .bg {
                    &::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: inherit;
                        background-size: cover;
                        opacity: .5;
                        mix-blend-mode: hard-light;
                        animation: glitch1 5s infinite;
                    }
                }

                // position: relative;
                // width: 100%;
                // height: 100vh;
                // background-size: cover;

                .action {
                    padding: 8px;
                    position: relative;

                    &:hover {
                        .overlay {
                            opacity: 0.7;
                        }
                        
                    }
                }
            }

            .title {
                background-color: #FFF;
                position: absolute;
                top: 4px;
                left: 4px;
                right: 4px;
                display: flex;
                flex-direction: column;
                padding: 8px;
            }

            .actions {
                background-color: #FFF;
                position: absolute;
                bottom: 4px;
                left: 4px;
                right: 4px;
                display: flex;
                flex-direction: column;

                .action {
                    padding: 8px;
                    position: relative;

                    .content {
                        display: flex;
                        flex-direction: column;
                        position: relative;
                        z-index: 100;

                        .name {
                            font-weight: 600;
                        }
    
                        .description {
                            font-size: 80%;
                        }
                    }

                    .overlay {
                        z-index: 99;
                        opacity: 0;
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background-color: lightgreen;
                        border: 2px solid lightgreen;
                    }

                    & + .action {
                        border-top: 1px solid lightgrey;
                    }
                }
               
            }
        }
        .swiper-pagination {
            position: unset;
        }
    }
}
</style>