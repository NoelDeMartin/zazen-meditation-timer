<template>

    <div id="app" class="fullpage flex flex-center flex-column">

        <div class="hero-title">
            <h1 class="title">座禅</h1>
            <h2 class="subtitle">Meditation Timer</h2>
        </div>

        <timer :model="timers[currentTimer]"></timer>

        <button
            class="timer-button"
            v-for="(timer, index) in timers"
            :key="index"
            @click="currentTimer = index"
        >
            {{ timer.durationForHumans }}
        </button>

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

        currentTimer: number = 0;
        timers: TimerModel[] = [
            new TimerModel(600),
            new TimerModel(1200),
        ];

    }

</script>
