
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { VApp, VAppBar, VContainer, VMain, VRow, VCol, VSheet, VImg, VIcon } from 'vuetify/components'

// Vuetify
import { createVuetify } from 'vuetify'

// import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
    directives,
    components: { VApp, VAppBar, VContainer, VMain, VRow, VCol, VSheet, VImg, VIcon },
    display: {
        mobileBreakpoint: 'sm',
        thresholds: {
            xs: 0,
            sm: 340,
            md: 540,
            lg: 800,
            xl: 1300,
        },
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    // directives,
})