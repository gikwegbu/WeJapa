import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'md' || 'fa'
    },
    theme: {
        themes: {
            light: {
                primary: '#1dbf69'
            },
            dark: {
                primary: '#1dbf69'
            }
        }
    }
});
