<style lang="scss">

    $timer-dimensions: 350px;
    $button-dimensions: 60px;

    .timer {
        width: $timer-dimensions;
        height: $timer-dimensions;
        position: relative;
        flex-shrink: 0;

        @include flex-center();

        .timer-progress {
            @include fill-absolute();
        }

        .time {
            z-index: 10;
            color: #2b1100;
            margin-bottom: 20px;
            font-family: 'Comfortaa', cursive;
        }

        .buttons {
            z-index: 10;

            @include flex-center('row');

            .button {
                width: $button-dimensions;
                height: $button-dimensions;
                border-radius: $button-dimensions / 2;
                cursor: pointer;
                font-size: $button-dimensions * 0.4;
                color: #2b1100;
                background: #e09d72;

                @include flex-center();

                &:hover {
                    background: #a1622b;
                }

                &:not(:last-child) {
                    margin-right: 10px;
                }

            }

        }

    }

</style>

<template>

    <div class="timer">

        <timer-progress :progress="model.progress"></timer-progress>

        <span class="time size-humongous">
            {{ model.timeLeftForHumans }}
        </span>

        <div class="buttons">

            <template v-if="!model.playing">

                <div class="button" @click="play">
                    <i class="fa fa-play" aria-hidden="true"></i>
                </div>

            </template>

            <template v-else>

                <div class="button" @click="pause">
                    <i class="fa fa-pause" aria-hidden="true"></i>
                </div>

            </template>

            <div v-if="model.progress > 0" class="button" @click="stop">
                <i class="fa fa-repeat" aria-hidden="true"></i>
            </div>

        </div>

    </div>

</template>

<script lang="ts">

    import Vue          from 'vue';
    import Component    from 'vue-class-component';

    import Model        from '../models/Timer';

    import TimerProgress    from './TimerProgress.vue';

    @Component({
        props: [ 'model' ],
        components: {
            'timer-progress': TimerProgress
        }
    })
    export default class Timer extends Vue {

        model: Model;

        bell: any = null;
        animationCallback: any = null;

        public play(): void {

            if (this.bell == null) {
                this.bell = new Audio('bell.wav');
            }

            if (this.model.progress == 0) {
                this.bell.play();
            }

            if (!this.model.playing) {
                this.model.play();
            }

            requestAnimationFrame(this.animationCallback = () => {
                this.model.update();
                if (this.model.playing) {
                    requestAnimationFrame(this.animationCallback);
                } else if (this.model.completed) {
                    this.bell.play();
                }
            });

        }

        public pause(): void {
            this.model.pause();
        }

        public stop(): void {
            this.model.stop();
        }

    }

</script>
