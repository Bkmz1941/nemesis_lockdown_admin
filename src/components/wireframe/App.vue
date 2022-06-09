<template>
  <v-app class="fade-in">
    <v-navigation-drawer width="57">
      <v-list>
        <v-list-item
          prepend-icon="mdi-folder"
          class=""
          to="/characters"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="white" flat>
      <v-btn to="/">Nemesis Lockdown</v-btn>
      <v-container class="fill-height py-0 app-bar--container">
        <v-spacer></v-spacer>
      </v-container>
    </v-app-bar>
    <v-main class="bg-grey-lighten-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ref } from "vue";

export default defineComponent({
  setup() {
    let drawer = ref(false)

    return {
      drawer
    }
  }
});
</script>

<style lang="scss" src="./style/index.scss"></style>