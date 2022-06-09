<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <v-container class="fill-height">
        
      </v-container>
    </v-app-bar>
    <v-main class="bg-grey-lighten-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default {
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"],
  }),

  watch: {},
};
</script>