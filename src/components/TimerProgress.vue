<style lang="scss">

    .timer-progress {
        position: relative;
        z-index: -1;

        .background, .fill-right, .fill-left, .bar {
            @include fill-absolute();
        }

        .background {
            border-radius: 50%;
            border: 5px solid grey;
        }

        .fill-left, .fill-right {
            overflow: hidden;
        }

        .bar {
            border-radius: 50%;
            border: 5px solid red;
        }

        .fill-right {
            clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);

            .bar {
                clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
            }

        }

        .fill-left {
            clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);

            .bar {
                clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
            }

        }

    }

</style>

<template>

    <div class="timer-progress">

        <span class="background"></span>

        <div class="fill-right">
            <span class="bar" :style="rightBarStyles"></span>
        </div>

        <div class="fill-left">
            <span class="bar" :style="leftBarStyles"></span>
        </div>

    </div>

</template>

<script lang="ts">

    import Vue          from 'vue';
    import Component    from 'vue-class-component';

    @Component({
        props: [ 'progress' ]
    })
    export default class TimerProgress extends Vue {

        progress: number;

        get rightBarStyles(): string {
            let degrees = 180 * (0.5 - Math.min(0.5, this.progress)) / 0.5;
            return `transform:rotate(-${degrees}deg)`;
        }

        get leftBarStyles(): string {
            let degrees = 180 + 180 * (Math.max(0.5, this.progress) - 0.5) / 0.5;
            return `transform:rotate(${degrees}deg)`;
        }

    }

</script>
