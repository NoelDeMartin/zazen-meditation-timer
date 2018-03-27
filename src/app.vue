<style lang="scss">

    $logo-height: 15vh;
    $buttons-spacing: 8px;

    #app {
        background: #eeffdc;
        overflow: scroll;

        .hero-title {

            .title {
                background: url('img/logo.png') no-repeat;
                background-size: contain;
                background-position: center;
                height: $logo-height;
                width: $logo-height * 2;
            }

            .subtitle {
                font-family: 'Patrick Hand', cursive;
                font-size: 3vh;
            }

        }

        & > .buttons {
            padding: $buttons-spacing;
            display: flex;
            flex-direction: column;
            width: 300px;
        }

    }

</style>

<template>

    <div id="app" class="fullpage flex flex-center flex-column">

        <div class="hero-title">
            <h1 class="title"></h1>
            <h2 class="subtitle">MEDITATION TIMER</h2>
        </div>

        <timer :model="timers[currentTimer]"></timer>

        <div class="buttons">

            <timer-button
                v-for="(timer, index) in timers"
                :key="index"
                :timer="timer"
                @click="currentTimer = index"
            >
            </timer-button>

        </div>

    </div>

</template>

<script lang="ts">

    import Vue from 'vue';
    import Component from 'vue-class-component';

    import Timer       from './components/Timer.vue';
    import TimerButton from './components/TimerButton.vue';

    import TimerModel   from './models/Timer';

    @Component({
        components: {
            'timer': Timer,
            'timer-button': TimerButton
        }
    })
    export default class App extends Vue {

        currentTimer: number = 0;
        timers: TimerModel[] = [
            new TimerModel(60),
            new TimerModel(600),
            new TimerModel(1200),
        ];

    }

</script>
