// import { createApp } from 'vue';
import { createApp } from 'vue/dist/vue.esm-bundler';
import {vuetify} from './plugins';
import App from '@components/App.vue';
import { loadFonts } from './plugins/webfontloader'
import router from './plugins/vue-router'
import store from './plugins/store/store'
import "./scss/index.scss"

loadFonts()


createApp(App)
    .use(router)
    .use(store)
    .use(vuetify)
    .mount('#app');