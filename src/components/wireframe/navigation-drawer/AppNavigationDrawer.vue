<template>
{{drawer}}
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-folder"
          title="Персонажи"
          link
          to="/characters"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-folder"
          title="комнаты"
          link
          to="/rooms"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { defineAsyncComponent } from 'vue'
import { ref } from "vue";

export default defineComponent({
    props: ["drawer"],
    setup(props: any) {
        const drawer: boolean = props.drawer;
        console.log(drawer);
        
        return {
            drawer
        }
    },
    watch: {
        "drawer"(val: boolean) {
            console.log(val);
        }
    }
});
</script>