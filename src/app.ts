import Vue from 'vue';
import app from './app.vue';

new Vue({
    components: { app: app },
    template: '<app></app>',
}).$mount('#app');
