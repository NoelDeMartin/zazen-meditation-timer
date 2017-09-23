<template>
    <div id="app" class="fullpage flex flex-center flex-column">
        <div class="hero-title">
            <h1 class="title">座禅</h1>
            <h2 class="subtitle">Meditation Timer</h2>
        </div>
        <timer :model="timer"></timer>
    </div>
</template>

<script lang="ts">

    import Vue from 'vue';
    import Component from 'vue-class-component';

    import Timer from './components/Timer.vue';

    import TimerModel   from './models/Timer';

    @Component({
        components: {
            timer: Timer
        }
    })
    export default class App extends Vue {

        timer: TimerModel = new TimerModel(30);

    }

</script>
