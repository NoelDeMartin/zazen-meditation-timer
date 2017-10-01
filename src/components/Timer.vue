<style lang="scss">

    $timer-dimensions: 200px;
    $button-dimensions: 50px;

    .timer {
        width: $timer-dimensions;
        height: $timer-dimensions;
        position: relative;

        @include flex-center();

        .timer-progress {
            @include fill-absolute();
        }

        .time {
            margin-bottom: 20px;
        }

        .buttons {

            @include flex-center('row');

            .button {
                width: $button-dimensions;
                height: $button-dimensions;
                border-radius: $button-dimensions / 2;
                cursor: pointer;
                background: darken(white, 5%);
                font-size: $button-dimensions * 0.4;

                @include flex-center();

                &:hover {
                    background: darken(white, 10%);
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

        <span class="time size-huge">
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
