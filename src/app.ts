import Vue from 'vue';
import app from './app.vue';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

new Vue({
    components: { app: app },
    template: '<app></app>',
}).$mount('#app');
